# Architecture

## Data flow

1. `src/data/companies.ts` defines the catalogue and source provenance.
2. `src/core/matcher.ts` compiles escaped aliases in descending length order. Unicode-aware boundaries avoid matches embedded in larger words. Returned spans refer to the original text.
3. `src/content/highlight.ts` walks eligible text nodes and replaces only matched spans with native buttons. It never writes page text through `innerHTML`.
4. `src/content/panel.ts` creates a labeled, non-modal source dialog in an isolated Shadow DOM. The close button receives focus; Escape closes the card and returns focus to its originating highlight.
5. `src/content/index.ts` manages preference changes and debounced DOM updates. The observer is disconnected during extension mutations to avoid reacting to its own highlights.
6. `src/popup/App.tsx` renders the searchable React catalogue and persists the enabled preference.

## DOM constraints

Links, buttons, form controls, editable text, code blocks, scripts, styles, SVG, and existing highlights are excluded. This avoids overriding common interaction semantics. Matching does not cross element boundaries and does not traverse page Shadow DOM or nested frames.

The observer batches added and changed text for 150 ms. Each page is capped at 250 highlights. Disabling highlighting disconnects the observer, removes the card, restores plain text, and normalizes adjacent text nodes. Re-enabling scans the current document.

This is an explicit alias matcher, not a trained model. Whole-word matching reduces substring errors; it cannot resolve contextual ambiguity such as the fruit “apple.” The card makes that limitation visible. Broad “Siemens” matching was narrowed to “Siemens Energy” to align with the referenced source.

## Packaging

Vite builds the React popup; esbuild produces one self-contained content-script IIFE. React is not injected into visited pages. The extension ships its full catalogue and executes no remotely hosted code.

Tests cover alias precedence, Unicode boundaries, regex escaping, data provenance, protected DOM elements, idempotency, callback activation, dynamic text nodes, highlight limits, and cleanup.

## Design decisions

- **Bundled catalogue:** transparent review and offline matching; updates require a new extension build.
- **Local settings:** one preference, no server or database to operate.
- **Shadow DOM card:** isolates evidence styling from the page while preserving a lightweight content script.
- **Native buttons:** keyboard activation and accessible names without rebuilding controls from spans.
- **No orchestration layer:** the browser is the runtime; a backend or Kubernetes cluster would add infrastructure without improving this workflow.
