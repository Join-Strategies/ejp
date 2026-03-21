'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

const SF_CLIENT_ID   = '3MVG9GCMQoQ6rpzTl5XomGZj52vX.IUK9omskR.PfrYH2NnWGuxxE6AMauERygsNRohG99vETpkXK4c_LTrBV';
const SF_REDIRECT_URI = 'https://toolnyc.github.io/ejp/admin.html';
const SF_AUTH_URL    = 'https://login.salesforce.com/services/oauth2/authorize';
const SF_USERINFO    = 'https://login.salesforce.com/services/oauth2/userinfo';

interface Submission {
  id: string;
  timestamp: string;
  name: string;
  email: string;
  type: string;
  sourcePage: string;
  memberStatus: string;
  notes: string;
}

function esc(str: string) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export default function AdminPage() {
  const [authed, setAuthed]   = useState(false);
  const [userName, setUserName] = useState('—');
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  const loadSubmissions = useCallback(() => {
    try {
      const raw = localStorage.getItem('ejp_submissions') || '[]';
      setSubmissions(JSON.parse(raw));
    } catch (_) {
      setSubmissions([]);
    }
  }, []);

  const showDashboard = useCallback((name: string) => {
    setUserName(name || '—');
    setAuthed(true);
    loadSubmissions();
  }, [loadSubmissions]);

  useEffect(() => {
    // Check URL hash for OAuth token
    const hash = window.location.hash.slice(1);
    if (hash) {
      const params: Record<string, string> = {};
      hash.split('&').forEach(pair => {
        const [k, v] = pair.split('=');
        if (k && v) params[decodeURIComponent(k)] = decodeURIComponent(v);
      });
      if (params.access_token) {
        sessionStorage.setItem('sf_access_token', params.access_token);
        history.replaceState(null, '', window.location.pathname);
        fetch(SF_USERINFO, { headers: { Authorization: `Bearer ${params.access_token}` } })
          .then(r => r.json())
          .then((u: { name?: string; preferred_username?: string }) => {
            const name = u.name || u.preferred_username || 'Salesforce User';
            sessionStorage.setItem('sf_user', name);
            showDashboard(name);
          })
          .catch(() => showDashboard('Salesforce User'));
        return;
      }
    }

    // Already authenticated
    const token = sessionStorage.getItem('sf_access_token');
    if (token) {
      showDashboard(sessionStorage.getItem('sf_user') || 'Salesforce User');
    }
  }, [showDashboard]);

  // Poll for new submissions every 10s when authed
  useEffect(() => {
    if (!authed) return;
    const interval = setInterval(loadSubmissions, 10000);
    return () => clearInterval(interval);
  }, [authed, loadSubmissions]);

  function sfLogin() {
    window.location.href =
      `${SF_AUTH_URL}?response_type=token&client_id=${encodeURIComponent(SF_CLIENT_ID)}&redirect_uri=${encodeURIComponent(SF_REDIRECT_URI)}`;
  }

  function sfLogout() {
    sessionStorage.removeItem('sf_access_token');
    sessionStorage.removeItem('sf_user');
    setAuthed(false);
    setUserName('—');
  }

  function clearSubmissions() {
    if (confirm('Clear all demo submissions from localStorage?')) {
      localStorage.removeItem('ejp_submissions');
      loadSubmissions();
    }
  }

  const counts = {
    total:       submissions.length,
    'job-seeker': submissions.filter(s => s.type === 'job-seeker').length,
    employer:    submissions.filter(s => s.type === 'employer').length,
    event:       submissions.filter(s => s.type === 'event').length,
  };

  if (!authed) {
    return (
      <div className="login-screen">
        <div className="login-box">
          <div className="logo-mark">EJP</div>
          <h1>Demo Dashboard</h1>
          <p className="login-sub">Sign in with your Salesforce account to access the EJP demo dashboard.</p>
          <button className="btn-sf" onClick={sfLogin}>
            ☁️ Log In with Salesforce
          </button>
          <p className="login-footnote">Access is restricted to authorized Salesforce org members.</p>
        </div>
      </div>
    );
  }

  return (
    <main>
      <section className="section">
        <div className="container">

          {/* Header row */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-md)', marginBottom: 'var(--space-xl)' }}>
            <div>
              <h1 style={{ marginBottom: 'var(--space-xs)' }}>
                EJP Demo Dashboard
                <span className="admin-badge">Demo Admin</span>
              </h1>
              <p style={{ color: 'var(--color-text-secondary)' }}>Submissions captured in this browser session via localStorage. In production, this view is replaced by Salesforce Reports.</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
              <div className="sf-user-badge">
                <span>Signed in as <strong>{userName}</strong></span>
                <button onClick={sfLogout}>Sign Out</button>
              </div>
              <button className="clear-btn" onClick={clearSubmissions}>Clear all data</button>
            </div>
          </div>

          <div className="demo-notice">
            ⚠️ <strong>Demo Mode</strong> &mdash; Data stored locally in this browser. Not connected to a shared database.
          </div>

          {/* Stats */}
          <div className="stats-row">
            <div className="stat-card">
              <div className="stat-number">{counts.total}</div>
              <div className="stat-label">Total Submissions</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{counts['job-seeker']}</div>
              <div className="stat-label">Job Seeker Leads</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{counts.employer}</div>
              <div className="stat-label">Employer Leads</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{counts.event}</div>
              <div className="stat-label">Event Registrations</div>
            </div>
          </div>

          {/* Submissions table */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-md)' }}>
            <h2 style={{ fontSize: 'var(--text-xl)' }}>Recent Submissions</h2>
          </div>

          <div className="submissions-table-wrap">
            {submissions.length === 0 ? (
              <div className="empty-state">
                <div style={{ fontSize: '3rem' }}>📋</div>
                <p>No submissions yet.<br />Fill out a form on any page to see data here.</p>
              </div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Type</th>
                    <th>Source Page</th>
                    <th>Member Status</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((s) => {
                    const ts = s.timestamp
                      ? new Date(s.timestamp).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
                      : '—';
                    const typeClass = `type-badge--${s.type || 'unknown'}`;
                    return (
                      <tr key={s.id}>
                        <td style={{ whiteSpace: 'nowrap', color: 'var(--color-text-tertiary)' }}>{ts}</td>
                        <td>{s.name || '—'}</td>
                        <td>{s.email || '—'}</td>
                        <td><span className={`type-badge ${typeClass}`}>{s.type || 'unknown'}</span></td>
                        <td>{s.sourcePage || '—'}</td>
                        <td>{s.memberStatus || '—'}</td>
                        <td
                          style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                          title={s.notes || ''}
                          dangerouslySetInnerHTML={{ __html: esc(s.notes || '—') }}
                        />
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

          {/* Data model */}
          <div style={{ marginTop: 'var(--space-3xl)' }}>
            <div className="section-header" style={{ textAlign: 'left' }}>
              <h2>Unified Data Model</h2>
              <div className="section-divider" style={{ marginLeft: 0 }} />
              <p>Every user type flows into a single Salesforce Lead object &mdash; queryable together, no siloed databases.</p>
            </div>

            <div className="data-model">
              <div className="dm-grid">
                <div className="dm-box dm-box--primary">
                  <h4>Job Seeker Lead</h4>
                  <ul>
                    <li>first_name</li>
                    <li>last_name</li>
                    <li>email</li>
                    <li>Member_Status__c</li>
                    <li>Career_Support_Needs__c</li>
                    <li>EJP_Source_Page__c</li>
                    <li><span>lead_source: &quot;Job Seeker&quot;</span></li>
                  </ul>
                </div>
                <div className="dm-box dm-box--secondary">
                  <h4>Employer Lead</h4>
                  <ul>
                    <li>company</li>
                    <li>first_name / last_name</li>
                    <li>email</li>
                    <li>Employer_Role_Types__c</li>
                    <li>Employer_Opening_Count__c</li>
                    <li>EJP_Source_Page__c</li>
                    <li><span>lead_source: &quot;Employer&quot;</span></li>
                  </ul>
                </div>
              </div>

              <div className="dm-arrow">↓ ↓</div>

              <div className="dm-sf dm-box dm-box--sf">
                <h4>☁️ Salesforce Lead Object</h4>
                <ul>
                  <li>All records in one place.</li>
                  <li>Queryable together.</li>
                  <li>No siloed databases.</li>
                </ul>
              </div>

              <div className="dm-arrow">↓</div>

              <div className="dm-sf dm-box dm-box--accent">
                <h4>Event Registration</h4>
                <ul>
                  <li>first_name, email</li>
                  <li>Event_Name__c</li>
                  <li>Member_Status__c</li>
                  <li><span>lead_source: &quot;Event Registration&quot;</span></li>
                </ul>
              </div>

              <div className="dm-caption">
                Every user type &mdash; job seekers, non-members, employers, event registrants &mdash; captured in a single Lead object.
                Filter by <strong>Lead Source</strong> to segment. No custom tables required.
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}

