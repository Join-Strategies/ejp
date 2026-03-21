'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { submitToSalesforce, saveSession, getSession } from '@/lib/sf-forms';

type WizardStep = 'step-1' | 'step-jobs' | 'step-2' | 'step-member' | 'step-nonmember';

export default function JobSeekersPage() {
  const [step, setStep] = useState<WizardStep>('step-1');
  const [returning, setReturning] = useState<{ name: string; destStep: WizardStep } | null>(null);
  const [memberSuccess, setMemberSuccess] = useState<string | null>(null);
  const [nonmemberSuccess, setNonmemberSuccess] = useState(false);
  const memberFormRef = useRef<HTMLFormElement>(null);
  const nonmemberFormRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const session = getSession();
    if (!session?.firstName) return;
    const destStep: WizardStep =
      session.memberStatus === 'non-member' ? 'step-nonmember' : 'step-member';
    const statusLabel =
      session.memberStatus === 'non-member' ? 'not a member yet' : 'a union member';
    setReturning({ name: session.firstName, destStep });
    // Show banner text in component below
    void statusLabel;
  }, []);

  function wizardGo(s: WizardStep) {
    setStep(s);
    document.getElementById('get-started')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function handleMemberSubmit(e: React.FormEvent) {
    e.preventDefault();
    const form = memberFormRef.current;
    if (!form) return;

    const firstName = (form.querySelector('#member-first-name') as HTMLInputElement).value.trim();
    const lastName  = (form.querySelector('#member-last-name')  as HTMLInputElement).value.trim();
    const email     = (form.querySelector('#member-email')      as HTMLInputElement).value.trim();
    if (!firstName || !lastName || !email) {
      alert('Please fill in your first name, last name, and email.');
      return;
    }

    // Collect checkboxes into hidden field
    const checked = Array.from(form.querySelectorAll<HTMLInputElement>('[name="_support"]:checked'))
      .map(cb => cb.value);
    (form.querySelector('#member-support-needs') as HTMLInputElement).value = checked.join(', ');

    // Mirror radio to hidden field
    const statusRadio = form.querySelector<HTMLInputElement>('[name="_memberStatus"]:checked');
    if (statusRadio) {
      (form.querySelector('#member-status-hidden') as HTMLInputElement).value = statusRadio.value;
    }

    submitToSalesforce(form, {
      submissionType: 'job-seeker',
      sourcePage:     'job-seekers - wizard',
      onSuccess: (data) => {
        saveSession({
          firstName:    data.first_name,
          lastName:     data.last_name,
          email:        data.email,
          memberStatus: 'union-member',
        });
        setMemberSuccess(`We've got you, ${data.first_name}. A counselor will be in touch soon.`);
      },
    });
  }

  function handleNonmemberSubmit(e: React.FormEvent) {
    e.preventDefault();
    const form = nonmemberFormRef.current;
    if (!form) return;

    const firstName = (form.querySelector('#nonmember-first-name') as HTMLInputElement).value.trim();
    const email     = (form.querySelector('#nonmember-email')      as HTMLInputElement).value.trim();
    if (!firstName || !email) {
      alert('Please fill in your first name and email.');
      return;
    }

    submitToSalesforce(form, {
      submissionType: 'job-seeker',
      sourcePage:     'job-seekers - wizard',
      onSuccess: (data) => {
        saveSession({ firstName: data.first_name, email: data.email, memberStatus: 'non-member' });
        setNonmemberSuccess(true);
        setTimeout(() => { window.location.href = '/why-join'; }, 1500);
      },
    });
  }

  const session = returning
    ? getSession()
    : null;
  const statusLabel = session?.memberStatus === 'non-member' ? 'not a member yet' : 'a union member';

  return (
    <main>

      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="page-hero-inner">
          <h1>Building the Healthcare Workforce of Tomorrow</h1>
          <p>As part of the 1199SEIU Training and Employment Funds, EJP provides job seekers with resources and support to build a career in healthcare.</p>
        </div>
      </section>

      {/* WIZARD */}
      <section className="section" id="get-started">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-kicker">Get started</span>
            <h2>How Can We Help You?</h2>
            <div className="section-divider" />
            <p>Select the option that best describes what you&apos;re looking for.</p>
          </div>

          {/* Returning visitor banner */}
          {returning && (
            <div className="returning-banner">
              <span>Welcome back, {returning.name}. Last time you told us you&apos;re {statusLabel}.</span>
              <div className="banner-actions">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => { setReturning(null); wizardGo(returning.destStep); }}
                >
                  Start where you left off &rarr;
                </button>
              </div>
            </div>
          )}

          {/* Step 1 */}
          <div className={`wizard-step ${step === 'step-1' ? 'active' : 'wizard-step--hidden'}`}>
            <div className="wizard-cards">
              <button className="wizard-card" onClick={() => wizardGo('step-jobs')}>
                <div className="wizard-card-icon" aria-hidden="true">💼</div>
                <h3>I&apos;m Looking for a Job</h3>
                <p>Browse open healthcare positions and submit your resume to employers across New York.</p>
              </button>
              <button className="wizard-card" onClick={() => wizardGo('step-2')}>
                <div className="wizard-card-icon" aria-hidden="true">📋</div>
                <h3>I&apos;m Looking for Career Support</h3>
                <p>Access career counseling, resume help, interview prep, training programs, and more.</p>
              </button>
            </div>
          </div>

          {/* Step 2: Membership check */}
          <div className={`wizard-step ${step === 'step-2' ? 'active' : 'wizard-step--hidden'}`}>
            <button className="wizard-back" onClick={() => wizardGo('step-1')}>&larr; Back</button>
            <div className="wizard-cards">
              <button className="wizard-card wizard-card--result" onClick={() => wizardGo('step-member')}>
                <div className="wizard-card-icon" aria-hidden="true">✅</div>
                <h3>I&apos;m a Union Member</h3>
                <span className="wizard-card-sub">Including CPT graduates</span>
                <p>Connect with a career counselor who can help with job placement, counseling, and more.</p>
                <span className="btn btn-primary">Get Career Support &rarr;</span>
              </button>
              <button className="wizard-card wizard-card--result" onClick={() => wizardGo('step-nonmember')}>
                <div className="wizard-card-icon" aria-hidden="true">🌟</div>
                <h3>I&apos;m Not a Union Member</h3>
                <p>Learn about the benefits of 1199SEIU membership and how to access career services.</p>
                <span className="btn btn-secondary">Learn More &rarr;</span>
              </button>
            </div>
          </div>

          {/* Step: Jobs destination */}
          <div className={`wizard-step ${step === 'step-jobs' ? 'active' : 'wizard-step--hidden'}`}>
            <button className="wizard-back" onClick={() => wizardGo('step-1')}>&larr; Back</button>
            <div className="wizard-result">
              <h3>Browse Open Positions</h3>
              <p>Search healthcare job openings and submit your resume directly to employers.</p>
              <a
                href="https://www.1199careers.org/careers-home/jobs"
                className="btn btn-primary btn-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Browse Jobs &rarr;
              </a>
            </div>
          </div>

          {/* Step: Member form */}
          <div className={`wizard-step ${step === 'step-member' ? 'active' : 'wizard-step--hidden'}`}>
            <button className="wizard-back" onClick={() => wizardGo('step-2')}>&larr; Back</button>
            <div className="wizard-form" id="member-form-container">
              {memberSuccess ? (
                <div className="form-success">
                  <div className="form-success-icon">✅</div>
                  <h3>You&apos;re all set</h3>
                  <p>{memberSuccess}</p>
                  <p style={{ textAlign: 'center', marginTop: '1rem' }}>
                    <a href="#" className="card-link">Already have a MyTEF account? Log in &rarr;</a>
                  </p>
                </div>
              ) : (
                <>
                  <h3>Let&apos;s connect you with career services</h3>
                  <p>Fill out the form below and a career counselor will reach out to get you started.</p>
                  <form ref={memberFormRef} id="member-intake-form" noValidate onSubmit={handleMemberSubmit}>
                    <input type="hidden" name="oid" value="00DdL00000rNMCb" />
                    <input type="hidden" name="retURL" value="https://toolnyc.github.io/ejp/thank-you.html" />
                    <input type="hidden" name="lead_source" value="Job Seeker - Union Member" />
                    <input type="hidden" name="00NdL0000248yOf" value="job-seekers - wizard" />
                    <input type="hidden" id="member-status-hidden" name="00NdL00002447vf" defaultValue="Member" />
                    <input type="hidden" id="member-support-needs" name="00NdL0000248phx" defaultValue="" />

                    <div className="form-group">
                      <label htmlFor="member-first-name">First Name <span aria-hidden="true">*</span></label>
                      <input type="text" id="member-first-name" name="first_name" required autoComplete="given-name" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="member-last-name">Last Name <span aria-hidden="true">*</span></label>
                      <input type="text" id="member-last-name" name="last_name" required autoComplete="family-name" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="member-email">Email <span aria-hidden="true">*</span></label>
                      <input type="email" id="member-email" name="email" required autoComplete="email" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="member-phone">Phone</label>
                      <input type="tel" id="member-phone" name="phone" autoComplete="tel" />
                    </div>
                    <div className="form-group">
                      <label>Member Status <span aria-hidden="true">*</span></label>
                      <div className="form-group--radio-group">
                        <label><input type="radio" name="_memberStatus" value="Member" required /> Active Union Member</label>
                        <label><input type="radio" name="_memberStatus" value="Member" /> CPT Graduate</label>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>What kind of support are you looking for?</label>
                      <div className="form-group--checkbox-group">
                        <label><input type="checkbox" name="_support" value="Resume Assistance" /> Resume Assistance</label>
                        <label><input type="checkbox" name="_support" value="Career Counseling" /> Career Counseling</label>
                        <label><input type="checkbox" name="_support" value="Interview Preparation" /> Interview Preparation</label>
                        <label><input type="checkbox" name="_support" value="Job Placement / Matching" /> Job Placement / Matching</label>
                        <label><input type="checkbox" name="_support" value="Workshop / Training" /> Workshop / Training</label>
                      </div>
                    </div>
                    <div className="form-actions">
                      <button type="submit" className="btn btn-primary">Connect Me with a Counselor &rarr;</button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>

          {/* Step: Non-member form */}
          <div className={`wizard-step ${step === 'step-nonmember' ? 'active' : 'wizard-step--hidden'}`}>
            <button className="wizard-back" onClick={() => wizardGo('step-2')}>&larr; Back</button>
            <div className="wizard-form" id="nonmember-form-container">
              {nonmemberSuccess ? (
                <div className="form-success">
                  <div className="form-success-icon">✅</div>
                  <h3>Got it.</h3>
                  <p>Taking you to learn more about membership&hellip;</p>
                </div>
              ) : (
                <>
                  <h3>You&apos;re in the right place</h3>
                  <p>Leave your email and we&apos;ll send you information about how to access career services &mdash; no membership required to start.</p>
                  <form ref={nonmemberFormRef} id="nonmember-intake-form" noValidate onSubmit={handleNonmemberSubmit}>
                    <input type="hidden" name="oid" value="00DdL00000rNMCb" />
                    <input type="hidden" name="retURL" value="https://toolnyc.github.io/ejp/thank-you.html" />
                    <input type="hidden" name="lead_source" value="Job Seeker - Non-Member" />
                    <input type="hidden" name="00NdL0000248yOf" value="job-seekers - wizard" />
                    <input type="hidden" name="00NdL00002447vf" value="Non-Member" />

                    <div className="form-group">
                      <label htmlFor="nonmember-first-name">First Name <span aria-hidden="true">*</span></label>
                      <input type="text" id="nonmember-first-name" name="first_name" required autoComplete="given-name" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="nonmember-email">Email <span aria-hidden="true">*</span></label>
                      <input type="email" id="nonmember-email" name="email" required autoComplete="email" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="nonmember-reason">What brought you here?</label>
                      <select id="nonmember-reason" name="description">
                        <option value="">-- Select one --</option>
                        <option value="I'm looking for a healthcare job">I&apos;m looking for a healthcare job</option>
                        <option value="I want to explore training programs">I want to explore training programs</option>
                        <option value="I heard about 1199SEIU and want to learn more">I heard about 1199SEIU and want to learn more</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="form-actions">
                      <button type="submit" className="btn btn-primary">Send Me More Info &rarr;</button>
                      <Link href="/why-join" className="btn btn-ghost">Skip &mdash; just show me what&apos;s available &rarr;</Link>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* MEMBER BENEFITS */}
      <section className="section section--neutral" id="member-benefits">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-kicker">Why join 1199SEIU</span>
            <h2>Career Services That Set You Apart</h2>
            <div className="section-divider" />
            <p>Union members and CPT graduates get access to a full suite of career support &mdash; from one-on-one counseling to job placement and beyond.</p>
          </div>

          <div className="services-grid grid-2 reveal-stagger">
            <div className="service-card">
              <div className="service-card-icon primary" aria-hidden="true">📝</div>
              <h3>Resume Assistance</h3>
              <p>Get help crafting a professional resume that highlights your training, experience, and strengths.</p>
            </div>
            <div className="service-card">
              <div className="service-card-icon primary" aria-hidden="true">💬</div>
              <h3>Career Counseling</h3>
              <p>Work with a dedicated counselor to identify your goals, explore options, and build a plan.</p>
            </div>
            <div className="service-card">
              <div className="service-card-icon primary" aria-hidden="true">🎯</div>
              <h3>Interview Preparation</h3>
              <p>Practice interviews, get feedback, and build the confidence to make a strong impression.</p>
            </div>
            <div className="service-card">
              <div className="service-card-icon primary" aria-hidden="true">📚</div>
              <h3>Workshops &amp; Skill-Building</h3>
              <p>Join group sessions on job search strategies, professional development, and workplace readiness.</p>
            </div>
            <div className="service-card">
              <div className="service-card-icon primary" aria-hidden="true">🤝</div>
              <h3>Placement Support</h3>
              <p>Get matched with employers looking for qualified healthcare professionals through our network.</p>
            </div>
            <div className="service-card">
              <div className="service-card-icon primary" aria-hidden="true">🛡</div>
              <h3>Job Security Fund</h3>
              <p>If you&apos;ve been laid off, access re-employment assistance and priority career services.</p>
            </div>
          </div>

          <div className="member-cta-row">
            <a href="#" className="btn btn-primary btn-lg">Already a Member? Log In to MyTEF &rarr;</a>
            <Link href="/why-join" className="btn btn-secondary btn-lg">Not a Member? Learn How to Join &rarr;</Link>
          </div>
        </div>
      </section>

      {/* MyTEF PORTAL */}
      <section className="section mytef-section" id="mytef-portal">
        <div className="container">
          <div className="section-header reveal">
            <h2>MyTEF Portal</h2>
            <div className="section-divider" />
            <p>Your training and employment hub &mdash; manage your career development tools in one place.</p>
          </div>

          <div className="mytef-features">
            <div className="mytef-feature">
              <h3>Sign Up for Classes</h3>
              <p>Browse and enroll in available training programs</p>
            </div>
            <div className="mytef-feature">
              <h3>Apply for Programs</h3>
              <p>Submit applications for career advancement opportunities</p>
            </div>
            <div className="mytef-feature">
              <h3>Upload Resume</h3>
              <p>Keep your resume on file for employer matching</p>
            </div>
            <div className="mytef-feature">
              <h3>Check Reimbursement</h3>
              <p>View the status of your tuition and expense reimbursements</p>
            </div>
          </div>

          <div className="text-center mt-xl">
            <a href="#" className="btn btn-primary btn-lg">Log In to MyTEF Portal &rarr;</a>
          </div>
        </div>
      </section>

    </main>
  );
}
