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

    var btn = form.querySelector('.btn--submit');
    btn.textContent = 'Submitting...';
    btn.disabled = true;

    // Submit via fetch to Formspree (or your own endpoint)
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
          btn.textContent = 'Request Access';
          btn.disabled = false;
          alert('Something went wrong. Please try again or email us directly.');
        }
      })
      .catch(function () {
        btn.textContent = 'Request Access';
        btn.disabled = false;
        alert('Connection error. Please try again.');
      });
  });

  // Clear red border on input
  form.querySelectorAll('[required]').forEach(function (field) {
    field.addEventListener('input', function () {
      this.style.borderColor = '';
    });
  });
})();

// Fade-in on scroll
(function () {
  var sections = document.querySelectorAll('.section');
  if (!('IntersectionObserver' in window)) {
    sections.forEach(function (s) { s.style.opacity = 1; });
    return;
  }

  sections.forEach(function (s) { s.style.opacity = 0; s.style.transition = 'opacity 0.8s ease'; });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  sections.forEach(function (s) { observer.observe(s); });
})();
