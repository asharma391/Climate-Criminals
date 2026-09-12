import type { Company } from '../data/companies';
let closeCurrent: (() => void) | undefined;
export function closePanel() {
  closeCurrent?.();
}
export function showPanel(company: Company, anchor: HTMLElement) {
  closePanel();
  const host = document.createElement('div');
  host.setAttribute('data-climate-panel', '');
  host.style.cssText =
    'position:fixed!important;right:16px!important;bottom:16px!important;width:min(360px,calc(100vw - 32px))!important;z-index:2147483647!important;';
  const shadow = host.attachShadow({ mode: 'closed' });
  const style = document.createElement('style');
  style.textContent =
    ':host{all:initial}section{font:14px/1.6 system-ui,sans-serif;color:#2e2a24;background:#fffdf8;padding:24px;border:1px solid #c8bba7;border-radius:16px;box-shadow:0 12px 48px #0003}small{font-size:10px;letter-spacing:.12em;color:#7a573a}h2{font-size:25px;line-height:1.1;margin:12px 0}p{margin:12px 0}a{color:#775024;font-weight:700}button{float:right;border:0;border-radius:5px;padding:4px 9px;cursor:pointer;background:#eee7db;color:#2e2a24}button:focus-visible,a:focus-visible{outline:3px solid #ad673a}footer{font-size:11px;color:#655e53;margin-top:16px}';
  const section = document.createElement('section');
  section.setAttribute('role', 'dialog');
  section.setAttribute('aria-label', `Climate context: ${company.name}`);
  const close = document.createElement('button');
  close.textContent = 'Close';
  const eyebrow = document.createElement('small');
  eyebrow.textContent = 'CLIMATE CRIMINALS / SOURCE CONTEXT';
  const title = document.createElement('h2');
  title.textContent = company.name;
  const text = document.createElement('p');
  text.textContent = company.summary;
  const link = document.createElement('a');
  link.href = company.source.url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = `Read ${company.source.publisher} ↗`;
  const footer = document.createElement('footer');
  footer.textContent = `${company.source.published} · Curated historical source. A name match is not identity verification or a current sustainability rating.`;
  section.append(close, eyebrow, title, text, link, footer);
  shadow.append(style, section);
  document.documentElement.append(host);
  function dismiss() {
    host.remove();
    document.removeEventListener('keydown', onKey);
    closeCurrent = undefined;
    if (anchor.isConnected) anchor.focus();
  }
  function onKey(event: KeyboardEvent) {
    if (event.key === 'Escape') dismiss();
  }
  close.addEventListener('click', dismiss);
  document.addEventListener('keydown', onKey);
  closeCurrent = dismiss;
  close.focus();
}
