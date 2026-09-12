import { useEffect, useState } from 'react';
import { companies } from '../data/companies';
const isExtension = typeof chrome !== 'undefined' && !!chrome.runtime?.id;
export function App() {
  const [enabled, setEnabled] = useState(true);
  const [query, setQuery] = useState('');
  const [sector, setSector] = useState('All sectors');
  const [error, setError] = useState('');
  const [ready, setReady] = useState(!isExtension);
  useEffect(() => {
    if (!isExtension) return;
    void chrome.storage.local
      .get('enabled')
      .then((data) => {
        setEnabled(data.enabled !== false);
        setReady(true);
      })
      .catch(() =>
        setError('Could not read extension settings. Reload the extension.'),
      );
  }, []);
  async function toggle() {
    try {
      if (isExtension) await chrome.storage.local.set({ enabled: !enabled });
      setEnabled(!enabled);
      setError('');
    } catch {
      setError('Could not save the highlighting setting.');
    }
  }
  const filtered = companies.filter(
    (company) =>
      (sector === 'All sectors' || company.sector === sector) &&
      `${company.name} ${company.sector} ${company.source.publisher}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <main>
      <header>
        <div className="brand">
          <span className="brand-icon">c.</span>
          <div>
            Climate Criminals<small>CONTEXT BEFORE CHECKOUT</small>
          </div>
        </div>
        <span className="version">02</span>
      </header>
      {!isExtension && (
        <div className="demo">
          INTERACTIVE PREVIEW · EXTENSION SETTINGS ARE LOCAL
        </div>
      )}
      <section className="hero">
        <div className="eyebrow">THE CLIMATE CONTEXT LAYER</div>
        <h1>
          See the company.
          <br />
          <em>Read the evidence.</em>
        </h1>
        <p>
          Bring source-linked environmental context into your everyday browsing.
        </p>
        <div className="hero-bottom">
          <span>
            <i className={enabled ? 'dot' : 'dot paused'} />
            Highlights {enabled ? 'enabled' : 'paused'}
          </span>
          <button
            role="switch"
            aria-checked={enabled}
            aria-label="Page highlighting"
            disabled={!ready}
            onClick={() => void toggle()}
          >
            {enabled ? 'Pause' : 'Enable'}
          </button>
        </div>
      </section>
      {error && (
        <p role="alert" className="error">
          {error}
        </p>
      )}
      <section className="catalogue">
        <div className="section-heading">
          <h2>The evidence index</h2>
          <span>{companies.length} CURATED RECORDS</span>
        </div>
        <div className="filters">
          <label>
            <span className="sr-only">Search companies or sources</span>
            <input
              type="search"
              placeholder="Search companies or sources…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <label>
            <span className="sr-only">Filter by sector</span>
            <select
              value={sector}
              onChange={(event) => setSector(event.target.value)}
            >
              <option>All sectors</option>
              {companies.map((company) => (
                <option key={company.id}>{company.sector}</option>
              ))}
            </select>
          </label>
        </div>
        <p className="results" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? 'record' : 'records'} shown
        </p>
        {filtered.length ? (
          filtered.map((company, index) => (
            <article key={company.id}>
              <div className="card-top">
                <span className="number">0{index + 1}</span>
                <span className="sector">{company.sector}</span>
              </div>
              <h3>{company.name}</h3>
              <p>{company.summary}</p>
              <div className="source">
                <span>{company.source.published}</span>
                <a
                  href={company.source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {company.source.publisher} ↗
                </a>
              </div>
            </article>
          ))
        ) : (
          <div className="empty">
            <strong>No matching records.</strong>
            <p>Try a company name, publisher, or another sector.</p>
            <button
              onClick={() => {
                setQuery('');
                setSector('All sectors');
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
      <aside>
        <strong>A starting point for better questions.</strong>
        <p>
          This is a small, curated collection of historical sources. Matches are
          name-based, and may be ambiguous. Read the linked evidence and its
          date before drawing conclusions.
        </p>
      </aside>
      <footer>
        <span>ON-DEVICE MATCHING</span>
        <span>No page text leaves your browser.</span>
      </footer>
    </main>
  );
}
