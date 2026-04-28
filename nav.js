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

// My TEF portal modal — injected on every page
(function() {
  var MYTEF_URL = 'https://1199seiutef.my.site.com/s/login/';

  function injectMyTEFModal() {
    if (document.getElementById('mytef-modal')) return;

    var modalHTML = [
      '<div id="mytef-modal" class="modal-overlay hidden" role="dialog" aria-modal="true" aria-labelledby="mytef-modal-title">',
      '  <div class="modal-box mytef-modal-box">',
      '    <button class="modal-close" id="mytef-modal-close" aria-label="Close">&times;</button>',
      '    <div class="mytef-modal-logo" aria-hidden="true">myTEF</div>',
      '    <h2 class="mytef-modal-title" id="mytef-modal-title" data-i18n="mytef-modal-title">My TEF Portal</h2>',
      '    <p class="mytef-modal-body" data-i18n="mytef-modal-body">Access your training records, class enrollments, program applications, resume, and reimbursement status — all in the secure myTEF member portal.</p>',
      '    <ul class="mytef-modal-features">',
      '      <li data-i18n="mytef-modal-li-1">Sign up for classes &amp; training programs</li>',
      '      <li data-i18n="mytef-modal-li-2">Apply for career advancement opportunities</li>',
      '      <li data-i18n="mytef-modal-li-3">Upload and manage your resume</li>',
      '      <li data-i18n="mytef-modal-li-4">Check tuition &amp; expense reimbursements</li>',
      '    </ul>',
      '    <a href="' + MYTEF_URL + '" target="_blank" rel="noopener" class="btn btn-primary btn-lg mytef-modal-cta" data-i18n="mytef-modal-cta">Go to My TEF Portal →</a>',
      '    <p class="mytef-modal-footnote" data-i18n="mytef-modal-footnote">You&rsquo;ll be taken to the secure 1199SEIU TEF member portal to log in.</p>',
      '  </div>',
      '</div>'
    ].join('');

    var container = document.createElement('div');
    container.innerHTML = modalHTML;
    document.body.appendChild(container.firstChild);

    var closeBtn = document.getElementById('mytef-modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeMyTEF);
    }
  }

  function openMyTEF() {
    injectMyTEFModal();

    var overlay = document.getElementById('mytef-modal');
    if (!overlay) return;

    overlay.classList.remove('hidden');
    requestAnimationFrame(function() {
      overlay.classList.add('is-open');
      document.body.classList.add('modal-open');
    });
  }

  function closeMyTEF() {
    var overlay = document.getElementById('mytef-modal');
    if (!overlay) return;

    overlay.classList.remove('is-open');
    document.body.classList.remove('modal-open');
    setTimeout(function() {
      if (!overlay.classList.contains('is-open')) {
        overlay.classList.add('hidden');
      }
    }, 320);
  }

  if (document.body) {
    injectMyTEFModal();
  } else {
    document.addEventListener('DOMContentLoaded', injectMyTEFModal);
  }

  document.addEventListener('click', function(e) {
    var modal = document.getElementById('mytef-modal');

    if (modal && e.target === modal) {
      closeMyTEF();
      return;
    }

    var target = e.target.closest('.nav-cta, .js-mytef-btn');
    if (!target) return;

    e.preventDefault();
    openMyTEF();
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeMyTEF();
    }
  });
})();

