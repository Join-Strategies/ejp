'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { submitToSalesforce } from '@/lib/sf-forms';

export default function EmployersPage() {
  const [vacancyOpen, setVacancyOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [vacancySuccess, setVacancySuccess] = useState<string | null>(null);
  const [contactSuccess, setContactSuccess] = useState<string | null>(null);
  const vacancyFormRef = useRef<HTMLFormElement>(null);
  const contactFormRef = useRef<HTMLFormElement>(null);

  function openVacancy() { setVacancyOpen(true); setVacancySuccess(null); }
  function openContact() { setContactOpen(true); setContactSuccess(null); }

  function handleVacancySubmit(e: React.FormEvent) {
    e.preventDefault();
    const form = vacancyFormRef.current;
    if (!form) return;

    const org   = (form.querySelector('#vacancy-org')   as HTMLInputElement).value.trim();
    const name  = (form.querySelector('#vacancy-name')  as HTMLInputElement).value.trim();
    const email = (form.querySelector('#vacancy-email') as HTMLInputElement).value.trim();
    const role  = (form.querySelector('#vacancy-role')  as HTMLSelectElement).value;
    const count = (form.querySelector('#vacancy-count') as HTMLInputElement).value;

    if (!org || !name || !email || !role || !count) {
      alert('Please fill in all required fields.');
      return;
    }

    // Split full name into first/last
    const nameParts = name.split(' ');
    let hiddenFirst = form.querySelector<HTMLInputElement>('[name="first_name"]');
    let hiddenLast  = form.querySelector<HTMLInputElement>('[name="last_name"]');
    if (!hiddenFirst) {
      hiddenFirst = document.createElement('input');
      hiddenFirst.type = 'hidden'; hiddenFirst.name = 'first_name';
      form.appendChild(hiddenFirst);
    }
    if (!hiddenLast) {
      hiddenLast = document.createElement('input');
      hiddenLast.type = 'hidden'; hiddenLast.name = 'last_name';
      form.appendChild(hiddenLast);
    }
    hiddenFirst.value = nameParts[0] || '';
    hiddenLast.value  = nameParts.slice(1).join(' ') || '';

    submitToSalesforce(form, {
      submissionType: 'employer',
      sourcePage: 'employers',
      onSuccess: () => {
        setVacancySuccess(`Thank you, ${nameParts[0] || 'there'}. Our employer relations team will be in touch soon.`);
      },
    });
  }

  function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault();
    const form = contactFormRef.current;
    if (!form) return;

    const first   = (form.querySelector('#contact-first')   as HTMLInputElement).value.trim();
    const last    = (form.querySelector('#contact-last')    as HTMLInputElement).value.trim();
    const org     = (form.querySelector('#contact-org')     as HTMLInputElement).value.trim();
    const email   = (form.querySelector('#contact-email')   as HTMLInputElement).value.trim();
    const message = (form.querySelector('#contact-message') as HTMLTextAreaElement).value.trim();

    if (!first || !last || !org || !email || !message) {
      alert('Please fill in all required fields.');
      return;
    }

    submitToSalesforce(form, {
      submissionType: 'employer',
      sourcePage: 'employers',
      onSuccess: (data) => {
        setContactSuccess(`Message received, ${data.first_name}. We'll be in touch soon.`);
      },
    });
  }

  return (
    <main>

      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="page-hero-inner">
          <h1>Find Qualified Healthcare Staff</h1>
          <p>Every year, thousands of New Yorkers choose healthcare not because it&apos;s a job, but because it&apos;s a calling. EJP connects you with qualified candidates who are motivated, vetted, and ready to fill your open roles.</p>
        </div>
      </section>

      {/* WHY PARTNER */}
      <section className="section">
        <div className="container">
          <div className="section-header reveal">
            <h2>Why Partner with EJP</h2>
            <div className="section-divider" />
            <p>We work with healthcare employers across New York to understand their specific staffing needs and match them with qualified candidates from our network.</p>
          </div>

          <div className="services-grid reveal-stagger" id="emp-why-partner">
            <div className="service-card service-card--centered">
              <div className="service-card-icon secondary" aria-hidden="true">🎓</div>
              <h3>CPT-Trained Candidates</h3>
              <p>Access a pipeline of graduates trained across 10 healthcare occupations &mdash; from nursing and allied health to technical and administrative roles.</p>
            </div>
            <div className="service-card service-card--centered">
              <div className="service-card-icon secondary" aria-hidden="true">✅</div>
              <h3>Pre-Screened &amp; Prepared</h3>
              <p>Our candidates have completed training, received career counseling, and are ready to work. No cold applicants &mdash; motivated professionals.</p>
            </div>
            <div className="service-card service-card--centered">
              <div className="service-card-icon secondary" aria-hidden="true">🤝</div>
              <h3>Ongoing Partnership</h3>
              <p>EJP isn&apos;t a one-time service. We build lasting relationships with employers to support continuous staffing and workforce development needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW TO WORK WITH US */}
      <section className="section employer-section">
        <div className="container">
          <div className="section-header reveal">
            <h2>How to Work with Us</h2>
            <div className="section-divider" />
          </div>

          <div className="services-grid grid-2 reveal-stagger">
            <div className="service-card employer-card">
              <div className="service-card-icon secondary" aria-hidden="true">📤</div>
              <h3>Submit Job Openings</h3>
              <p>Post your vacancies directly to our qualified candidate pool. We&apos;ll match you with CPT-trained professionals.</p>
              <button className="card-link" onClick={openVacancy}>Submit a Vacancy &rarr;</button>
            </div>
            <div className="service-card employer-card">
              <div className="service-card-icon secondary" aria-hidden="true">🏢</div>
              <h3>Become a Partner Provider</h3>
              <p>Join our network of healthcare employers committed to workforce development and community hiring.</p>
              <a href="#" className="card-link">Apply to Be a Partner &rarr;</a>
            </div>
            <div className="service-card employer-card">
              <div className="service-card-icon secondary" aria-hidden="true">📅</div>
              <h3>Attend Hiring Events</h3>
              <p>Meet qualified candidates in person at our career fairs and hiring events throughout New York.</p>
              <Link href="/events" className="card-link">View Upcoming Events &rarr;</Link>
            </div>
            <div className="service-card employer-card">
              <div className="service-card-icon secondary" aria-hidden="true">📞</div>
              <h3>Contact Employer Relations</h3>
              <p>Have questions about partnering with EJP? Our employer relations team is here to help.</p>
              <button className="card-link" onClick={openContact}>Get in Touch &rarr;</button>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="section section--secondary">
        <div className="container">
          <div className="section-header section-header--centered reveal">
            <h2>By the Numbers</h2>
            <div className="section-divider" />
            <p><em className="text-placeholder">[Real stats TBD from client]</em></p>
          </div>

          <div className="value-grid reveal-stagger">
            <div className="value-item value-item--secondary">
              <div className="value-item-number">7,500+</div>
              <h3>Trained Candidates</h3>
              <p>CPT participants ready for healthcare careers</p>
            </div>
            <div className="value-item value-item--secondary">
              <div className="value-item-number">10</div>
              <h3>Occupations</h3>
              <p>Across nursing, technical, and allied health</p>
            </div>
            <div className="value-item value-item--secondary">
              <div className="value-item-number">&mdash;</div>
              <h3>Placement Rate</h3>
              <p>Stat TBD</p>
            </div>
            <div className="value-item value-item--secondary">
              <div className="value-item-number">&mdash;</div>
              <h3>Employer Partners</h3>
              <p>Stat TBD</p>
            </div>
          </div>
        </div>
      </section>

      {/* VACANCY MODAL */}
      <div
        className={`modal-overlay${vacancyOpen ? ' is-open' : ' hidden'}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="vacancy-modal-title"
        onClick={(e) => { if (e.target === e.currentTarget) setVacancyOpen(false); }}
      >
        <div className="modal-box">
          <button className="modal-close" aria-label="Close" onClick={() => setVacancyOpen(false)}>&times;</button>
          <h2 id="vacancy-modal-title">Tell Us About Your Opening</h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xl)' }}>
            Submit your vacancy details and our employer relations team will follow up with you.
          </p>
          {vacancySuccess ? (
            <div className="form-success">
              <div className="form-success-icon">✅</div>
              <h3>You&apos;re all set</h3>
              <p>{vacancySuccess}</p>
            </div>
          ) : (
            <form ref={vacancyFormRef} id="vacancy-form" noValidate onSubmit={handleVacancySubmit}>
              <input type="hidden" name="oid" value="00DdL00000rNMCb" />
              <input type="hidden" name="retURL" value="https://toolnyc.github.io/ejp/thank-you.html" />
              <input type="hidden" name="lead_source" value="Employer - Vacancy Submission" />
              <input type="hidden" name="00NdL0000248yOf" value="employers" />

              <div className="form-group">
                <label htmlFor="vacancy-org">Organization Name <span aria-hidden="true">*</span></label>
                <input type="text" id="vacancy-org" name="company" required />
              </div>
              <div className="form-group">
                <label htmlFor="vacancy-name">Your Name <span aria-hidden="true">*</span></label>
                <input type="text" id="vacancy-name" name="_fullname" required placeholder="First and last name" />
              </div>
              <div className="form-group">
                <label htmlFor="vacancy-title">Job Title / Your Role <span aria-hidden="true">*</span></label>
                <input type="text" id="vacancy-title" name="title" required />
              </div>
              <div className="form-group">
                <label htmlFor="vacancy-email">Work Email <span aria-hidden="true">*</span></label>
                <input type="email" id="vacancy-email" name="email" required />
              </div>
              <div className="form-group">
                <label htmlFor="vacancy-phone">Phone</label>
                <input type="tel" id="vacancy-phone" name="phone" />
              </div>
              <div className="form-group">
                <label htmlFor="vacancy-role">Type of Role Needed <span aria-hidden="true">*</span></label>
                <select id="vacancy-role" name="00NdL0000248tAT" required>
                  <option value="">-- Select --</option>
                  <option>Registered Nurse (RN)</option>
                  <option>Licensed Practical Nurse (LPN)</option>
                  <option>Certified Nursing Assistant (CNA)</option>
                  <option>Home Health Aide (HHA)</option>
                  <option>Medical Assistant</option>
                  <option>Allied Health (specify below)</option>
                  <option>Administrative / Non-Clinical</option>
                  <option>Other (specify below)</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="vacancy-count">Number of Openings <span aria-hidden="true">*</span></label>
                <input type="number" id="vacancy-count" name="00NdL0000248vAf" min="1" required />
              </div>
              <div className="form-group">
                <label htmlFor="vacancy-notes">Additional Notes</label>
                <textarea id="vacancy-notes" name="description" rows={3} />
              </div>
              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', fontWeight: 400, cursor: 'pointer' }}>
                  <input type="checkbox" name="_hiring-event" value="Yes" /> Interested in attending a hiring event?
                </label>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">Submit Vacancy &rarr;</button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* CONTACT MODAL */}
      <div
        className={`modal-overlay${contactOpen ? ' is-open' : ' hidden'}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        onClick={(e) => { if (e.target === e.currentTarget) setContactOpen(false); }}
      >
        <div className="modal-box">
          <button className="modal-close" aria-label="Close" onClick={() => setContactOpen(false)}>&times;</button>
          <h2 id="contact-modal-title">Contact Employer Relations</h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xl)' }}>
            Have a question about partnering with EJP? We&apos;ll get back to you soon.
          </p>
          {contactSuccess ? (
            <div className="form-success">
              <div className="form-success-icon">✅</div>
              <h3>You&apos;re all set</h3>
              <p>{contactSuccess}</p>
            </div>
          ) : (
            <form ref={contactFormRef} id="contact-form" noValidate onSubmit={handleContactSubmit}>
              <input type="hidden" name="oid" value="00DdL00000rNMCb" />
              <input type="hidden" name="retURL" value="https://toolnyc.github.io/ejp/thank-you.html" />
              <input type="hidden" name="lead_source" value="Employer - General Inquiry" />
              <input type="hidden" name="00NdL0000248yOf" value="employers" />

              <div className="form-group">
                <label htmlFor="contact-first">First Name <span aria-hidden="true">*</span></label>
                <input type="text" id="contact-first" name="first_name" required />
              </div>
              <div className="form-group">
                <label htmlFor="contact-last">Last Name <span aria-hidden="true">*</span></label>
                <input type="text" id="contact-last" name="last_name" required />
              </div>
              <div className="form-group">
                <label htmlFor="contact-org">Organization <span aria-hidden="true">*</span></label>
                <input type="text" id="contact-org" name="company" required />
              </div>
              <div className="form-group">
                <label htmlFor="contact-email">Work Email <span aria-hidden="true">*</span></label>
                <input type="email" id="contact-email" name="email" required />
              </div>
              <div className="form-group">
                <label htmlFor="contact-phone">Phone</label>
                <input type="tel" id="contact-phone" name="phone" />
              </div>
              <div className="form-group">
                <label htmlFor="contact-message">How can we help? <span aria-hidden="true">*</span></label>
                <textarea id="contact-message" name="description" rows={4} required />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">Send Message &rarr;</button>
              </div>
            </form>
          )}
        </div>
      </div>

    </main>
  );
}
