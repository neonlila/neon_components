document.querySelectorAll('[data-testimonials-slider]').forEach((slider) => {
  const track = slider.querySelector('.testimonials__track');
  const controls = slider.querySelector('.testimonials__controls');
  const prev = slider.querySelector('[data-slider-prev]');
  const next = slider.querySelector('[data-slider-next]');

  if (!track || !controls || !prev || !next) {
    return;
  }

  const step = () => {
    const card = track.querySelector('.testimonial');
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return card ? card.getBoundingClientRect().width + gap : track.clientWidth;
  };

  const update = () => {
    const maxScroll = track.scrollWidth - track.clientWidth;
    controls.hidden = maxScroll <= 1;
    prev.disabled = track.scrollLeft <= 1;
    next.disabled = track.scrollLeft >= maxScroll - 1;
  };

  prev.addEventListener('click', () => track.scrollBy({ left: -step() }));
  next.addEventListener('click', () => track.scrollBy({ left: step() }));

  track.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      track.scrollBy({ left: -step() });
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      track.scrollBy({ left: step() });
    }
  });

  track.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
});