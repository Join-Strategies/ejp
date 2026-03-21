// EJP Salesforce form submission utilities (Next.js port of ejp-forms.js)

const SF_ENDPOINT = 'https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8';
export const SF_ORG_ID = '00DdL00000rNMCb';
export const SITE_BASE_URL = 'https://toolnyc.github.io/ejp';

export const SF_FIELDS = {
  memberStatus:       '00NdL00002447vf',
  careerSupportNeeds: '00NdL0000248phx',
  roleTypesNeeded:    '00NdL0000248tAT',
  openPositionsCount: '00NdL0000248vAf',
  eventName:          '00NdL0000248x2n',
  ejpSourcePage:      '00NdL0000248yOf',
};

export interface SessionData {
  firstName?: string;
  lastName?: string;
  email?: string;
  memberStatus?: string;
  timestamp?: number;
}

interface SubmitOptions {
  submissionType?: string;
  sourcePage?: string;
  onSuccess?: (formData: Record<string, string>) => void;
}

function setHidden(formEl: HTMLFormElement, name: string, value: string) {
  let el = formEl.querySelector<HTMLInputElement>(`[name="${name}"]`);
  if (!el) {
    el = document.createElement('input');
    el.type = 'hidden';
    el.name = name;
    formEl.appendChild(el);
  }
  el.value = value;
}

function logSubmission(
  formData: Record<string, string>,
  options: SubmitOptions,
  submissionId: string
) {
  try {
    const submissions: unknown[] = JSON.parse(
      localStorage.getItem('ejp_submissions') || '[]'
    );
    submissions.unshift({
      id:           submissionId,
      timestamp:    new Date().toISOString(),
      name:         `${formData.first_name || ''} ${formData.last_name || ''}`.trim(),
      email:        formData.email || '',
      type:         options.submissionType || 'unknown',
      sourcePage:   options.sourcePage || formData[SF_FIELDS.ejpSourcePage] || '',
      memberStatus: formData[SF_FIELDS.memberStatus] || '',
      notes:        formData.description || '',
    });
    localStorage.setItem('ejp_submissions', JSON.stringify(submissions.slice(0, 50)));
  } catch (_) {}
}

export function submitToSalesforce(formEl: HTMLFormElement, options: SubmitOptions = {}) {
  const submissionId = `sf-${Date.now()}`;

  setHidden(formEl, 'oid', SF_ORG_ID);
  setHidden(formEl, 'retURL', `${SITE_BASE_URL}/thank-you.html`);
  if (options.sourcePage) setHidden(formEl, SF_FIELDS.ejpSourcePage, options.sourcePage);

  const finalFormData: Record<string, string> = {};
  new FormData(formEl).forEach((val, key) => { finalFormData[key] = val as string; });

  const iframeId = 'sf-submit-iframe';
  let iframe = document.getElementById(iframeId) as HTMLIFrameElement | null;
  if (!iframe) {
    iframe = document.createElement('iframe');
    iframe.id   = iframeId;
    iframe.name = iframeId;
    iframe.style.cssText = 'display:none;width:0;height:0;border:0;position:absolute;';
    document.body.appendChild(iframe);
  }

  let successCalled = false;
  const callSuccess = () => {
    if (successCalled) return;
    successCalled = true;
    logSubmission(finalFormData, options, submissionId);
    options.onSuccess?.(finalFormData);
  };

  const timer = setTimeout(callSuccess, 15000);

  const iframeEl = iframe;
  iframeEl.onload = () => {
    clearTimeout(timer);
    iframeEl.onload = null;
    iframeEl.onerror = null;
    callSuccess();
  };
  iframeEl.onerror = () => {
    clearTimeout(timer);
    iframeEl.onload = null;
    iframeEl.onerror = null;
    callSuccess();
  };

  const prev = { action: formEl.action, method: formEl.method, target: formEl.target };
  formEl.action = SF_ENDPOINT;
  formEl.method = 'POST';
  formEl.target = iframeId;
  formEl.submit();
  formEl.action = prev.action;
  formEl.method = prev.method;
  formEl.target = prev.target;
}

export function saveSession(data: SessionData) {
  try {
    localStorage.setItem('ejp_session', JSON.stringify({
      firstName:    data.firstName    || '',
      lastName:     data.lastName     || '',
      email:        data.email        || '',
      memberStatus: data.memberStatus || '',
      timestamp:    Date.now(),
    }));
  } catch (_) {}
}

export function getSession(): SessionData | null {
  try {
    const raw = localStorage.getItem('ejp_session');
    if (!raw) return null;
    const session: SessionData = JSON.parse(raw);
    const age = Date.now() - (session.timestamp || 0);
    if (age > 30 * 24 * 60 * 60 * 1000) {
      localStorage.removeItem('ejp_session');
      return null;
    }
    return session;
  } catch (_) {
    return null;
  }
}
