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

  // Handle Contact Form Submission via Web3Forms
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById('submit-btn');
      const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;

      if (submitBtn) {
        submitBtn.disabled = true;
        if (btnText) {
          btnText.textContent = 'SENDING...';
        } else {
          submitBtn.textContent = 'SENDING...';
        }
      }

      const formData = new FormData(contactForm);

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        });

        const result = await response.json();

        if (result.success) {
          if (submitBtn) {
            submitBtn.classList.add('is-success');
            if (btnText) {
              btnText.textContent = 'MESSAGE SENT';
            } else {
              submitBtn.textContent = 'MESSAGE SENT';
            }
          }
          contactForm.reset();
        } else {
          if (submitBtn) {
            submitBtn.disabled = false;
            if (btnText) {
              btnText.textContent = 'TRY AGAIN';
            } else {
              submitBtn.textContent = 'TRY AGAIN';
            }
          }
          console.error('Submission failed:', result);
        }
      } catch (error) {
        console.error('Form submission error:', error);
        if (submitBtn) {
          submitBtn.disabled = false;
          if (btnText) {
            btnText.textContent = 'TRY AGAIN';
          } else {
            submitBtn.textContent = 'TRY AGAIN';
          }
        }
      }
    });
  }
});
