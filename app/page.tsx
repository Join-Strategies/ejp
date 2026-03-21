import Link from 'next/link';

export default function HomePage() {
  return (
    <main>

      {/* HERO */}
      <section className="hero">
        <div className="hero-inner editorial">
          <span className="hero-kicker">1199SEIU Training &amp; Employment Funds</span>
          <h1>More Than<br />Just a Job.</h1>
          <p className="hero-subtitle">We build careers.</p>
          <p className="hero-deck">
            EJP is your long-term partner in building a career that lasts — with personalized
            services, expert guidance, and a network that&apos;s been supporting New York&apos;s
            workforce for decades.
          </p>
          <div className="hero-actions">
            <Link href="/job-seekers" className="btn btn-accent btn-lg">
              Find Career Services &rarr;
            </Link>
            <Link href="/employers" className="btn btn-hero-outline btn-lg">
              Hire Qualified Candidates
            </Link>
          </div>
        </div>
      </section>

      {/* CPT CALLOUT */}
      <div className="cpt-banner">
        <div className="cpt-banner-inner">
          <strong>Completing your CPT training?</strong>
          <span>Your career services team is ready to help you find placement.</span>
          <Link href="/job-seekers#cpt" className="btn btn-primary">
            Start Here &rarr;
          </Link>
        </div>
      </div>

      {/* WHAT EJP DOES */}
      <section className="section">
        <div className="container">
          <div className="section-header section-header--centered reveal">
            <span className="section-kicker">What We Do</span>
            <h2>Three Pillars. One Mission.</h2>
            <div className="section-divider" />
            <p>
              EJP brings together career services, employer partnerships, and workforce training
              under one roof — connecting people to purpose in New York&apos;s healthcare system.
            </p>
          </div>

          <div className="services-grid reveal-stagger">
            <div className="service-card service-card--centered">
              <div className="service-card-icon primary" aria-hidden="true">🤝</div>
              <h3>Career Services &amp; Support</h3>
              <p>Resume assistance, career counseling, interview prep, and workshops — personalized guidance to help you succeed.</p>
              <Link href="/job-seekers" className="card-link">For Job Seekers &rarr;</Link>
            </div>
            <div className="service-card service-card--centered">
              <div className="service-card-icon secondary" aria-hidden="true">🏢</div>
              <h3>Employer Partnerships</h3>
              <p>We work with healthcare employers across New York to understand their staffing needs and match them with qualified candidates.</p>
              <Link href="/employers" className="card-link">For Employers &rarr;</Link>
            </div>
            <div className="service-card service-card--centered">
              <div className="service-card-icon accent" aria-hidden="true">🎓</div>
              <h3>Training-to-Career Pipeline</h3>
              <p>From CPT training through placement, we support the full journey from education to meaningful healthcare employment.</p>
              <Link href="/job-seekers#cpt" className="card-link">Learn More &rarr;</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT EJP */}
      <section id="about" className="section section--neutral">
        <div className="container">
          <div className="section-header reveal">
            <h2>About EJP</h2>
            <div className="section-divider" />
          </div>

          <div className="about-grid">
            <div className="about-content">
              <h3>Mission &amp; Vision</h3>
              <p>EJP is your long-term partner in healthcare employment. We support job seekers with career services, preparation, and guidance — and connect employers with motivated, qualified candidates from our network.</p>

              <h3>Our Approach</h3>
              <p>We believe in collaboration, empowerment, innovation, and impact. Every service we offer is designed to help job seekers prepare, grow, and thrive in New York&apos;s healthcare workforce.</p>

              <h3>Success Stories</h3>
              <blockquote>
                <em className="text-placeholder">[Placeholder — real testimonial TBD]</em><br /><br />
                &ldquo;Quote from a real EJP participant about their experience with career services and how the support helped them navigate their career path.&rdquo;
                <footer>&mdash; <strong>Name TBD</strong>, Role, CPT Class of 20XX</footer>
              </blockquote>
            </div>

            <div className="about-pillars reveal-stagger">
              <div className="pillar-card"><h4>Collaborate</h4><p>Partnering across employers, training programs, and union support systems</p></div>
              <div className="pillar-card"><h4>Empower</h4><p>Giving job seekers the tools, prep, and confidence to succeed</p></div>
              <div className="pillar-card"><h4>Innovate</h4><p>Modernizing healthcare workforce placement through technology</p></div>
              <div className="pillar-card"><h4>Impact</h4><p>Measurable outcomes — placements, retention, career growth</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section id="events" className="section value-prop">
        <div className="container">
          <div className="section-header section-header--centered reveal">
            <span className="section-kicker">Events</span>
            <h2>Meet Us in Person</h2>
            <div className="section-divider" />
            <p>Connect with EJP career counselors and employers at upcoming events.</p>
          </div>
          <div className="value-grid reveal-stagger">
            {[
              'Spring Career Fair',
              'Healthcare Hiring Event',
              'CPT Graduation & Placement',
              'Resume Workshop',
            ].map((name) => (
              <div key={name} className="value-item">
                <div className="value-item-icon" aria-hidden="true">📅</div>
                <h3>{name}</h3>
                <p>Date TBD — Location TBD</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/events" className="btn btn-primary">View All Events &rarr;</Link>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section contact-section">
        <div className="container">
          <div className="section-header reveal">
            <h2>Contact / Get Help</h2>
            <div className="section-divider" />
            <p>We&apos;re here to help. Reach out to the right team.</p>
          </div>
          <div className="contact-grid reveal-stagger">
            <div className="contact-card">
              <h3>Job Seeker Inquiries</h3>
              <p>Questions about career services, resume help, or getting started</p>
              <a href="#" className="btn btn-primary">Contact Career Services</a>
            </div>
            <div className="contact-card">
              <h3>Employer Inquiries</h3>
              <p>Interested in hiring or partnering with EJP</p>
              <a href="#" className="btn btn-secondary">Contact Employer Relations</a>
            </div>
            <div className="contact-card">
              <h3>Partnership Inquiries</h3>
              <p>Become a community-based organization or provider partner</p>
              <a href="#" className="btn btn-outline">Contact Partnerships</a>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
