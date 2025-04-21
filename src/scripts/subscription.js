// scripts/subscription.js
export function setupSubscriptionForm() {
    const forms = document.querySelectorAll('.subscribe-form, .footer-subscribe-form');
    forms.forEach(form => {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const emailInput = form.querySelector('input[type="email"]');
        const errorSpan = form.querySelector('.error-message');
        const successDiv = form.querySelector('.subscribe-success') || document.getElementById('subscribe-success');
        const email = emailInput.value.trim();
        if (/^\S+@\S+\.\S+$/.test(email)) {
          localStorage.setItem('subscriber', email); // Mock API
          if (errorSpan) errorSpan.classList.remove('active');
          if (successDiv) {
            successDiv.textContent = 'Thank you for subscribing! Expect fruitful updates soon.';
            successDiv.classList.add('active');
            setTimeout(() => successDiv.classList.remove('active'), 5000);
          }
          form.reset();
        } else {
          if (errorSpan) {
            errorSpan.textContent = 'Please enter a valid email address.';
            errorSpan.classList.add('active');
          }
        }
      });
    });
  }