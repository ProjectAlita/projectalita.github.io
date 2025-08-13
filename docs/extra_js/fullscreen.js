// Fullscreen docs toggle for MkDocs Material
(function() {
  const STORAGE_KEY = 'elitea_docs_fullscreen';
  function apply(state){
    document.body.classList.toggle('fullscreen-docs', state);
    const btn = document.querySelector('.fullscreen-toggle');
    if(btn){
      btn.setAttribute('aria-pressed', state ? 'true' : 'false');
      btn.title = state ? 'Exit full screen' : 'Enter full screen';
    }
  }
  function init(){
    if(document.querySelector('.fullscreen-toggle')) return;
  const headerInner = document.querySelector('.md-header__inner');
  if(!headerInner) return;
  // In Material, the element with .md-header__inner is itself the <nav> in recent versions
  const nav = headerInner.matches('nav') ? headerInner : headerInner.querySelector('nav');
  if(!nav) return; // Abort if structure unexpected
    const btn = document.createElement('button');
    btn.className = 'fullscreen-toggle md-header__button md-icon';
    btn.type = 'button';
    btn.setAttribute('aria-label','Toggle full screen');
    btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9V4h5"/><path d="M20 9V4h-5"/><path d="M4 15v5h5"/><path d="M20 15v5h-5"/><path d="M9 4L4 9"/><path d="M15 4l5 5"/><path d="M9 20l-5-5"/><path d="M15 20l5-5"/></svg>';
    btn.addEventListener('click',()=>{
      const newState = !document.body.classList.contains('fullscreen-docs');
      apply(newState);
      try{localStorage.setItem(STORAGE_KEY,newState?'1':'0');}catch(e){}
    });
    // Preferred order: [fullscreen][palette][search]
    const paletteForm = nav.querySelector('form[data-md-component="palette"]');
    const searchToggle = nav.querySelector('label.md-header__button[for="__search"]');
    if(paletteForm){
      nav.insertBefore(btn, paletteForm);
    } else if(searchToggle){
      nav.insertBefore(btn, searchToggle);
    } else {
      nav.appendChild(btn);
    }
    try{ if(localStorage.getItem(STORAGE_KEY)==='1') apply(true);}catch(e){}
  }
  document.addEventListener('DOMContentLoaded', () => {
    init();
    // In case Material injects header after initial DOMContentLoaded, observe for palette form
    const observer = new MutationObserver(()=>{
      if(!document.querySelector('.fullscreen-toggle')){
        const paletteReady = document.querySelector('header .md-header__inner form[data-md-component="palette"]');
        const searchReady = document.querySelector('header .md-header__inner label.md-header__button[for="__search"]');
        if(paletteReady || searchReady) init();
      } else observer.disconnect();
    });
    observer.observe(document.body, {childList:true, subtree:true});
  });
})();
