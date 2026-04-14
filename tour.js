(function () {
  'use strict';

  var STORAGE_KEY_JS  = 'ejp_tour_js_v1';
  var STORAGE_KEY_EMP = 'ejp_tour_emp_v1';

  // ── Determine which page we're on ──────────────────────────────
  var path = window.location.pathname;
  var isJobSeekers = path.indexOf('job-seekers') !== -1;
  var isEmployers  = path.indexOf('employers')   !== -1;

  if (!isJobSeekers && !isEmployers) return;

  // ── Bail if Driver.js didn't load ──────────────────────────────
  if (typeof window.driver === 'undefined') return;

  // ── Tour step definitions ──────────────────────────────────────
  var TOURS = {
    'job-seekers': [
      {
        popover: {
          title: 'Your Next Step Starts Here',
          description: 'This page helps you find healthcare jobs and connect with EJP\'s career services. Let\'s take a quick look around.'
        }
      },
      {
        element: '#get-started',
        popover: {
          title: 'Tell Us Who You Are',
          description: 'Let us know whether you\'re a CPT participant or not, and we\'ll point you to the right resources.'
        }
      },
      {
        element: '#wizard-step-1',
        popover: {
          title: 'Two Paths',
          description: 'Are you a Career Pathways Training participant? Or looking to browse jobs and submit your resume? Choose the option that fits — you can always come back.'
        }
      },
      {
        element: '#why-1199',
        popover: {
          title: 'The Power of an 1199 Career',
          description: 'Livable wages, career ladders, worker protections, and healthcare benefits — here\'s what 1199SEIU members have won together.'
        }
      }
    ],

    'employers': [
      {
        popover: {
          title: 'Build Your Healthcare Workforce',
          description: 'EJP partners with healthcare employers across New York to match them with qualified candidates. Here\'s how it works.'
        }
      },
      {
        element: '#emp-why-partner',
        popover: {
          title: 'Why Partner with EJP',
          description: 'Access over 7,000 CPT-trained candidates across a variety of healthcare occupations — pre-screened, prepared, and ready to work.'
        }
      },
      {
        element: '#emp-vacancy-card',
        popover: {
          title: 'Submit Job Openings',
          description: 'Post your vacancies directly to our pool of qualified candidates. Our employer relations team will follow up with you.'
        }
      },
      {
        element: '#emp-events-card',
        popover: {
          title: 'Attend Hiring Events',
          description: 'Meet qualified candidates in person at career fairs and hiring events throughout New York.'
        }
      }
    ]
  };

  // ── Build and run a tour ───────────────────────────────────────
  function startTour(pageKey) {
    var isEmp = pageKey === 'employers';
    if (isEmp) document.body.classList.add('employer-tour');

    var tourInstance = window.driver.js.driver({
      showProgress: true,
      allowClose:   true,
      stagePadding: 6,
      stageRadius: 8,
      overlayColor: 'rgba(0, 0, 0, 0.6)',
      steps: TOURS[pageKey],
      onDestroyed: function () {
        if (isEmp) document.body.classList.remove('employer-tour');
        var key = isEmp ? STORAGE_KEY_EMP : STORAGE_KEY_JS;
        localStorage.setItem(key, '1');
        var btn = document.getElementById('ejp-tour-trigger');
        if (btn) btn.disabled = false;
      }
    });

    var btn = document.getElementById('ejp-tour-trigger');
    if (btn) btn.disabled = true;

    tourInstance.drive();
  }

  // ── Inject floating "Take a Tour" button ───────────────────────
  function injectTriggerButton(pageKey) {
    var btn = document.createElement('button');
    btn.id        = 'ejp-tour-trigger';
    btn.className = 'tour-trigger';
    btn.setAttribute('aria-label', 'Take a site tour');
    btn.innerHTML =
      '<svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">'
      + '<circle cx="7.5" cy="7.5" r="6.5" stroke="currentColor" stroke-width="1.4"/>'
      + '<circle cx="7.5" cy="4.5" r=".8" fill="currentColor"/>'
      + '<path d="M7.5 6.5v4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>'
      + '</svg>'
      + 'Take a Tour';
    btn.addEventListener('click', function () {
      startTour(pageKey);
    });
    document.body.appendChild(btn);
  }

  // ── Init ───────────────────────────────────────────────────────
  function init() {
    var pageKey    = isJobSeekers ? 'job-seekers' : 'employers';
    var storageKey = isJobSeekers ? STORAGE_KEY_JS : STORAGE_KEY_EMP;
    var forceTour  = window.location.search.indexOf('tour=1') !== -1;

    injectTriggerButton(pageKey);

    // Auto-start on first visit or when ?tour=1 is in the URL
    if (forceTour || !localStorage.getItem(storageKey)) {
      setTimeout(function () { startTour(pageKey); }, 1200);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
