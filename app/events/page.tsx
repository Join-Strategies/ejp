'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { submitToSalesforce, saveSession } from '@/lib/sf-forms';

interface EventInfo {
  id: string;
  name: string;
  date: string;
}

const EVENTS = [
  {
    id: 'spring-career-fair-2026',
    month: 'Jun',
    day: '14',
    title: 'Spring Career Fair 2026',
    location: '1199SEIU Headquarters, New York, NY',
    time: '10:00 AM – 3:00 PM',
    description: 'Meet healthcare employers hiring across nursing, allied health, and administrative roles. Bring your resume and dress professionally — on-the-spot interviews available.',
    btnLabel: 'Register',
  },
  {
    id: 'healthcare-hiring-event-jul-2026',
    month: 'Jul',
    day: '09',
    title: 'Healthcare Hiring Event',
    location: 'Location TBD',
    time: '11:00 AM – 2:00 PM',
    description: 'A focused hiring event with partner employers actively looking for CPT-trained candidates. Pre-registration recommended.',
    btnLabel: 'Register',
  },
  {
    id: 'resume-interview-workshop-jul-2026',
    month: 'Jul',
    day: '23',
    title: 'Resume & Interview Workshop',
    location: 'Virtual (Zoom)',
    time: '1:00 PM – 3:00 PM',
    description: 'Join our career counselors for a hands-on workshop covering resume best practices, interview techniques, and how to stand out to healthcare employers.',
    btnLabel: 'RSVP',
  },
  {
    id: 'cpt-graduation-aug-2026',
    month: 'Aug',
    day: '20',
    title: 'CPT Graduation & Placement Ceremony',
    location: '1199SEIU Headquarters, New York, NY',
    time: '5:00 PM – 8:00 PM',
    description: 'Celebrate the latest CPT graduates as they transition into healthcare careers. Includes employer networking and placement announcements.',
    btnLabel: 'Learn More',
  },
];

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<EventInfo | null>(null);
  const [regSuccess, setRegSuccess] = useState<string | null>(null);
  const regFormRef = useRef<HTMLFormElement>(null);

  function openEventModal(info: EventInfo) {
    setSelectedEvent(info);
    setRegSuccess(null);
  }

  function handleRegSubmit(e: React.FormEvent) {
    e.preventDefault();
    const form = regFormRef.current;
    if (!form) return;

    const firstName = (form.querySelector('#event-first-name') as HTMLInputElement).value.trim();
    const lastName  = (form.querySelector('#event-last-name')  as HTMLInputElement).value.trim();
    const email     = (form.querySelector('#event-email')      as HTMLInputElement).value.trim();
    const statusRadio = form.querySelector<HTMLInputElement>('[name="_eventMemberStatus"]:checked');

    if (!firstName || !lastName || !email || !statusRadio) {
      alert('Please fill in your name, email, and membership status.');
      return;
    }

    // Mirror radio to hidden field
    (form.querySelector('#field-member-status') as HTMLInputElement).value = statusRadio.value;
    if (selectedEvent) {
      (form.querySelector('#field-event-name') as HTMLInputElement).value = selectedEvent.id;
    }

    submitToSalesforce(form, {
      submissionType: 'event',
      sourcePage: 'events',
      onSuccess: (data) => {
        saveSession({
          firstName:    data.first_name,
          lastName:     data.last_name,
          email:        data.email,
          memberStatus: statusRadio.value === 'Non-Member' ? 'non-member' : 'union-member',
        });
        setRegSuccess(`You're registered, ${data.first_name}! We'll send confirmation details closer to the event.`);
      },
    });
  }

  const modalOpen = selectedEvent !== null;

  return (
    <main>

      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="page-hero-inner">
          <h1>Events &amp; Career Fairs</h1>
          <p>Meet EJP career counselors and healthcare employers in person. From career fairs to resume workshops, our events are designed to help you take the next step.</p>
        </div>
      </section>

      {/* UPCOMING EVENTS */}
      <section className="section">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-kicker">Upcoming</span>
            <h2>Upcoming Events</h2>
            <div className="section-divider" />
            <p>Connect with employers and career counselors at our upcoming events across New York.</p>
          </div>

          <div className="events-grid reveal-stagger">
            {EVENTS.map((evt) => (
              <div key={evt.id} className="event-card">
                <div className="event-date-badge" aria-hidden="true">
                  <span className="event-month">{evt.month}</span>
                  <span className="event-day">{evt.day}</span>
                </div>
                <div className="event-details">
                  <h3>{evt.title}</h3>
                  <div className="event-meta">
                    <span>📍 {evt.location}</span>
                    <span>🕒 {evt.time}</span>
                  </div>
                  <p>{evt.description}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => openEventModal({ id: evt.id, name: evt.title, date: `${evt.month} ${evt.day}` })}
                  >
                    {evt.btnLabel} &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>

          <p className="disclaimer-text text-center">Registration details coming soon. Dates and locations are subject to change.</p>
        </div>
      </section>

      {/* WHAT TO EXPECT */}
      <section className="section section--neutral">
        <div className="container">
          <div className="section-header section-header--centered reveal">
            <h2>What to Expect at Our Events</h2>
            <div className="section-divider" />
            <p>Whether you&apos;re a CPT graduate, a union member, or new to healthcare &mdash; our events are designed to help you connect, prepare, and advance.</p>
          </div>

          <div className="services-grid reveal-stagger">
            <div className="service-card service-card--centered">
              <div className="service-card-icon primary" aria-hidden="true">🤝</div>
              <h3>Meet Employers</h3>
              <p>Connect directly with healthcare organizations hiring across New York. Many of our career fairs include on-the-spot interviews.</p>
            </div>
            <div className="service-card service-card--centered">
              <div className="service-card-icon accent" aria-hidden="true">📝</div>
              <h3>Get Career Support</h3>
              <p>Our career counselors attend every event to provide resume reviews, guidance, and one-on-one support.</p>
            </div>
            <div className="service-card service-card--centered">
              <div className="service-card-icon secondary" aria-hidden="true">👥</div>
              <h3>Build Your Network</h3>
              <p>Meet other job seekers, learn from peers who&apos;ve landed roles, and become part of a community invested in your success.</p>
            </div>
          </div>
        </div>
      </section>

      {/* EMPLOYER CTA */}
      <section className="section section--secondary">
        <div className="container text-center">
          <div className="section-header section-header--centered reveal">
            <h2>Are You an Employer?</h2>
            <p>Participate in our career fairs and hiring events to meet qualified, CPT-trained healthcare candidates.</p>
          </div>
          <Link href="/employers" className="btn btn-secondary btn-lg">Partner with EJP &rarr;</Link>
        </div>
      </section>

      {/* EVENT REGISTRATION MODAL */}
      <div
        className={`modal-overlay${modalOpen ? ' is-open' : ' hidden'}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-modal-title"
        onClick={(e) => { if (e.target === e.currentTarget) setSelectedEvent(null); }}
      >
        <div className="modal-box">
          <button className="modal-close" aria-label="Close" onClick={() => setSelectedEvent(null)}>&times;</button>
          <h2 id="event-modal-title">Register for This Event</h2>
          {selectedEvent && (
            <h3 style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-base)', fontWeight: 500, marginBottom: 'var(--space-xl)' }}>
              {selectedEvent.name} &mdash; {selectedEvent.date}
            </h3>
          )}
          {regSuccess ? (
            <div className="form-success">
              <div className="form-success-icon">✅</div>
              <h3>You&apos;re registered!</h3>
              <p>{regSuccess}</p>
            </div>
          ) : (
            <form ref={regFormRef} id="event-registration-form" noValidate onSubmit={handleRegSubmit}>
              <input type="hidden" name="oid" value="00DdL00000rNMCb" />
              <input type="hidden" name="retURL" value="https://toolnyc.github.io/ejp/thank-you.html" />
              <input type="hidden" name="lead_source" value="Event Registration" />
              <input type="hidden" name="00NdL0000248yOf" value="events" />
              <input type="hidden" id="field-event-name" name="00NdL0000248x2n" defaultValue="" />
              <input type="hidden" id="field-member-status" name="00NdL00002447vf" defaultValue="" />

              <div className="form-group">
                <label htmlFor="event-first-name">First Name <span aria-hidden="true">*</span></label>
                <input type="text" id="event-first-name" name="first_name" required autoComplete="given-name" />
              </div>
              <div className="form-group">
                <label htmlFor="event-last-name">Last Name <span aria-hidden="true">*</span></label>
                <input type="text" id="event-last-name" name="last_name" required autoComplete="family-name" />
              </div>
              <div className="form-group">
                <label htmlFor="event-email">Email <span aria-hidden="true">*</span></label>
                <input type="email" id="event-email" name="email" required autoComplete="email" />
              </div>
              <div className="form-group">
                <label htmlFor="event-phone">Phone</label>
                <input type="tel" id="event-phone" name="phone" autoComplete="tel" />
              </div>
              <div className="form-group">
                <label>Are you a union member? <span aria-hidden="true">*</span></label>
                <div className="form-group--radio-group">
                  <label><input type="radio" name="_eventMemberStatus" value="Member" required /> Yes &mdash; 1199SEIU member</label>
                  <label><input type="radio" name="_eventMemberStatus" value="Member" /> Yes &mdash; CPT graduate</label>
                  <label><input type="radio" name="_eventMemberStatus" value="Non-Member" /> No &mdash; not yet a member</label>
                  <label><input type="radio" name="_eventMemberStatus" value="Non-Member" /> Not sure</label>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="event-occupation">What occupation are you interested in?</label>
                <select id="event-occupation" name="description">
                  <option value="">-- Select one --</option>
                  <option>Registered Nurse (RN)</option>
                  <option>Licensed Practical Nurse (LPN)</option>
                  <option>Certified Nursing Assistant (CNA)</option>
                  <option>Home Health Aide (HHA)</option>
                  <option>Medical Assistant</option>
                  <option>Allied Health</option>
                  <option>Administrative / Non-Clinical</option>
                  <option>Still figuring it out</option>
                </select>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">Complete Registration &rarr;</button>
              </div>
            </form>
          )}
        </div>
      </div>

    </main>
  );
}
