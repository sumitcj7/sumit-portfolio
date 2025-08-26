
// Theme toggle + persistence
(function(){
  const root = document.documentElement;
  const key = "theme-preference";
  const saved = localStorage.getItem(key);
  const preferLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  if(saved === 'light' || (!saved && preferLight)) root.classList.add('light');

  function setTheme(next){
    if(next === 'light') root.classList.add('light'); else root.classList.remove('light');
    localStorage.setItem(key, next);
    refreshToggleIcon();
  }
  function refreshToggleIcon(){
    const btns = document.querySelectorAll('[data-theme-toggle]');
    const isLight = root.classList.contains('light');
    btns.forEach(b=> {
      b.innerHTML = isLight ? '🌙 Dark' : '☀️ Light';
      b.setAttribute('aria-pressed', String(isLight));
    });
  }
  window.toggleTheme = function(){
    const isLight = root.classList.contains('light');
    setTheme(isLight ? 'dark' : 'light');
  };
  refreshToggleIcon();

  // mobile menu
  const ham = document.querySelector('.hamburger');
  const links = document.querySelector('.navlinks');
  if(ham && links){
    ham.setAttribute('aria-controls', 'primary-navigation');
    ham.setAttribute('aria-expanded', 'false');
    links.setAttribute('id', 'primary-navigation');
    function toggleMenu(){
      const open = links.classList.toggle('open');
      ham.setAttribute('aria-expanded', String(open));
      if(open){
        const firstLink = links.querySelector('a');
        firstLink && firstLink.focus();
      } else {
        ham.focus();
      }
    }
    ham.addEventListener('click', toggleMenu);
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', ()=> {
      links.classList.remove('open');
      ham.setAttribute('aria-expanded', 'false');
    }));
    document.addEventListener('keydown', (e)=>{
      if(e.key === 'Escape' && links.classList.contains('open')){
        links.classList.remove('open');
        ham.setAttribute('aria-expanded', 'false');
        ham.focus();
      }
    });
  }

  // Active link highlighter
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navlinks a').forEach(a => {
    if(a.getAttribute('href') === path) a.classList.add('active');
  });
})();

// Simple contact form handler (mailto fallback)
function sendEmail(e){
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  
  const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:sumit2018chaudhary@gmail.com?subject=${subject}&body=${body}`;
}

// Keyboard shortcut: press "t" to toggle theme
document.addEventListener('keydown',(e)=>{
  if(e.key.toLowerCase() === 't' && !e.altKey && !e.ctrlKey && !e.metaKey){
    if(typeof window.toggleTheme === 'function') window.toggleTheme();
  }
});

// Scroll reveal using IntersectionObserver
(function(){
  const supportsIO = 'IntersectionObserver' in window;
  const els = document.querySelectorAll('.reveal');
  if(!els.length) return;
  if(!supportsIO){
    els.forEach(el=> el.classList.add('visible'));
    return;
  }
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, {threshold: 0.15});
  els.forEach(el=> io.observe(el));
})();
