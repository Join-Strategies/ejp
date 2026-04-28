(function () {
  function initNav() {
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

    // Nav dropdown — prevent default on parent link click (Employment + top bar Funds)
    document.querySelectorAll('.nav-dropdown > a[href="#"], .top-dropdown > a[href="#"]').forEach(function(link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
      });
    });

    // Dropdown hover — mouseenter/mouseleave with delay for accessibility
    var OPEN_DELAY = 80;
    var CLOSE_DELAY = 250;

    function setupDropdown(el) {
      var openTimer = null;
      var closeTimer = null;

      function open() {
        clearTimeout(closeTimer);
        closeTimer = null;
        if (el.classList.contains('is-open')) return;
        openTimer = setTimeout(function() {
          closeAllDropdowns(el);
          el.classList.add('is-open');
        }, OPEN_DELAY);
      }

      function close() {
        clearTimeout(openTimer);
        openTimer = null;
        closeTimer = setTimeout(function() {
          el.classList.remove('is-open');
        }, CLOSE_DELAY);
      }

      el.addEventListener('mouseenter', open);
      el.addEventListener('mouseleave', close);

      // Also toggle on click for touch devices
      var toggle = el.querySelector(':scope > a, :scope > button');
      if (toggle) {
        toggle.addEventListener('click', function(e) {
          if (el.classList.contains('is-open')) {
            el.classList.remove('is-open');
          } else {
            closeAllDropdowns(el);
            el.classList.add('is-open');
          }
        });
      }
    }

    function closeAllDropdowns(except) {
      document.querySelectorAll('.nav-dropdown.is-open, .top-dropdown.is-open').forEach(function(d) {
        if (d !== except) d.classList.remove('is-open');
      });
    }

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.nav-dropdown, .top-dropdown')) {
        closeAllDropdowns();
      }
    });

    document.querySelectorAll('.nav-dropdown, .top-dropdown').forEach(setupDropdown);
  }

  // If header is already injected (shouldn't happen with defer but for safety)
  if (document.querySelector('.site-header')) {
    initNav();
  } else {
    window.addEventListener('ejp:header-ready', initNav);
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

