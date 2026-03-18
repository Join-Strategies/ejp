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

    // Collect form data for callbacks and logging
    var formData = {};
    new FormData(formEl).forEach(function (val, key) { formData[key] = val; });

    // Override source page if provided
    if (options.sourcePage) {
      formData[SF_FIELDS.ejpSourcePage] = options.sourcePage;
      _setHidden(formEl, SF_FIELDS.ejpSourcePage, options.sourcePage);
    }

    // Ensure oid and retURL are set
    _setHidden(formEl, 'oid', SF_ORG_ID);
    _setHidden(formEl, 'retURL', SITE_BASE_URL + '/thank-you.html');

    // Use hidden iframe submit instead of fetch — avoids tracker-blocking
    // in Firefox/Brave which blocks no-cors POSTs to webto.salesforce.com.
    // Native form submission to a different origin via iframe is always allowed.
    var iframeId = 'sf-submit-iframe';
    var iframe = document.getElementById(iframeId);
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.id   = iframeId;
      iframe.name = iframeId;
      iframe.style.cssText = 'display:none;width:0;height:0;border:0;position:absolute;';
      document.body.appendChild(iframe);
    }

    var prevAction = formEl.action;
    var prevMethod = formEl.method;
    var prevTarget = formEl.target;

    formEl.action = SF_ENDPOINT;
    formEl.method = 'POST';
    formEl.target = iframeId;
    formEl.submit();

    // Restore form attributes immediately after submit
    formEl.action = prevAction;
    formEl.method = prevMethod;
    formEl.target = prevTarget;

    // Treat as success — SF Web-to-Lead gives no success signal cross-origin
    _logSubmission(formData, options);
    if (typeof options.onSuccess === 'function') {
      options.onSuccess(formData);
    }
  };

  // Set or update a hidden input on formEl
  function _setHidden(formEl, name, value) {
    var el = formEl.querySelector('[name="' + name + '"]');
    if (!el) {
      el = document.createElement('input');
      el.type = 'hidden';
      el.name = name;
      formEl.appendChild(el);
    }
    el.value = value;
  }

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
    // Force a reflow so the transition plays from the initial (opacity:0) state
    modal.offsetHeight; // eslint-disable-line no-unused-expressions
    modal.classList.add('is-open');
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
    modal.classList.remove('is-open');
    document.body.classList.remove('modal-open');
    // Wait for CSS transition to finish before hiding from DOM/AT
    setTimeout(function() {
      if (!modal.classList.contains('is-open')) {
        modal.classList.add('hidden');
      }
    }, 320);
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
