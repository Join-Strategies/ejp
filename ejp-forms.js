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

  // Human-readable labels for custom SF field IDs (used in debug output)
  var SF_FIELD_LABELS = {
    '00NdL00002447vf': 'memberStatus',
    '00NdL0000248phx': 'careerSupportNeeds',
    '00NdL0000248tAT': 'roleTypesNeeded',
    '00NdL0000248vAf': 'openPositionsCount',
    '00NdL0000248x2n': 'eventName',
    '00NdL0000248yOf': 'ejpSourcePage'
  };

  // Expose field IDs so per-page code can use them in hidden inputs
  window.SF_FIELDS = SF_FIELDS;
  window.SF_ORG_ID = SF_ORG_ID;
  window.SITE_BASE_URL = SITE_BASE_URL;

  // ─── Debug mode ───────────────────────────────────────────────────────────
  // Enable by adding ?debug=sf to any page URL.
  // Shows a floating debug panel and logs all submission details to console.

  var SF_DEBUG = /[?&]debug=sf/.test(window.location.search);
  window.SF_DEBUG = SF_DEBUG;

  // ─── submitToSalesforce ────────────────────────────────────────────────────
  // Collects all named inputs from formEl, appends standard hidden fields,
  // and POSTs to Salesforce Web-to-Lead via hidden iframe.
  //
  // options:
  //   onSuccess(formData)  — called after submission (SF doesn't return JSON)
  //   onError(err)         — called if fetch itself throws
  //   submissionType       — string logged to ejp_submissions ('job-seeker'|'employer'|'event'|'newsletter')
  //   sourcePage           — string for EJP_Source_Page__c hidden field (overrides form value)

  window.submitToSalesforce = function (formEl, options) {
    options = options || {};

    var submissionId = 'sf-' + Date.now();

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

    // Re-snapshot formData after hidden fields are set
    var finalFormData = {};
    new FormData(formEl).forEach(function (val, key) { finalFormData[key] = val; });

    // ── Debug: log all fields being submitted ──
    if (SF_DEBUG) {
      _debugLog(submissionId, 'PREPARING SUBMISSION', options, finalFormData);
    }
    console.group('[EJP SF] Submission — ' + (options.submissionType || 'unknown') + ' (' + submissionId + ')');
    console.log('Form element:', formEl.id || formEl);
    console.log('Submission type:', options.submissionType || '(not set)');
    console.log('Source page:', options.sourcePage || finalFormData[SF_FIELDS.ejpSourcePage] || '(not set)');
    console.log('Fields being sent:');
    var displayFields = {};
    Object.keys(finalFormData).forEach(function (k) {
      var label = SF_FIELD_LABELS[k] ? SF_FIELD_LABELS[k] + ' (' + k + ')' : k;
      displayFields[label] = finalFormData[k];
    });
    console.table(displayFields);

    // Check for commonly missing required fields
    var warnings = [];
    if (!finalFormData.oid)        warnings.push('❌ MISSING: oid (org ID)');
    if (!finalFormData.retURL)     warnings.push('❌ MISSING: retURL');
    if (!finalFormData.first_name) warnings.push('⚠️  MISSING: first_name');
    if (!finalFormData.email)      warnings.push('⚠️  MISSING: email');
    if (!finalFormData.lead_source) warnings.push('⚠️  MISSING: lead_source');
    if (!finalFormData[SF_FIELDS.ejpSourcePage]) warnings.push('⚠️  MISSING: ejpSourcePage custom field');
    if (warnings.length) {
      console.warn('[EJP SF] Validation warnings:\n  ' + warnings.join('\n  '));
    } else {
      console.log('✅ Required fields look OK');
    }

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

    // ── Wait for iframe to load before showing success to the user ──
    // onload fires when SF responds and redirects back to retURL.
    // Falls back after 15s so the user is never stuck waiting.
    var successCalled = false;
    function _callSuccess() {
      if (successCalled) return;
      successCalled = true;
      _logSubmission(finalFormData, options, submissionId);
      if (typeof options.onSuccess === 'function') {
        options.onSuccess(finalFormData);
      }
    }

    var iframeLoadTimer = setTimeout(function () {
      console.warn('[EJP SF] ⚠️  Iframe did not fire onload within 15s — request may be blocked by browser or network. Check: (1) tracker-blocking extensions, (2) network tab for the POST to webto.salesforce.com, (3) firewall/proxy.');
      if (SF_DEBUG) _debugUpdateStatus(submissionId, 'TIMEOUT — iframe never loaded (>15s). Check network tab.');
      _callSuccess(); // show success anyway so user isn't stuck
    }, 15000);

    iframe.onload = function () {
      clearTimeout(iframeLoadTimer);
      var loadTime = Date.now();
      console.log('[EJP SF] ✅ Iframe loaded — SF request completed at', new Date(loadTime).toISOString());
      console.log('[EJP SF] ℹ️  Note: iframe loaded = request reached SF servers. It does NOT confirm the lead was accepted. Check SF Web-to-Lead setup if leads are missing despite this firing.');
      if (SF_DEBUG) _debugUpdateStatus(submissionId, '✅ Iframe loaded — SF received the request at ' + new Date(loadTime).toISOString());
      iframe.onload = null;
      iframe.onerror = null;
      _callSuccess();
    };

    iframe.onerror = function () {
      clearTimeout(iframeLoadTimer);
      console.error('[EJP SF] ❌ Iframe onerror — network-level failure. The POST to webto.salesforce.com was blocked or failed.');
      if (SF_DEBUG) _debugUpdateStatus(submissionId, '❌ Iframe onerror — POST was blocked or failed at network level.');
      iframe.onload = null;
      iframe.onerror = null;
      _callSuccess(); // still show success — failure is network-level, not user error
    };

    var prevAction = formEl.action;
    var prevMethod = formEl.method;
    var prevTarget = formEl.target;

    formEl.action = SF_ENDPOINT;
    formEl.method = 'POST';
    formEl.target = iframeId;

    console.log('[EJP SF] Submitting to:', SF_ENDPOINT);
    formEl.submit();

    // Restore form attributes immediately after submit
    formEl.action = prevAction;
    formEl.method = prevMethod;
    formEl.target = prevTarget;

    console.groupEnd();
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

  // ─── i18n helper for programmatic strings (alerts, inline messages) ───────
  window.ejpI18n = function(key, replacements) {
    var isEs = false;
    try { isEs = localStorage.getItem('ejp_lang') === 'es'; } catch (e) {}
    var dict = (window._ejpI18n && window._ejpI18n.es) || {};
    var enDict = (window._ejpI18n && window._ejpI18n.en) || {};
    var template = isEs ? (dict[key] || '') : (enDict[key] || '');
    if (!template) template = key;
    if (replacements) {
      Object.keys(replacements).forEach(function(rk) {
        template = template.replace(new RegExp('\\{' + rk + '\\}', 'g'), replacements[rk]);
      });
    }
    return template;
  };

  // ─── showFormSuccess ──────────────────────────────────────────────────────
  // Replaces the contents of containerEl with a success state.
  // Supports legacy calls: showFormSuccess(container, enMessage, esMessage)
  // Supports keyed calls:  showFormSuccess(container, messageKey, replacements)

  window.showFormSuccess = function (containerEl, messageOrKey, esMessageOrReplacements) {
    if (!containerEl) return;
    var heading = window.ejpI18n('form-success-heading');
    var body;
    if (typeof esMessageOrReplacements === 'string') {
      // Legacy call: (container, enMessage, esMessage)
      var isEs = false;
      try { isEs = localStorage.getItem('ejp_lang') === 'es'; } catch (e) {}
      body = isEs ? esMessageOrReplacements : messageOrKey;
    } else {
      // New call: (container, messageKey, replacements)
      body = window.ejpI18n(messageOrKey, esMessageOrReplacements);
    }
    containerEl.innerHTML =
      '<div class="form-success">' +
        '<div class="form-success-icon">&#x2705;</div>' +
        '<h3>' + _esc(heading) + '</h3>' +
        '<p>' + _esc(body) + '</p>' +
      '</div>';
  };

  // ─── _logSubmission (private) ─────────────────────────────────────────────
  // Appends submission record to ejp_submissions in localStorage (for admin dashboard).
  // Also stores rawFields for debugging — so you can see exactly what was sent to SF.

  function _logSubmission(formData, options, submissionId) {
    try {
      // Build a human-readable version of rawFields (replace custom IDs with labels)
      var rawFields = {};
      Object.keys(formData).forEach(function (k) {
        var label = SF_FIELD_LABELS[k] ? SF_FIELD_LABELS[k] + ' [' + k + ']' : k;
        rawFields[label] = formData[k];
      });

      var submissions = JSON.parse(localStorage.getItem('ejp_submissions') || '[]');
      submissions.unshift({
        id:           submissionId || ('sf-' + Date.now()),
        timestamp:    new Date().toISOString(),
        name:         (formData.first_name || '') + ' ' + (formData.last_name || ''),
        email:        formData.email || '',
        type:         options.submissionType || 'unknown',
        sourcePage:   options.sourcePage || formData[SF_FIELDS.ejpSourcePage] || '',
        memberStatus: formData[SF_FIELDS.memberStatus] || '',
        notes:        formData.description || '',
        rawFields:    rawFields,   // full snapshot of every field sent to SF
        iframeStatus: 'pending'    // updated to 'loaded' or 'timeout' by iframe events
      });
      localStorage.setItem('ejp_submissions', JSON.stringify(submissions.slice(0, 50)));
    } catch (e) {}
  }

  // ─── Debug panel helpers ───────────────────────────────────────────────────
  // These only run when ?debug=sf is in the URL.

  function _debugLog(submissionId, status, options, formData) {
    var panel = _getOrCreateDebugPanel();
    var entry = document.createElement('div');
    entry.id = 'dbg-' + submissionId;
    entry.style.cssText = 'border:1px solid #555;border-radius:4px;padding:10px;margin-bottom:10px;background:#1a1a2e;';

    var rows = ['<b style="color:#7ecfff">ID:</b> ' + submissionId,
                '<b style="color:#7ecfff">Type:</b> ' + (options.submissionType || '—'),
                '<b style="color:#7ecfff">Source:</b> ' + (options.sourcePage || '—'),
                '<b style="color:#7ecfff">Status:</b> <span id="dbg-status-' + submissionId + '" style="color:#ffd700">Submitting…</span>',
                '<b style="color:#7ecfff">Fields:</b>'];

    Object.keys(formData).forEach(function (k) {
      var label = SF_FIELD_LABELS[k] ? SF_FIELD_LABELS[k] + ' (' + k + ')' : k;
      var val = String(formData[k]);
      // Redact org ID from display but flag if missing
      if (k === 'oid') val = val ? '✅ ' + val : '❌ MISSING';
      rows.push('  <span style="color:#aaa">' + label + ':</span> <span style="color:#fff">' + _esc(val) + '</span>');
    });

    entry.innerHTML = rows.join('<br>');
    panel.querySelector('#dbg-entries').prepend(entry);
  }

  function _debugUpdateStatus(submissionId, statusText) {
    var el = document.getElementById('dbg-status-' + submissionId);
    if (el) {
      el.textContent = statusText;
      el.style.color = statusText.indexOf('✅') === 0 ? '#4caf50' : '#ff5252';
    }
    // Also update localStorage entry
    try {
      var submissions = JSON.parse(localStorage.getItem('ejp_submissions') || '[]');
      var entry = submissions.find(function (s) { return s.id === submissionId; });
      if (entry) {
        entry.iframeStatus = statusText;
        localStorage.setItem('ejp_submissions', JSON.stringify(submissions));
      }
    } catch (e) {}
  }

  function _getOrCreateDebugPanel() {
    var existing = document.getElementById('sf-debug-panel');
    if (existing) return existing;

    var panel = document.createElement('div');
    panel.id = 'sf-debug-panel';
    panel.style.cssText = [
      'position:fixed;bottom:16px;right:16px;z-index:99999',
      'width:420px;max-height:60vh;overflow-y:auto',
      'background:#0d1117;color:#e6edf3;font:12px/1.5 monospace',
      'border:1px solid #30363d;border-radius:8px;padding:12px',
      'box-shadow:0 8px 32px rgba(0,0,0,0.6)'
    ].join(';');

    panel.innerHTML =
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">' +
        '<b style="color:#7ecfff;font-size:13px">⚡ EJP SF Debug</b>' +
        '<span style="color:#888;font-size:10px">?debug=sf active</span>' +
        '<button onclick="document.getElementById(\'sf-debug-panel\').remove()" ' +
          'style="background:none;border:none;color:#888;cursor:pointer;font-size:14px;padding:0 4px">✕</button>' +
      '</div>' +
      '<div style="font-size:10px;color:#888;margin-bottom:8px;">' +
        'Check browser console for full details.<br>' +
        'Iframe load = SF received the POST (not that the lead was accepted).' +
      '</div>' +
      '<div id="dbg-entries"></div>';

    document.body.appendChild(panel);
    return panel;
  }

  function _esc(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

})();
