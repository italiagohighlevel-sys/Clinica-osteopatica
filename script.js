// Scroll reveal leggero — nessuna dipendenza esterna
document.addEventListener('DOMContentLoaded', () => {
  const targets = document.querySelectorAll(
    'section h2, section .eyebrow, section .section-sub, ' +
    '.timeline-step, .treatment-card, .team-card, .location-chip, .fv-item, .role-pill, ' +
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

  // Numeri chiave: count-up quando entrano in vista, una sola volta
  const statNumbers = document.querySelectorAll('.stat-number');
  const animateCount = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  statNumbers.forEach((el) => statObserver.observe(el));
});
