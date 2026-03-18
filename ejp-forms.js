// EJP Forms — Shared form handler for all Salesforce Web-to-Lead submissions
// Loaded on all pages after nav.js

(function () {

  // ─── Constants ────────────────────────────────────────────────────────────

  var SF_ENDPOINT = 'https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8';
  var SF_ORG_ID   = '00DdL00000rNMCb';
  var SITE_BASE_URL = 'https://toolnyc.github.io/ejp';

  // Custom field IDs (unique to this SF org)
  var SF_FIELDS = {
    memberStatus:       '00NdL00002447vf',
    careerSupportNeeds: '00NdL0000248phx',
    roleTypesNeeded:    '00NdL0000248tAT',
    openPositionsCount: '00NdL0000248vAf',
    eventName:          '00NdL0000248x2n',
    ejpSourcePage:      '00NdL0000248yOf'
  };

  // Expose field IDs so per-page code can use them in hidden inputs
  window.SF_FIELDS = SF_FIELDS;
  window.SF_ORG_ID = SF_ORG_ID;
  window.SITE_BASE_URL = SITE_BASE_URL;

  // ─── submitToSalesforce ────────────────────────────────────────────────────
  // Collects all named inputs from formEl, appends standard hidden fields,
  // and POSTs to Salesforce Web-to-Lead via no-cors fetch.
  //
  // options:
  //   onSuccess(formData)  — called after submission (SF doesn't return JSON)
  //   onError(err)         — called if fetch itself throws
  //   submissionType       — string logged to ejp_submissions ('job-seeker'|'employer'|'event'|'newsletter')
  //   sourcePage           — string for EJP_Source_Page__c hidden field (overrides form value)

  window.submitToSalesforce = function (formEl, options) {
    options = options || {};

    var data = new FormData(formEl);

    // Standard required hidden fields
    data.set('oid',    SF_ORG_ID);
    data.set('retURL', SITE_BASE_URL + '/thank-you.html');

    // Override source page if provided
    if (options.sourcePage) {
      data.set(SF_FIELDS.ejpSourcePage, options.sourcePage);
    }

    // Collect plain object for callbacks and logging
    var formData = {};
    data.forEach(function (val, key) { formData[key] = val; });

    fetch(SF_ENDPOINT, {
      method: 'POST',
      mode: 'no-cors', // SF Web-to-Lead doesn't support CORS — treat opaque response as success
      body: data
    })
    .then(function () {
      // Log to submissions store
      _logSubmission(formData, options);

      if (typeof options.onSuccess === 'function') {
        options.onSuccess(formData);
      }
    })
    .catch(function (err) {
      if (typeof options.onError === 'function') {
        options.onError(err);
      } else {
        console.error('EJP form submission error:', err);
      }
    });
  };

  // ─── saveSession ──────────────────────────────────────────────────────────
  // Persists visitor identity to localStorage for personalization.
  // data: { firstName, lastName, email, memberStatus }

  window.saveSession = function (data) {
    try {
      var session = {
        firstName:    data.firstName    || '',
        lastName:     data.lastName     || '',
        email:        data.email        || '',
        memberStatus: data.memberStatus || '',
        timestamp:    Date.now()
      };
      localStorage.setItem('ejp_session', JSON.stringify(session));
    } catch (e) {}
  };

  // ─── getSession ───────────────────────────────────────────────────────────
  // Returns session object or null if missing/expired (>30 days).

  window.getSession = function () {
    try {
      var raw = localStorage.getItem('ejp_session');
      if (!raw) return null;
      var session = JSON.parse(raw);
      var age = Date.now() - (session.timestamp || 0);
      if (age > 30 * 24 * 60 * 60 * 1000) {
        localStorage.removeItem('ejp_session');
        return null;
      }
      return session;
    } catch (e) {
      return null;
    }
  };

  // ─── openModal ────────────────────────────────────────────────────────────

  window.openModal = function (modalId) {
    var modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.remove('hidden');
    document.body.classList.add('modal-open');

    // Focus first input
    var firstInput = modal.querySelector('input, select, textarea, button');
    if (firstInput) {
      setTimeout(function () { firstInput.focus(); }, 50);
    }

    // Esc key closes
    function onKeyDown(e) {
      if (e.key === 'Escape') {
        window.closeModal(modalId);
        document.removeEventListener('keydown', onKeyDown);
      }
    }
    document.addEventListener('keydown', onKeyDown);

    // Backdrop click closes
    modal.addEventListener('click', function onBackdropClick(e) {
      if (e.target === modal) {
        window.closeModal(modalId);
        modal.removeEventListener('click', onBackdropClick);
      }
    });
  };

  // ─── closeModal ───────────────────────────────────────────────────────────

  window.closeModal = function (modalId) {
    var modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.add('hidden');
    document.body.classList.remove('modal-open');
  };

  // ─── showFormSuccess ──────────────────────────────────────────────────────
  // Replaces the contents of containerEl with a success state.

  window.showFormSuccess = function (containerEl, message) {
    if (!containerEl) return;
    containerEl.innerHTML =
      '<div class="form-success">' +
        '<div class="form-success-icon">✅</div>' +
        '<h3>You\'re all set</h3>' +
        '<p>' + message + '</p>' +
      '</div>';
  };

  // ─── _logSubmission (private) ─────────────────────────────────────────────
  // Appends submission record to ejp_submissions in localStorage (for admin dashboard).

  function _logSubmission(formData, options) {
    try {
      var submissions = JSON.parse(localStorage.getItem('ejp_submissions') || '[]');
      submissions.unshift({
        timestamp:    new Date().toISOString(),
        name:         (formData.first_name || '') + ' ' + (formData.last_name || ''),
        email:        formData.email || '',
        type:         options.submissionType || 'unknown',
        sourcePage:   options.sourcePage || formData[SF_FIELDS.ejpSourcePage] || '',
        memberStatus: formData[SF_FIELDS.memberStatus] || '',
        notes:        formData.description || ''
      });
      localStorage.setItem('ejp_submissions', JSON.stringify(submissions.slice(0, 50)));
    } catch (e) {}
  }

})();
