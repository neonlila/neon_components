document.querySelectorAll('[data-compare]').forEach((compare) => {
  const stage = compare.querySelector('.compare__stage');
  const range = compare.querySelector('.compare__range');

  if (!stage || !range) {
    return;
  }

  const setPosition = (value) => {
    const position = Math.min(100, Math.max(0, value));
    compare.style.setProperty('--compare-position', `${position}%`);
    range.value = String(Math.round(position));
  };

  const fromPointer = (event) => {
    const rect = stage.getBoundingClientRect();
    setPosition(((event.clientX - rect.left) / rect.width) * 100);
  };

  stage.addEventListener('pointerdown', (event) => {
    stage.setPointerCapture(event.pointerId);
    fromPointer(event);
  });

  stage.addEventListener('pointermove', (event) => {
    if (stage.hasPointerCapture(event.pointerId)) {
      fromPointer(event);
    }
  });

  range.addEventListener('input', () => setPosition(Number(range.value)));
});