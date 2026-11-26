const germanLabels = {
  prev: 'zurück',
  next: 'weiter',
  first: 'Anfang',
  last: 'Ende',
  slideX: 'Gehe zu Folie %s',
  pageX: 'Gehe zu Seite %s',
  play: 'Automatische Wiedergabe starten',
  pause: 'Automatische Wiedergabe anhalten',
  carousel: 'Karussell',
  select: 'Folie auswählen',
  slide: 'Folie',
  slideLabel: '%s von %s',
};

const toNumber = (value, fallback) => {
  const number = Number.parseInt(value ?? '', 10);
  return Number.isNaN(number) ? fallback : number;
};

document.querySelectorAll('[data-slider]').forEach((element) => {
  const data = element.dataset;
  const perPage = toNumber(data.sliderPerPage, 3);
  const autoplay = toNumber(data.sliderAutoplay, 0);

  new Splide(element, {
    type: data.sliderLoop === '1' ? 'loop' : 'slide',
    perPage,
    perMove: 1,
    gap: data.sliderGap || '1.5rem',
    arrows: data.sliderArrows !== '0',
    pagination: data.sliderPagination !== '0',
    autoplay: autoplay > 0,
    interval: autoplay || 5000,
    pauseOnHover: true,
    i18n: document.documentElement.lang.startsWith('de') ? germanLabels : {},
    breakpoints: {
      1024: {
        perPage: toNumber(data.sliderPerPageTablet, Math.min(perPage, 2)),
      },
      640: {
        perPage: toNumber(data.sliderPerPageMobile, 1),
        padding: data.sliderPeek === '1' ? { right: '15%' } : 0,
      },
    },
  }).mount();
});