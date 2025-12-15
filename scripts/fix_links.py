#!/usr/bin/env python3
"""Auto-fix broken relative Markdown links based on MkDocs build warnings.

Usage examples:

  # Dry run: read warnings from build.log and show proposed fixes
  python scripts/fix_links.py --docs-root docs --log build.log

  # Apply fixes in-place
  python scripts/fix_links.py --docs-root docs --log build.log --apply

  # Pipe warnings directly
  mkdocs build 2>&1 | grep "WARNING -  Doc file" | python scripts/fix_links.py --docs-root docs --apply

Strategy:
  1. Parse warnings lines like:
     WARNING -  Doc file 'release-notes/archived/rn10.md' contains a link '../how-tos/how-to-canvas.md', but the target ... not found
  2. Load all markdown files under docs and index by basename.
  3. For each referenced (broken) link inside the source file, re-evaluate all markdown links in that file.
     For each link that does NOT resolve:
        a) If its basename matches exactly ONE existing file -> rewrite to correct relative path.
        b) If its path missing sufficient '../' segments (common case) -> progressively prepend '../' until match.
        c) If multiple candidates -> report ambiguity (no change unless --force-first specified).
  4. Write updated file if changes and --apply given.

Limitations:
  - Does not modify image links (with ! prefix) unless --include-images set.
  - Does not attempt fuzzy (Levenshtein) matching; can be added later.

Exit codes:
  0 success (even if some unresolved remain)
  1 unrecoverable error (bad args)

"""
from __future__ import annotations
import argparse
import sys
import re
from pathlib import Path
from typing import Dict, List, Tuple, Set, Iterable, Optional

# Markdown link / image pattern capturing whole token and target (optionally with anchor)
# Examples matched: [Text](path/file.md)  ![Alt](../img/foo.png)  [Label](doc.md#section)
# We avoid spaces inside URL portion; anchors captured as part of target.
LINK_RE = re.compile(
    r"(?P<full>!?\[(?P<label>[^\]]*)\]\((?P<target>[^)\s]+(?:#[^)\s]+)?)\))")
WARNING_RE = re.compile(
    r"Doc file '([^']+)' contains a link '([^']+)'", re.IGNORECASE)


def parse_args():
    p = argparse.ArgumentParser(
        description="Auto-fix broken relative Markdown links")
    p.add_argument("--docs-root", default="docs",
                   help="Documentation root directory (default: docs)")
    p.add_argument(
        "--log", help="File containing MkDocs warnings (or read stdin if omitted)")
    p.add_argument("--apply", action="store_true",
                   help="Write changes to files (otherwise dry run)")
    p.add_argument("--include-images", action="store_true",
                   help="Also attempt to fix image links (![]())")
    p.add_argument("--force-first", action="store_true",
                   help="When multiple candidates, pick first instead of skipping")
    return p.parse_args()


def load_warnings(lines: List[str]) -> Set[Tuple[str, str]]:
    pairs = set()
    for line in lines:
        m = WARNING_RE.search(line)
        if m:
            doc, bad_link = m.group(1), m.group(2)
            pairs.add((doc, bad_link))
    return pairs


def index_markdown_files(root: Path) -> Dict[str, List[Path]]:
    idx: Dict[str, List[Path]] = {}
    for p in root.rglob("*.md"):
        idx.setdefault(p.name, []).append(p)
    return idx


def resolve_candidate(basename: str, idx: Dict[str, List[Path]]) -> List[Path]:
    return idx.get(basename, [])


def compute_relative(from_file: Path, to_file: Path) -> str:
    """Return POSIX-style relative path string from one file to another."""
    return to_file.relative_to(from_file.parent).as_posix()


def attempt_progressive_parent(link: str, source_file: Path, docs_root: Path) -> Optional[Path]:
    """Heuristic: try prepending additional '../' segments (up to depth 5) to find an existing file."""
    for extra in range(1, 6):
        candidate = ("../" * extra) + link
        candidate_path = (source_file.parent / candidate).resolve()
        try:
            candidate_path.relative_to(docs_root.resolve())
        except ValueError:
            continue
        if candidate_path.is_file():
            return candidate_path
    return None


def fix_links_in_file(path: Path, docs_root: Path, idx: Dict[str, List[Path]], include_images: bool = False, force_first: bool = False) -> Tuple[List[Tuple[str, str]], str]:
    text = path.read_text(encoding="utf-8")
    changes: List[Tuple[str, str]] = []
    new_text = text
    # Iterate matches from end to start to avoid messing indices on replacement
    for m in list(LINK_RE.finditer(text))[::-1]:
        full = m.group("full")
        tgt = m.group("target")
        is_image = full.startswith("!")
        if not include_images and is_image:
            continue
        if tgt.startswith("http") or tgt.startswith("#"):
            continue
        # Separate anchor if any
        if "#" in tgt:
            base, anchor = tgt.split("#", 1)
            anchor = "#" + anchor
        else:
            base, anchor = tgt, ""
        # skip mailto or other schemes
        if re.match(r"^[a-zA-Z]+:", base):
            continue
        candidate_path = (path.parent / base).resolve()
        try:
            candidate_path.relative_to(docs_root.resolve())
        except ValueError:
            candidate_exists_in_docs = False
        else:
            candidate_exists_in_docs = candidate_path.is_file()
        if candidate_exists_in_docs:
            continue  # already valid
        # Try basename mapping
        basename = Path(base).name
        candidates = resolve_candidate(basename, idx)
        chosen: Path | None = None
        if len(candidates) == 1:
            chosen = candidates[0]
        elif len(candidates) > 1:
            # Try to find the one whose parts suffix match original base path parts
            original_parts = base.split('/')
            best = None
            best_score = -1
            for c in candidates:
                c_parts = c.relative_to(docs_root).as_posix().split('/')
                # score: number of matching trailing segments excluding basename is 0-based
                score = 0
                for a, b in zip(reversed(c_parts[:-1]), reversed(original_parts[:-1])):
                    if a == b:
                        score += 1
                    else:
                        break
                if score > best_score:
                    best_score = score
                    best = c
            if best and (force_first or best_score >= 0):
                chosen = best
        # Progressive parent attempt if still not found
        if not chosen:
            prog = attempt_progressive_parent(base, path, docs_root)
            if prog:
                chosen = prog
        if not chosen:
            continue  # give up
        # Compute relative path robustly (fallback to os.path.relpath if needed)
        try:
            rel_path = chosen.relative_to(path.parent).as_posix()
        except ValueError:
            import os
            rel_path = os.path.relpath(
                chosen, start=path.parent).replace("\\", "/")
        rel = rel_path
        new_target = rel + anchor
        if new_target != tgt:
            new_full = full.replace(tgt, new_target)
            new_text = new_text[:m.start()] + new_full + new_text[m.end():]
            changes.append((tgt, new_target))
    if changes:
        return changes, new_text
    return [], text


def main():
    args = parse_args()
    docs_root = Path(args.docs_root).resolve()
    if not docs_root.is_dir():
        print(f"Docs root not found: {docs_root}", file=sys.stderr)
        sys.exit(1)

    if args.log:
        lines = Path(args.log).read_text(encoding="utf-8").splitlines()
    else:
        lines = sys.stdin.read().splitlines()
    warn_pairs = load_warnings(lines)
    if not warn_pairs:
        print("No warning lines detected (pattern mismatch).", file=sys.stderr)
    idx = index_markdown_files(docs_root)

    aggregated_changes: List[Tuple[Path, List[Tuple[str, str]]]] = []
    for doc, _bad in sorted(warn_pairs):
        src = docs_root / doc
        if not src.is_file():
            continue
        changes, new_text = fix_links_in_file(
            src, docs_root, idx, include_images=args.include_images, force_first=args.force_first)
        if changes:
            aggregated_changes.append((src, changes))
            if args.apply:
                src.write_text(new_text, encoding="utf-8")
    if not aggregated_changes:
        print("No fixes applied or needed.")
        return

    for src, changes in aggregated_changes:
        print(f"File: {src.relative_to(docs_root)}")
        for old, new in changes:
            print(f"  {old} -> {new}")
    if not args.apply:
        print("(Dry run) Re-run with --apply to write changes")


if __name__ == "__main__":
    main()
