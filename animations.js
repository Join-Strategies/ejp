/**
 * EJP Animations
 * GSAP 3 + ScrollTrigger for scroll-driven reveals,
 * hero entry, and page transitions.
 *
 * Loaded after GSAP CDN scripts in each HTML page.
 */
(function () {
  'use strict';

  // ─── Guard: do nothing if prefers-reduced-motion ───────────────────────────
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ─── Register GSAP plugins ─────────────────────────────────────────────────
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  } else {
    // GSAP not loaded — fall back to CSS-only reveals via IntersectionObserver
    initFallbackReveal();
    return;
  }

  if (reducedMotion) {
    // Still reveal elements (opacity: 0 → 1) but skip all transforms/filters
    ScrollTrigger.defaults({ toggleActions: 'play none none none' });
    revealWithScrollTrigger({ duration: 0.01, y: 0, filter: 'none' });
    return;
  }

  // ─── Hero entry stagger ────────────────────────────────────────────────────
  // Stagger hero children in with blur-reveal effect.
  // CSS already animates these on load via .hero-inner > * keyframes,
  // but if GSAP is available it takes over for more control.
  // We override the CSS animation by setting will-change and using GSAP.
  var heroChildren = document.querySelectorAll('.hero-inner > *');
  if (heroChildren.length) {
    gsap.set(heroChildren, { opacity: 0, y: 12, filter: 'blur(4px)', clearProps: 'animation' });
    gsap.to(heroChildren, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.12,
      clearProps: 'filter',  // clean up filter after animation to avoid compositing cost
      delay: 0.05
    });
  }

  // ─── Scroll-triggered reveals ──────────────────────────────────────────────
  revealWithScrollTrigger({ duration: 0.6, y: 16, filter: 'blur(3px)' });

  // ─── Page-level fade-in for non-hero pages ─────────────────────────────────
  // When navigating to a new page, the main content fades in.
  var main = document.querySelector('main');
  if (main && !document.querySelector('.hero')) {
    gsap.from(main, {
      opacity: 0,
      y: 10,
      duration: 0.45,
      ease: 'power2.out'
    });
  }

  // ─── Wizard step transitions ───────────────────────────────────────────────
  // Intercept the global showStep function (defined inline in wireframe.html)
  // and add directional slide transitions.
  if (typeof window.showStep === 'function') {
    var _origShowStep = window.showStep;
    var _currentStep = null;

    window.showStep = function (stepId) {
      var allSteps = document.querySelectorAll('[data-step]');
      var nextEl = document.querySelector('[data-step="' + stepId + '"]');
      if (!nextEl) { _origShowStep(stepId); return; }

      var goingForward = true;
      if (_currentStep) {
        var currentEl = document.querySelector('[data-step="' + _currentStep + '"]');
        if (currentEl) {
          var currentNum = parseInt(_currentStep, 10);
          var nextNum    = parseInt(stepId, 10);
          goingForward = nextNum > currentNum;

          gsap.to(currentEl, {
            opacity: 0,
            x: goingForward ? -20 : 20,
            duration: 0.22,
            ease: 'power2.in',
            onComplete: function () {
              currentEl.style.display = 'none';
              currentEl.classList.remove('active');
            }
          });
        }
      }

      _currentStep = stepId;
      nextEl.style.display = 'block';
      nextEl.classList.add('active');
      gsap.fromTo(nextEl,
        { opacity: 0, x: goingForward ? 20 : -20 },
        { opacity: 1, x: 0, duration: 0.28, ease: 'power2.out', delay: 0.1 }
      );

      // Update progress bar
      _origShowStep(stepId);
    };
  }

  // ─── CPT banner entrance ───────────────────────────────────────────────────
  var cptBanner = document.querySelector('.cpt-banner');
  if (cptBanner) {
    gsap.from(cptBanner, {
      opacity: 0,
      y: -8,
      duration: 0.4,
      ease: 'power2.out',
      delay: 0.6
    });
  }

  // ─── Helper: scroll-triggered blur-reveal ─────────────────────────────────
  function revealWithScrollTrigger(opts) {
    // Single elements with .reveal
    gsap.utils.toArray('.reveal').forEach(function (el) {
      gsap.fromTo(el,
        { opacity: 0, y: opts.y, filter: opts.filter },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: opts.duration,
          ease: 'power2.out',
          clearProps: 'filter',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // Staggered grids with .reveal-stagger
    gsap.utils.toArray('.reveal-stagger').forEach(function (container) {
      var children = container.children;
      gsap.fromTo(children,
        { opacity: 0, y: opts.y, filter: opts.filter },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: opts.duration,
          ease: 'power2.out',
          stagger: 0.07,
          clearProps: 'filter',
          scrollTrigger: {
            trigger: container,
            start: 'top 88%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
  }

  // ─── Fallback: CSS-only reveal via IntersectionObserver ───────────────────
  function initFallbackReveal() {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -32px 0px' }
    );
    document.querySelectorAll('.reveal, .reveal-stagger').forEach(function (el) {
      observer.observe(el);
    });
  }

})();
