'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { submitToSalesforce, saveSession } from '@/lib/sf-forms';

export default function WhyJoinPage() {
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const newsletterFormRef = useRef<HTMLFormElement>(null);

  function handleNewsletterSubmit(e: React.FormEvent) {
    e.preventDefault();
    const form = newsletterFormRef.current;
    if (!form) return;

    submitToSalesforce(form, {
      submissionType: 'newsletter',
      sourcePage: 'why-join',
      onSuccess: (data) => {
        saveSession({ firstName: data.first_name, email: data.email, memberStatus: 'non-member' });
        setNewsletterSuccess(true);
      },
    });
  }

  return (
    <main>

      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="page-hero-inner">
          <h1>Why Join 1199SEIU?</h1>
          <p>Healthcare isn&apos;t just a job &mdash; it&apos;s a calling. As a union member, you get the career support, training, and resources to turn that calling into a lasting career.</p>
        </div>
      </section>

      {/* BENEFITS OVERVIEW */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-kicker">Member benefits</span>
            <h2>What You Get as a Union Member</h2>
            <div className="section-divider" />
            <p>1199SEIU members and CPT graduates have access to a full suite of career services through the Training and Employment Funds.</p>
          </div>

          <div className="services-grid">
            <div className="service-card service-card--centered">
              <div className="service-card-icon primary" aria-hidden="true">💬</div>
              <h3>Dedicated Career Counseling</h3>
              <p>Work one-on-one with an experienced counselor who helps you set goals, explore options, and build a plan for your career.</p>
            </div>
            <div className="service-card service-card--centered">
              <div className="service-card-icon primary" aria-hidden="true">📝</div>
              <h3>Resume &amp; Interview Support</h3>
              <p>Get professional help crafting your resume and preparing for interviews so you make a strong impression.</p>
            </div>
            <div className="service-card service-card--centered">
              <div className="service-card-icon primary" aria-hidden="true">🤝</div>
              <h3>Job Placement &amp; Matching</h3>
              <p>Get matched with healthcare employers looking for qualified candidates through EJP&apos;s employer network.</p>
            </div>
            <div className="service-card service-card--centered">
              <div className="service-card-icon primary" aria-hidden="true">🎓</div>
              <h3>Training &amp; Skill-Building</h3>
              <p>Access workshops, professional development programs, and career advancement training through the Fund.</p>
            </div>
            <div className="service-card service-card--centered">
              <div className="service-card-icon primary" aria-hidden="true">💻</div>
              <h3>MyTEF Portal Access</h3>
              <p>Manage your career development in one place &mdash; sign up for classes, upload your resume, apply to programs, and more.</p>
            </div>
            <div className="service-card service-card--centered">
              <div className="service-card-icon primary" aria-hidden="true">🛡</div>
              <h3>Job Security Fund</h3>
              <p>If you&apos;re ever laid off, access re-employment assistance and priority career services to get back on track.</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY HEALTHCARE */}
      <section className="section section--neutral">
        <div className="container">
          <div className="section-header">
            <span className="section-kicker">The opportunity</span>
            <h2>Why Healthcare?</h2>
            <div className="section-divider" />
            <p>New York&apos;s healthcare industry is one of the largest and fastest-growing sectors in the state.</p>
          </div>

          <div className="services-grid grid-2">
            <div className="service-card">
              <h3>Growing Demand</h3>
              <p>Healthcare jobs are projected to grow significantly in the coming years, with thousands of new positions opening across New York.</p>
            </div>
            <div className="service-card">
              <h3>Meaningful Work</h3>
              <p>Healthcare careers offer the chance to make a real difference in people&apos;s lives every day &mdash; it&apos;s work that matters.</p>
            </div>
            <div className="service-card">
              <h3>Career Advancement</h3>
              <p>With the right training and support, healthcare offers clear paths for growth &mdash; from entry-level roles to specialized positions.</p>
            </div>
            <div className="service-card">
              <h3>Stability &amp; Benefits</h3>
              <p>Union healthcare jobs offer competitive wages, comprehensive benefits, and job security that other industries can&apos;t match.</p>
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="section" id="newsletter">
        <div className="container">
          {newsletterSuccess ? (
            <div className="newsletter-block">
              <div className="form-success">
                <div className="form-success-icon">✅</div>
                <h3>You&apos;re subscribed!</h3>
                <p>We&apos;ll keep you posted on healthcare careers and EJP events.</p>
              </div>
            </div>
          ) : (
            <div className="newsletter-block">
              <h2>Stay Connected</h2>
              <p>Not ready to join yet? Sign up for our newsletter to get updates on healthcare careers, events, and opportunities.</p>
              <form className="newsletter-form" ref={newsletterFormRef} noValidate onSubmit={handleNewsletterSubmit}>
                <input type="hidden" name="oid" value="00DdL00000rNMCb" />
                <input type="hidden" name="retURL" value="https://toolnyc.github.io/ejp/thank-you.html" />
                <input type="hidden" name="lead_source" value="Newsletter" />
                <input type="hidden" name="00NdL0000248yOf" value="why-join" />
                <input type="hidden" name="00NdL00002447vf" value="Non-Member" />
                <input
                  type="text"
                  name="first_name"
                  placeholder="First name"
                  className="newsletter-input"
                  style={{ maxWidth: '160px' }}
                  autoComplete="given-name"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your email address"
                  className="newsletter-input"
                  required
                  autoComplete="email"
                />
                <button type="submit" className="btn btn-primary btn-lg">Subscribe</button>
              </form>
              <p className="disclaimer-text">We respect your privacy. Unsubscribe at any time.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section section--secondary">
        <div className="container">
          <div className="section-header section-header--centered">
            <h2>Ready to Take the Next Step?</h2>
            <div className="section-divider" />
            <p>Whether you&apos;re looking for a job or want to build a long-term career, EJP is here to help.</p>
          </div>
          <div className="member-cta-row">
            <Link href="/job-seekers#get-started" className="btn btn-primary btn-lg">Explore Career Services &rarr;</Link>
            <a
              href="https://www.1199careers.org/careers-home/jobs"
              className="btn btn-secondary btn-lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Browse Open Jobs &rarr;
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
