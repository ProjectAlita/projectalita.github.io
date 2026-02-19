# Vector Search Input Parameters: Full-Text Search, Reranking, and Extended Search

The Alita SDK provides sophisticated vector search capabilities with three advanced features: **Full-Text Search**, **Reranking**, and **Extended Search**. These parameters allow agents to dynamically enhance search results by combining semantic similarity with keyword matching, custom scoring rules, and multi-chunk retrieval strategies.

## Parameter Definitions

### 1. Full-Text Search Configuration

Full-text search combines traditional keyword-based search with vector similarity search. The configuration is defined in `alita_sdk/runtime/tools/vectorstore.py`:

```python
# alita_sdk/runtime/tools/vectorstore.py
full_text_search: Optional[Dict[str, Any]] = Field(
    description="""Full text search configuration. Example:
    {
        "enabled": true,
        "weight": 0.3,
        "fields": ["content", "title"],
        "language": "english"
    }""",
    default=None
)
```

**Parameters:**
- `enabled` (bool): Activates full-text search
- `weight` (float): Weight for text search scores (0.0-1.0), combined with vector scores
- `fields` (list): Metadata fields to search (e.g., "content", "title", "description")
- `language` (str): Language for text search indexing (e.g., "english", "spanish")

### 2. Reranking Configuration

Reranking applies custom scoring rules to boost or demote search results based on metadata. Defined in both `VectorStoreWrapper` and `VectorStoreWrapperBase`:

```python
# alita_sdk/runtime/tools/vectorstore.py
reranking_config: Optional[Dict[str, Dict[str, Any]]] = Field(
    description="""Reranking configuration. Example:
    {
        "field_name": {
            "weight": 1.0,
            "rules": {
                "contains": "keyword",
                "priority": "value",
                "sort": "desc"
            }
        }
    }""",
    default=None
)
```

**Parameters:**
- `field_name`: Metadata field to apply rules to
- `weight` (float): Score multiplier when rules match
- `rules`:
  - `contains` (str): Boost if field contains this substring
  - `priority` (str): Boost if field exactly matches this value
  - `sort` (str): Sort direction ("asc" or "desc") based on field value

### 3. Extended Search

Extended search retrieves documents by searching across multiple chunk types (title, summary, propositions, keywords) and then fetching the full document chunks:

```python
# alita_sdk/runtime/tools/vectorstore.py
extended_search: Optional[List[str]] = Field(
    description="List of chunk types to search for (title, summary, propositions, keywords, documents)",
    default=None
)
```

**Valid chunk types:**
- `"title"`: Search document titles
- `"summary"`: Search document summaries
- `"propositions"`: Search extracted propositions
- `"keywords"`: Search extracted keywords
- `"documents"`: Search full document chunks (default behavior)

## How These Parameters Work Together

The search flow in `VectorStoreWrapperBase.search_documents()` processes these parameters sequentially:

```python
# alita_sdk/runtime/tools/vectorstore_base.py (simplified flow)
def search_documents(self, query: str, doctype: str = 'code',
                     filter: dict|str = {}, cut_off: float = 0.5,
                     search_top: int = 10, 
                     full_text_search: Optional[Dict[str, Any]] = None,
                     extended_search: Optional[List[str]] = None,
                     reranking_config: Optional[Dict[str, Dict[str, Any]]] = None):
    
    # Step 1: Extended search (if enabled)
    if extended_search:
        # Search across multiple chunk types
        vector_items = []
        for chunk_type in ["title", "summary", "propositions", "keywords"]:
            chunk_items = self._similarity_search_with_score(
                query, filter={"chunk_type": {"$eq": chunk_type}}, k=search_top
            )
            # Fetch full document for each match
            vector_items.extend(fetch_full_documents(chunk_items))
    else:
        # Standard vector search
        vector_items = self._similarity_search_with_score(
            query, filter=filter, k=search_top * 3
        )
    
    # Step 2: Full-text search (if enabled)
    if full_text_search and full_text_search.get('enabled'):
        vector_weight = 1.0
        text_weight = full_text_search.get('weight', 0.3)
        
        for field_name in full_text_search.get('fields', []):
            text_results = self.pg_helper.full_text_search(field_name, query)
            # Combine scores: combined = (vector * 1.0) + (text * 0.3)
            for result in text_results:
                if result['id'] in doc_map:
                    doc, vector_score = doc_map[result['id']]
                    combined_score = (vector_score * vector_weight) + 
                                   (result['text_score'] * text_weight)
                    doc_map[result['id']] = (doc, combined_score)
    
    # Step 3: Reranking (if configured)
    if reranking_config:
        combined_items = self._apply_reranking(combined_items, reranking_config)
    
    # Step 4: Apply cutoff and return top results
    combined_items = [item for item in combined_items if abs(item[1]) >= cut_off]
    return combined_items[:search_top]
```

## Dynamic Usage Example: Agent Query

Here's a comprehensive example showing how an agent can dynamically use these parameters:

### Scenario: Searching Technical Documentation

**User Query:** "Find recent API authentication changes in the security documentation"

**Agent's Dynamic Search Strategy:**

```python
# The agent constructs this search call dynamically based on the query intent

search_params = {
    "query": "API authentication security changes",
    "index_name": "technical_docs",
    "search_top": 10,
    "cut_off": 0.6,
    
    # Full-text search: Boost documents with "authentication" in title
    "full_text_search": {
        "enabled": True,
        "weight": 0.4,  # 40% weight for keyword matches
        "fields": ["title", "content", "tags"],
        "language": "english"
    },
    
    # Extended search: Search titles and summaries first
    "extended_search": ["title", "summary", "keywords", "documents"],
    
    # Reranking: Prioritize recent documents and security-related content
    "reranking_config": {
        "category": {
            "weight": 0.5,  # 50% boost
            "rules": {
                "contains": "security",  # Boost if category contains "security"
                "priority": "authentication"  # Extra boost for exact match
            }
        },
        "updated_on": {
            "weight": 0.3,  # 30% boost
            "rules": {
                "sort": "desc"  # Prefer newer documents
            }
        },
        "doc_type": {
            "weight": 0.2,
            "rules": {
                "priority": "api_reference"  # Boost API reference docs
            }
        }
    },
    
    # Metadata filter: Only security and API docs from last year
    "filter": {
        "$and": [
            {"category": {"$in": ["security", "api"]}},
            {"updated_on": {"$gte": "2024-01-01"}}
        ]
    }
}

# Agent calls the search tool
results = search_index(**search_params)
```

### How the Agent Determines Parameters

The agent analyzes the query to extract:

1. **Keywords for full-text search**: "authentication", "security", "API"
2. **Temporal context**: "recent" → sort by `updated_on` descending
3. **Document type hints**: "documentation" → filter by doc_type
4. **Semantic concepts**: "changes" → use extended search to find summaries

### Search Execution Flow

```
User Query: "Find recent API authentication changes in security documentation"
    ↓
1. Extended Search Phase:
   - Search "title" chunks for "API authentication security changes"
   - Search "summary" chunks for high-level overviews
   - Search "keywords" chunks for tagged content
   - Fetch full documents for all matches
   Result: 30 candidate documents
    ↓
2. Full-Text Search Phase:
   - Search "title" field for exact keyword matches
   - Search "content" field for keyword occurrences
   - Search "tags" field for metadata keywords
   - Combine scores: vector_score * 1.0 + text_score * 0.4
   Result: 30 documents with hybrid scores
    ↓
3. Reranking Phase:
   - Boost documents with "security" in category (+50%)
   - Boost documents with "authentication" category (exact match)
   - Sort by updated_on descending (+30% for recent docs)
   - Boost "api_reference" doc_type (+20%)
   Result: 30 documents with adjusted scores
    ↓
4. Filtering & Cutoff:
   - Apply metadata filter (category in ["security", "api"])
   - Remove documents with score < 0.6
   - Return top 10 results
   Result: 10 most relevant documents
```

## Implementation Details

### Full-Text Search Implementation

The full-text search uses PostgreSQL's full-text search capabilities via `PGVectorSearch` in `alita_sdk/runtime/tools/pgvector_search.py`:

```python
# alita_sdk/runtime/tools/vectorstore_base.py
if full_text_search and full_text_search.get('enabled'):
    language = full_text_search.get('language', 'english')
    self._init_pg_helper(language)
    
    vector_weight = 1.0
    text_weight = full_text_search.get('weight', 0.3)
    
    for field_name in full_text_search.get('fields', []):
        text_results = self.pg_helper.full_text_search(field_name, query)
        
        for result in text_results:
            doc_id = result['id']
            text_score = result['text_score']
            
            if doc_id in doc_map:
                doc, vector_score = doc_map[doc_id]
                combined_score = (vector_score * vector_weight) + 
                               (text_score * text_weight)
                doc_map[doc_id] = (doc, combined_score)
```

### Reranking Implementation

The reranking logic in `_apply_reranking()` method:

```python
# alita_sdk/runtime/tools/vectorstore_base.py
def _apply_reranking(self, items, reranker):
    reranked_items = [(doc, score) for doc, score in items]
    
    for field_name, config in reranker.items():
        weight = config.get("weight", 1.0)
        rules = config.get("rules", {})
        
        for i, (doc, score) in enumerate(reranked_items):
            field_value = doc.metadata.get(field_name)
            
            if field_value is not None:
                # Apply "contains" rule
                if rules.get("contains") and isinstance(field_value, str):
                    if rules["contains"].lower() in field_value.lower():
                        reranked_items[i] = (doc, score * (1 + weight))
                
                # Apply "priority" rule (exact match)
                if rules.get("priority"):
                    if str(field_value).lower() == str(rules["priority"]).lower():
                        reranked_items[i] = (doc, score * (1 + weight))
    
    # Apply sort rules
    for field_name, config in reranker.items():
        if "sort" in config.get("rules", {}):
            reverse = config["rules"]["sort"].lower() == "desc"
            reranked_items.sort(
                key=lambda x: (x[0].metadata.get(field_name, ""), x[1]),
                reverse=reverse
            )
    
    return reranked_items
```

### Extended Search Implementation

Extended search retrieves documents by searching specialized chunk types:

```python
# alita_sdk/runtime/tools/vectorstore_base.py
if extended_search:
    unique_docs = {}
    chunk_type_scores = {}
    
    # Search each chunk type
    for chunk_type in ["title", "summary", "propositions", "keywords"]:
        chunk_filter = {
            "$and": [
                filter,
                {"chunk_type": {"$eq": chunk_type}}
            ]
        }
        
        chunk_items = self._similarity_search_with_score(
            query, filter=chunk_filter, k=search_top
        )
        
        for doc, score in chunk_items:
            source = doc.metadata.get('source')
            chunk_id = doc.metadata.get('chunk_id')
            doc_id = f"{source}_{chunk_id}"
            
            if doc_id not in unique_docs:
                unique_docs[doc_id] = doc
                chunk_type_scores[doc_id] = score
                
                # Fetch full document chunk
                doc_filter = {
                    "$and": [
                        {"source": {"$eq": source}},
                        {"chunk_id": {"$eq": chunk_id}},
                        {"chunk_type": {"$eq": "document"}}
                    ]
                }
                
                fetch_items = self._similarity_search_with_score(
                    query, filter=doc_filter, k=1
                )
                if fetch_items:
                    vector_items.append(fetch_items[0])
```

## Agent Integration Example

Here's how an agent would use these parameters in a real conversation:

```python
# Agent receives user query
user_query = "Show me recent security vulnerabilities in the authentication module"

# Agent analyzes query and constructs search parameters
agent_reasoning = {
    "intent": "find_security_issues",
    "temporal": "recent",
    "domain": "authentication",
    "priority": "security"
}

# Agent dynamically builds search configuration
search_call = {
    "tool": "search_index",
    "arguments": {
        "query": "security vulnerabilities authentication",
        "index_name": "codebase",
        "search_top": 15,
        "cut_off": 0.55,
        
        # Use full-text to catch exact vulnerability mentions
        "full_text_search": {
            "enabled": True,
            "weight": 0.35,
            "fields": ["content", "commit_message", "file_path"],
            "language": "english"
        },
        
        # Search titles and summaries for quick overview
        "extended_search": ["title", "summary", "documents"],
        
        # Prioritize recent commits and security-tagged files
        "reranking_config": {
            "commit_date": {
                "weight": 0.4,
                "rules": {"sort": "desc"}
            },
            "file_path": {
                "weight": 0.3,
                "rules": {"contains": "auth"}
            },
            "severity": {
                "weight": 0.5,
                "rules": {"priority": "high"}
            }
        },
        
        "filter": {
            "$and": [
                {"module": {"$eq": "authentication"}},
                {"commit_date": {"$gte": "2024-01-01"}},
                {"tags": {"$in": ["security", "vulnerability"]}}
            ]
        }
    }
}

# Agent executes search and processes results
results = execute_tool(search_call)
```

## Best Practices

1. **Full-Text Search Weight**: Use 0.2-0.4 for balanced hybrid search
2. **Extended Search**: Use for document discovery when you need context beyond exact matches
3. **Reranking**: Apply multiple rules with decreasing weights (0.5, 0.3, 0.2)
4. **Cutoff Threshold**: Use 0.5-0.7 for quality filtering
5. **Search Top**: Request 2-3x desired results before filtering

---

**📁 Files Referenced:**
- `alita_sdk/runtime/tools/vectorstore.py` — Main vector search implementation with `SearchDocumentsModel` and `VectorStoreWrapper` class containing search logic
- `alita_sdk/runtime/tools/vectorstore_base.py` — Base class `VectorStoreWrapperBase` with core search methods including `search_documents()`, `_apply_reranking()`, and extended search implementation
- `alita_sdk/tools/base_indexer_toolkit.py` — `BaseIndexerToolkit` showing how search tools are exposed to agents via `get_available_tools()`
- `alita_sdk/tools/elitea_base.py` — `BaseVectorStoreToolApiWrapper` demonstrating toolkit integration patterns