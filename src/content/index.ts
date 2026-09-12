import { clearHighlights, highlight, marker } from './highlight';
import { closePanel, showPanel } from './panel';
let enabled = true;
let count = 0;
let timer: ReturnType<typeof setTimeout> | undefined;
const pending = new Set<Node>();
const observer = new MutationObserver((records) => {
  for (const record of records) {
    if (record.type === 'characterData') pending.add(record.target);
    record.addedNodes.forEach((node) => {
      if (node instanceof Element || node instanceof Text) pending.add(node);
    });
  }
  if (pending.size && !timer) timer = setTimeout(flush, 150);
});
function observe() {
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
  });
}
function flush() {
  timer = undefined;
  if (!enabled) {
    pending.clear();
    return;
  }
  observer.disconnect();
  count = document.querySelectorAll(`[${marker}]`).length;
  for (const node of pending) {
    if (count >= 250) break;
    if (node.isConnected) count += highlight(node, showPanel, 250 - count);
  }
  pending.clear();
  observe();
}
function setEnabled(next: boolean) {
  enabled = next;
  observer.disconnect();
  clearTimeout(timer);
  timer = undefined;
  pending.clear();
  if (!enabled) {
    closePanel();
    clearHighlights();
    count = 0;
    return;
  }
  count = document.querySelectorAll(`[${marker}]`).length;
  count += highlight(document.body, showPanel, Math.max(0, 250 - count));
  observe();
}
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes.enabled)
    setEnabled(changes.enabled.newValue !== false);
});
void chrome.storage.local
  .get('enabled')
  .then((result) => setEnabled(result.enabled !== false))
  .catch(() => setEnabled(false));
