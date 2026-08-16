/**
 * Luxury Agent - Main JavaScript
 * Lenis Global Smooth Scroll Integration
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('Luxury Agent platform initialized.');

  // Initialize Lenis Smooth Scroll
  if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId !== '#') {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            e.preventDefault();
            lenis.scrollTo(targetElement, {
              offset: 0,
              duration: 1.2,
            });
          }
        }
      });
    });

    window.lenis = lenis;
  }

  // Handle Contact Form Submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById('submit-btn');
      const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;

      if (submitBtn) {
        submitBtn.classList.add('is-success');
        if (btnText) {
          btnText.textContent = 'MESSAGE SENT';
        } else {
          submitBtn.textContent = 'MESSAGE SENT';
        }
      }

      // Wait 3 seconds then refresh the page
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    });
  }
});
