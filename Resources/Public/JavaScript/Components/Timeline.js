// const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduceMotion && 'IntersectionObserver' in window) {
  const itemObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        itemObserver.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -15% 0px', threshold: 0.2 });

  document.querySelectorAll('[data-timeline]').forEach((timeline) => {
    const list = timeline.querySelector('.timeline__list');
    if (!list) {
      return;
    }

    timeline.classList.add('is-animated');
    timeline.querySelectorAll('.timeline__item').forEach((item) => itemObserver.observe(item));

    // Fill the line as the timeline scrolls past 70% of the viewport height
    let ticking = false;
    const update = () => {
      const rect = list.getBoundingClientRect();
      const trigger = window.innerHeight * 0.7;
      const progress = Math.min(1, Math.max(0, (trigger - rect.top) / rect.height));
      timeline.style.setProperty('--progress', progress.toFixed(3));
      ticking = false;
    };

    const requestUpdate = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    update();
  });
}