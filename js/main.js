// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(function (link) {
  link.addEventListener('click', function (e) {
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Form handling
(function () {
  var form = document.getElementById('signup-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Honeypot check
    if (form.querySelector('[name="_gotcha"]').value) return;

    // Basic client-side validation
    var required = form.querySelectorAll('[required]');
    var valid = true;
    required.forEach(function (field) {
      if (!field.value.trim()) {
        valid = false;
        field.style.borderColor = '#c44';
      } else {
        field.style.borderColor = '';
      }
    });
    if (!valid) return;

    var btn = form.querySelector('.btn--full');
    btn.textContent = 'Submitting...';
    btn.disabled = true;

    var data = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    })
      .then(function (res) {
        if (res.ok) {
          form.style.display = 'none';
          document.getElementById('form-success').hidden = false;
        } else {
          btn.textContent = 'Start a Conversation';
          btn.disabled = false;
          alert('Something went wrong. Please try again or email us directly.');
        }
      })
      .catch(function () {
        btn.textContent = 'Start a Conversation';
        btn.disabled = false;
        alert('Connection error. Please try again.');
      });
  });

  form.querySelectorAll('[required]').forEach(function (field) {
    field.addEventListener('input', function () {
      this.style.borderColor = '';
    });
  });
})();

// Scroll reveal animations
(function () {
  var reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  if (!('IntersectionObserver' in window)) {
    reveals.forEach(function (el) {
      el.classList.add('is-visible');
    });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(function (el) {
    observer.observe(el);
  });
})();
