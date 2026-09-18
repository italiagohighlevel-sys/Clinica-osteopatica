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

  // Video di benvenuto: copertina statica (fotogramma con il logo,
  // scelto a mano invece della miniatura di default di Vimeo) — al click
  // mostra l'iframe vero e lo avvia in autoplay, invece di caricare
  // Vimeo subito al caricamento della pagina.
  const videoPosterBtn = document.getElementById('videoPosterBtn');
  const videoIframe = document.getElementById('videoIframe');
  if (videoPosterBtn && videoIframe) {
    videoPosterBtn.addEventListener('click', () => {
      videoIframe.src = videoIframe.dataset.src + '&autoplay=1';
      videoIframe.hidden = false;
      videoPosterBtn.hidden = true;
    });
  }

  // Barra di progresso scroll (orizzontale in alto su desktop, verticale a
  // sinistra su mobile — l'orientamento lo decide il CSS via media query,
  // qui impostiamo solo la percentuale come variabile CSS)
  const progressBar = document.getElementById('scrollProgress');
  if (progressBar) {
    let ticking = false;
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      progressBar.style.setProperty('--scroll-pct', pct + '%');
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
      }
    }, { passive: true });
    updateProgress();
  }
});
