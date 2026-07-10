document.addEventListener('DOMContentLoaded', () => {

  /* ============ FOOTER YEAR ============ */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ============ MOBILE NAV TOGGLE ============ */
  const navToggle = document.getElementById('navToggle');
  const navMobile = document.getElementById('navMobile');

  navToggle.addEventListener('click', () => {
    const isOpen = navMobile.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', isOpen);
    navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  navMobile.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMobile.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ============ SCROLL REVEAL ============ */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealEls = document.querySelectorAll('.reveal');

  if (prefersReducedMotion) {
    revealEls.forEach(el => el.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));
  }

  /* ============ FAQ ACCORDION ============ */
  const faqQuestions = document.querySelectorAll('.faq__question');

  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      // Close all others
      faqQuestions.forEach(other => {
        if (other !== btn) {
          other.setAttribute('aria-expanded', 'false');
          other.nextElementSibling.style.maxHeight = null;
        }
      });

      // Toggle this one
      btn.setAttribute('aria-expanded', !isOpen);
      answer.style.maxHeight = isOpen ? null : answer.scrollHeight + 'px';
    });
  });

  /* ============ CONTACT FORM → WHATSAPP ============ */
  const form = document.getElementById('contactForm');
  const WHATSAPP_NUMBER = '2349033601859'; // placeholder — replace with real number, no + or spaces

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    const fields = form.querySelectorAll('.field');
    fields.forEach(field => {
      const input = field.querySelector('input, select, textarea');
      field.classList.remove('is-invalid');

      if (!input.value.trim()) {
        field.classList.add('is-invalid');
        isValid = false;
        return;
      }

      if (input.type === 'email') {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(input.value.trim())) {
          field.classList.add('is-invalid');
          isValid = false;
        }
      }

      if (input.type === 'tel') {
        const phonePattern = /^[\d\s+()-]{7,}$/;
        if (!phonePattern.test(input.value.trim())) {
          field.classList.add('is-invalid');
          isValid = false;
        }
      }
    });

    if (!isValid) return;

    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const email = form.email.value.trim();
    const practiceArea = form.practiceArea.value;
    const details = form.details.value.trim();

    const message =
      `New Consultation Request\n\n` +
      `Name: ${name}\n` +
      `Phone: ${phone}\n` +
      `Email: ${email}\n` +
      `Practice Area: ${practiceArea}\n` +
      `Details: ${details}`;

    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');

    form.reset();
  });

});