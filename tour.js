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
          title: 'Career Services for You',
          description: 'This page connects 1199SEIU members and CPT graduates with career support — from job placement to counseling to training. Let\'s take a quick look around.'
        }
      },
      {
        element: '#get-started',
        popover: {
          title: 'Where to Begin',
          description: 'This section routes you to the right services in about 30 seconds. Tell us whether you\'re looking for a job or need career support and we\'ll point you to the right path.'
        }
      },
      {
        element: '#wizard-step-1',
        popover: {
          title: 'Two Paths',
          description: 'Looking for a job? Or need career support like counseling or resume help? Choose the option that fits — you can always come back and choose the other.'
        }
      },
      {
        element: '#member-benefits',
        popover: {
          title: 'What Members Get',
          description: 'Union members and CPT graduates get the full suite: resume assistance, career counseling, interview prep, placement support, and more.'
        }
      },
      {
        element: '#mytef-portal',
        popover: {
          title: 'MyTEF Portal',
          description: 'Already a member? Log in to sign up for classes, upload your resume, apply for programs, and check reimbursement status — all in one place.'
        }
      }
    ],

    'employers': [
      {
        popover: {
          title: 'Hiring Healthcare Professionals',
          description: 'EJP connects you with CPT-trained, pre-screened candidates from the 1199SEIU network. Here\'s how it works.'
        }
      },
      {
        element: '#emp-why-partner',
        popover: {
          title: 'Why Partner with EJP',
          description: 'Our candidates are CPT-trained across 10 healthcare occupations, have received career counseling, and are ready to work — not cold applicants.'
        }
      },
      {
        element: '#emp-vacancy-card',
        popover: {
          title: 'Submit Job Openings',
          description: 'Post vacancies directly to our candidate pool. We\'ll match you with qualified professionals and follow up with you.'
        }
      },
      {
        element: '#emp-events-card',
        popover: {
          title: 'Attend Hiring Events',
          description: 'Meet candidates in person at career fairs and hiring events throughout New York — a faster way to find the right fit.'
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
