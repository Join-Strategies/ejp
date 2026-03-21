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

// My TEF portal modal — injected on every page
(function() {
  var MYTEF_URL = 'https://1199seiutef.my.site.com/s/login/';

  // Inject modal HTML once
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
    '    <a href="' + MYTEF_URL + '" target="_blank" rel="noopener" class="btn btn-primary btn-lg mytef-modal-cta" data-i18n="mytef-modal-cta">Go to My TEF Portal \u2192</a>',
    '    <p class="mytef-modal-footnote" data-i18n="mytef-modal-footnote">You\'ll be taken to the secure 1199SEIU TEF member portal to log in.</p>',
    '  </div>',
    '</div>'
  ].join('');

  var container = document.createElement('div');
  container.innerHTML = modalHTML;
  document.body.appendChild(container.firstChild);

  var overlay  = document.getElementById('mytef-modal');
  var closeBtn = document.getElementById('mytef-modal-close');

  function openMyTEF() {
    overlay.classList.remove('hidden');
    requestAnimationFrame(function() {
      overlay.classList.add('is-open');
      document.body.classList.add('modal-open');
    });
  }

  function closeMyTEF() {
    overlay.classList.remove('is-open');
    document.body.classList.remove('modal-open');
    overlay.addEventListener('transitionend', function handler() {
      overlay.classList.add('hidden');
      overlay.removeEventListener('transitionend', handler);
    });
  }

  closeBtn.addEventListener('click', closeMyTEF);
  overlay.addEventListener('click', function(e) { if (e.target === overlay) closeMyTEF(); });
  document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeMyTEF(); });

  // Wire up all .nav-cta links and any btn with js-mytef-btn class
  document.addEventListener('click', function(e) {
    var target = e.target.closest('.nav-cta, .js-mytef-btn');
    if (!target) return;
    e.preventDefault();
    openMyTEF();
  });
})();

