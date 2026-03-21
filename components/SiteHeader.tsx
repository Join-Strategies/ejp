'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MYTEF_URL = 'https://1199seiutef.my.site.com/s/login/';

const navLinks = [
  { href: '/job-seekers', label: 'For Job Seekers' },
  { href: '/employers',   label: 'For Employers' },
  { href: '/why-join',    label: 'About' },
  { href: '/events',      label: 'Events' },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mytefOpen, setMytefOpen] = useState(false);

  // Close mobile nav on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  // Escape key closes whichever modal is open
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setMytefOpen(false);
        setMobileOpen(false);
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Lock body scroll when MyTEF modal is open
  useEffect(() => {
    document.body.classList.toggle('modal-open', mytefOpen);
    return () => { document.body.classList.remove('modal-open'); };
  }, [mytefOpen]);

  const openMyTEF = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setMytefOpen(true);
  }, []);

  return (
    <>
      <header className="site-header">
        {/* Top bar */}
        <div className="header-top">
          <span>An 1199SEIU Training &amp; Employment Funds Program</span>
          <div>
            <a href="#" className="nav-cta" onClick={openMyTEF}>MyTEF Portal</a>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <a href="#">Espa&ntilde;ol</a>
          </div>
        </div>

        {/* Main bar */}
        <div className="header-main">
          <Link href="/" className="logo">
            <div className="logo-mark">EJP</div>
            <span>Employment &amp; Job Placement</span>
          </Link>

          <nav aria-label="Main navigation">
            <ul className="nav-links">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className={pathname === href ? 'active' : ''}>
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <a href="#" className="nav-cta" onClick={openMyTEF}>My TEF</a>
              </li>
            </ul>
          </nav>

          <button
            className="mobile-nav-toggle"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label="Toggle navigation"
            onClick={() => setMobileOpen(o => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {/* Mobile nav */}
        <nav
          id="mobile-nav"
          className={`mobile-nav${mobileOpen ? ' is-open' : ''}`}
          aria-label="Mobile navigation"
        >
          <div className="mobile-nav-inner">
            <ul>
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
              <li>
                <a href="#" className="nav-cta" onClick={openMyTEF}>My TEF</a>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      {/* MyTEF Modal */}
      <div
        id="mytef-modal"
        className={`modal-overlay${mytefOpen ? ' is-open' : ' hidden'}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mytef-modal-title"
        onClick={(e) => { if (e.target === e.currentTarget) setMytefOpen(false); }}
      >
        <div className="modal-box mytef-modal-box">
          <button
            className="modal-close"
            aria-label="Close"
            onClick={() => setMytefOpen(false)}
          >
            &times;
          </button>
          <div className="mytef-modal-logo" aria-hidden="true">myTEF</div>
          <h2 className="mytef-modal-title" id="mytef-modal-title">My TEF Portal</h2>
          <p className="mytef-modal-body">
            Access your training records, class enrollments, program applications, resume,
            and reimbursement status — all in the secure myTEF member portal.
          </p>
          <ul className="mytef-modal-features">
            <li>Sign up for classes &amp; training programs</li>
            <li>Apply for career advancement opportunities</li>
            <li>Upload and manage your resume</li>
            <li>Check tuition &amp; expense reimbursements</li>
          </ul>
          <a
            href={MYTEF_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-lg mytef-modal-cta"
          >
            Go to My TEF Portal &rarr;
          </a>
          <p className="mytef-modal-footnote">
            You&apos;ll be taken to the secure 1199SEIU TEF member portal to log in.
          </p>
        </div>
      </div>
    </>
  );
}
