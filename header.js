(function () {
  const headerHTML = `
  <header class="site-header">
    <div class="header-top">
      <div class="header-top-left">
        <div class="top-dropdown">
          <a href="#"><span data-i18n="nav-funds-resources">Funds &amp; Resources</span> <span class="nav-dropdown-arrow" aria-hidden="true"></span></a>
          <ul class="top-dropdown-menu">
            <li><a href="https://www.1199seiubenefits.org/funds-and-services/healthcare/" data-i18n="nav-fund-healthcare" target="_blank" rel="noopener">Healthcare</a></li>
            <li><a href="https://www.1199seiubenefits.org/pension-retirement/" data-i18n="nav-fund-pension" target="_blank" rel="noopener">Pension and Retirement</a></li>
            <li><a href="https://www.1199seiubenefits.org/training/" data-i18n="nav-fund-training" target="_blank" rel="noopener">Training and Employment</a></li>
            <li><a href="https://www.1199seiubenefits.org/childcare/" data-i18n="nav-fund-childcare" target="_blank" rel="noopener">Child Care and Youth Services</a></li>
          </ul>
        </div>
      </div>
      <div class="header-top-right">
        <div class="header-search-inline">
          <input type="text" placeholder="Search EJP..." data-i18n-placeholder="search-placeholder" autocomplete="off" aria-label="Search EJP">
          <span class="header-search-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg></span>
        </div>
        <button class="js-lang-toggle header-lang-toggle" aria-label="Switch language">Español</button>
      </div>
    </div>
    <div class="header-main">
      <a href="index.html" class="logo">
        <img src="assets/branding/logos/full-logo.svg" alt="EJP Logo" width="147" height="80">
        <span data-i18n="logo-sub">Employment &amp; Job Placement</span>
      </a>
      <nav aria-label="Main navigation">
        <ul class="nav-links">
          <li class="nav-dropdown">
            <a href="https://www.1199seiubenefits.org/training-and-education/"><span data-i18n="nav-training-education">Training &amp; Education</span> <span class="nav-dropdown-arrow" aria-hidden="true"></span></a>
            <ul class="nav-dropdown-menu">
              <li><a href="https://www.1199seiubenefits.org/pre-college-programs/" data-i18n="nav-te-precollege" target="_blank" rel="noopener">Pre-college Programs</a></li>
              <li><a href="https://www.1199seiubenefits.org/college-level-programs/" data-i18n="nav-te-college" target="_blank" rel="noopener">College-level Programs</a></li>
              <li><a href="https://www.1199seiubenefits.org/continuing-ed/" data-i18n="nav-te-continuing" target="_blank" rel="noopener">Continuing Education</a></li>
              <li><a href="https://www.1199seiubenefits.org/occupational-certifications/" data-i18n="nav-te-certifications" target="_blank" rel="noopener">Occupational Certifications</a></li>
              <li><a href="https://www.1199seiubenefits.org/home-care-workers-training/" data-i18n="nav-te-homecare" target="_blank" rel="noopener">Training for Home Care Workers</a></li>
              <li><a href="https://www.1199seiubenefits.org/rn-training/" data-i18n="nav-te-rn" target="_blank" rel="noopener">Training for Registered Nurses</a></li>
            </ul>
          </li>
          <li class="nav-dropdown">
            <a href="#"><span data-i18n="nav-employment">Employment</span> <span class="nav-dropdown-arrow" aria-hidden="true"></span></a>
            <ul class="nav-dropdown-menu">
              <li><a href="job-seekers.html" data-i18n="nav-job-seekers">For Job Seekers</a></li>
              <li><a href="employers.html" data-i18n="nav-employers">For Employers</a></li>
              <li><a href="cpt.html" data-i18n="nav-cpt">For CPT</a></li>
              <li><a href="events.html" data-i18n="nav-events">Events</a></li>
              <li><a href="#contact" data-i18n="nav-contact">Contact</a></li>
            </ul>
          </li>
          <li class="nav-dropdown">
            <a href="https://www.1199seiubenefits.org/citizenship-and-english/"><span data-i18n="nav-citizenship">Citizenship &amp; English</span> <span class="nav-dropdown-arrow" aria-hidden="true"></span></a>
            <ul class="nav-dropdown-menu">
              <li><a href="https://www.1199seiubenefits.org/citizenship-program/" data-i18n="nav-cit-program" target="_blank" rel="noopener">Citizenship Program</a></li>
              <li><a href="https://www.1199seiubenefits.org/esol/" data-i18n="nav-cit-esol" target="_blank" rel="noopener">ESOL</a></li>
            </ul>
          </li>
          <li><a href="https://www.1199seiubenefits.org/member-resources/" data-i18n="nav-member-resources" target="_blank" rel="noopener">Member Resources</a></li>
          <li><a href="#" class="nav-cta" data-i18n="nav-mytef">My TEF</a></li>
        </ul>
      </nav>
      <button class="mobile-nav-toggle" aria-expanded="false" aria-controls="mobile-nav" aria-label="Toggle navigation">
        <span></span><span></span><span></span>
      </button>
    </div>
    <nav class="mobile-nav" id="mobile-nav" aria-label="Mobile navigation">
      <div class="mobile-nav-inner">
      <ul>
        <li><a href="job-seekers.html" data-i18n="nav-job-seekers">For Job Seekers</a></li>
        <li><a href="employers.html" data-i18n="nav-employers">For Employers</a></li>
        <li><a href="cpt.html" data-i18n="nav-cpt">For CPT</a></li>
        <li><a href="events.html" data-i18n="nav-events">Events</a></li>
        <li><a href="#contact" data-i18n="nav-contact">Contact</a></li>
        <li><a href="#" class="nav-cta" data-i18n="nav-mytef">My TEF</a></li>
      </ul>
      </div>
    </nav>
  </header>
  `;

  // Use document.write for fastest injection to prevent layout shift (FCP)
  // Or use a placeholder if document.write is not preferred.
  // Given it's a static wireframe, a placeholder and immediate insertion is better.
  const placeholder = document.getElementById('header-placeholder');
  if (placeholder) {
    placeholder.outerHTML = headerHTML;
  } else {
    // Fallback: prepend to body if no placeholder
    const div = document.createElement('div');
    div.innerHTML = headerHTML.trim();
    document.body.prepend(div.firstChild);
  }

  // Dispatch event for other scripts to know header is ready
  // Use setTimeout(0) to ensure nav.js's deferred script runs first and registers its listener
  setTimeout(function() {
    window.dispatchEvent(new CustomEvent('ejp:header-ready'));
  }, 0);
})();
