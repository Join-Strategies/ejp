(function () {
  // Mobile nav toggle
  const toggle = document.querySelector('.mobile-nav-toggle');
  const nav = document.getElementById('mobile-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open);
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Scroll spy — highlight only one nav link at a time
  const anchorLinks = document.querySelectorAll('.nav-links a[href^="#"], .mobile-nav a[href^="#"]');
  const sections = [];

  anchorLinks.forEach(function (link) {
    const id = link.getAttribute('href').slice(1);
    const section = document.getElementById(id);
    if (section) sections.push({ id: id, el: section });
  });

  if (!sections.length) return;

  function updateActiveNav() {
    var currentId = null;
    var scrollY = window.scrollY + 120; // offset for sticky header

    for (var i = sections.length - 1; i >= 0; i--) {
      if (sections[i].el.offsetTop <= scrollY) {
        currentId = sections[i].id;
        break;
      }
    }

    anchorLinks.forEach(function (link) {
      var id = link.getAttribute('href').slice(1);
      if (id === currentId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();
})();
