document.addEventListener("DOMContentLoaded", () => {
  
  const counters = document.querySelectorAll('.counter');

  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const startNumber = parseInt(counter.innerText) || 0;
    const duration = 2000;
    let startTime = null;

    function animateCounter(currentTime) {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(progress * (target - startNumber) + startNumber);
      
      counter.innerText = current.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(animateCounter);
      } else {
        counter.innerText = target.toLocaleString();
      }
    }

    requestAnimationFrame(animateCounter);
  });
});