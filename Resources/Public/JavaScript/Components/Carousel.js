const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const speed = reduceMotion ? 0 : 600;

const a11y = document.documentElement.lang.startsWith('de')
  ? {
      prevSlideMessage: 'Vorherige Folie',
      nextSlideMessage: 'Nächste Folie',
      firstSlideMessage: 'Dies ist die erste Folie',
      lastSlideMessage: 'Dies ist die letzte Folie',
      paginationBulletMessage: 'Gehe zu Folie {{index}}',
    }
  : {};

const shared = (root) => ({
  speed,
  a11y,
  keyboard: { enabled: true, onlyInViewport: true },
  navigation: {
    prevEl: root.querySelector('.carousel__main > .swiper-button-prev'),
    nextEl: root.querySelector('.carousel__main > .swiper-button-next'),
  },
  pagination: {
    el: root.querySelector('.carousel__main > .swiper-pagination'),
    clickable: true,
  },
});

const presets = {
  fullwidth: (root) => ({
    ...shared(root),
    loop: true,
    effect: 'fade',
    fadeEffect: { crossFade: true },
  }),

  multi: (root) => ({
    ...shared(root),
    slidesPerView: 1.15,
    spaceBetween: 16,
    watchOverflow: true,
    breakpoints: {
      640: { slidesPerView: 2, spaceBetween: 24 },
      1024: { slidesPerView: 3, spaceBetween: 28 },
    },
  }),

  thumbs: (root) => {
    const thumbs = new Swiper(root.querySelector('.carousel__thumbs'), {
      speed,
      spaceBetween: 10,
      slidesPerView: 3.5,
      freeMode: true,
      watchSlidesProgress: true,
      breakpoints: {
        640: { slidesPerView: 5 },
        1024: { slidesPerView: 6 },
      },
    });

    return {
      ...shared(root),
      pagination: false,
      spaceBetween: 10,
      thumbs: { swiper: thumbs },
    };
  },
};

if (typeof Swiper !== 'undefined') {
  document.querySelectorAll('[data-carousel]').forEach((root) => {
    const preset = presets[root.dataset.carousel] ?? presets.fullwidth;
    new Swiper(root.querySelector('.carousel__main'), preset(root));
  });
}