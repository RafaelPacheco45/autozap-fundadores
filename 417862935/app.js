(() => {
'use strict';
// Configuration is local to this copy. No requests, cookies or browser storage.
const config = window.AUTOZAP_FUNDADOR || {};
const nome = typeof config.nome === 'string' ? config.nome.trim().slice(0, 100) : '';
const loja = typeof config.loja === 'string' ? config.loja.trim().slice(0, 120) : '';
const nameElement = document.getElementById('founder-name');
const storeElement = document.getElementById('store-name');
if (nome) nameElement.textContent = nome;
if (loja) { storeElement.textContent = loja; storeElement.hidden = false; }
if (nome || loja) document.title = (loja || nome) + ' · Fundador AutoZap';
// Progressive enhancement: content remains visible if observers/animations fail.
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
let revealObserver;
if (!motionPreference.matches && 'IntersectionObserver' in window) {
 revealObserver = new window.IntersectionObserver(entries => {
  for (const entry of entries) {
   if (!entry.isIntersecting) continue;
   revealObserver.unobserve(entry.target);
   if (motionPreference.matches || typeof entry.target.animate !== 'function') continue;
   entry.target.animate([
    {opacity:.35, transform:'translateY(18px)'},
    {opacity:1, transform:'translateY(0)'}
   ], {duration:700, easing:'cubic-bezier(.2,.7,.2,1)', fill:'none'});
  }
 }, {threshold:.12});
 document.querySelectorAll('.letter-content, .community-heading, .community-grid article, .closing').forEach(el=>revealObserver.observe(el));
}
if (typeof motionPreference.addEventListener === 'function') {
 motionPreference.addEventListener('change', event => {
  if (!event.matches) return;
  if (revealObserver) revealObserver.disconnect();
  if (typeof document.getAnimations === 'function') document.getAnimations().forEach(animation=>animation.cancel());
 });
}

})();
