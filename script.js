// Scroll reveal leggero — nessuna dipendenza esterna
document.addEventListener('DOMContentLoaded', () => {
  const targets = document.querySelectorAll(
    'section h2, section .eyebrow, section .section-sub, ' +
    '.process-card, .treatment-card, .team-card, .location-chip, ' +
    '.problems-list li, .video-placeholder, .form-card'
  );

  targets.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = (i % 6) * 45 + 'ms';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  targets.forEach((el) => observer.observe(el));

  // La barra WhatsApp è predisposta ma non collegata: blocca il click finché
  // non viene impostato un href reale (rimuovere questo blocco a integrazione avvenuta)
  const waBar = document.querySelector('.whatsapp-bar');
  if (waBar && waBar.getAttribute('href') === '#') {
    waBar.addEventListener('click', (e) => e.preventDefault());
  }
});
