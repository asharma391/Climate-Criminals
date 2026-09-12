import { matchCompanies } from '../core/matcher';
import type { Company } from '../data/companies';
export const marker = 'data-climate-context';
const excluded = `script,style,noscript,textarea,input,select,option,button,a,code,pre,svg,math,[contenteditable]:not([contenteditable="false"]),[role="textbox"],[${marker}],[data-climate-panel]`;
export function highlight(
  root: Node,
  onSelect: (company: Company, anchor: HTMLElement) => void,
  limit = 250,
): number {
  if (root instanceof Element && root.closest(excluded)) return 0;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      return node.textContent?.trim() && !node.parentElement?.closest(excluded)
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_REJECT;
    },
  });
  const nodes: Text[] = [];
  if (
    root.nodeType === Node.TEXT_NODE &&
    !root.parentElement?.closest(excluded)
  )
    nodes.push(root as Text);
  else {
    let node;
    while ((node = walker.nextNode())) nodes.push(node as Text);
  }
  let count = 0;
  for (const node of nodes) {
    if (count >= limit) break;
    const text = node.textContent ?? '';
    const matches = matchCompanies(text).slice(0, limit - count);
    if (!matches.length) continue;
    const fragment = document.createDocumentFragment();
    let cursor = 0;
    for (const match of matches) {
      fragment.append(document.createTextNode(text.slice(cursor, match.start)));
      const button = document.createElement('button');
      button.type = 'button';
      button.setAttribute(marker, match.company.id);
      button.textContent = text.slice(match.start, match.end);
      button.setAttribute(
        'aria-label',
        `${button.textContent}: open climate source`,
      );
      button.style.cssText =
        'display:inline!important;padding:0 2px!important;margin:0!important;border:0!important;border-bottom:2px solid #ad673a!important;border-radius:2px!important;background:#f8dfb4!important;color:#432f20!important;font:inherit!important;line-height:inherit!important;cursor:pointer!important;';
      button.addEventListener('click', (event) => {
        event.preventDefault();
        onSelect(match.company, button);
      });
      fragment.append(button);
      cursor = match.end;
      count++;
    }
    fragment.append(document.createTextNode(text.slice(cursor)));
    node.replaceWith(fragment);
  }
  return count;
}
export function clearHighlights() {
  document.querySelectorAll(`[${marker}]`).forEach((element) => {
    const parent = element.parentNode;
    element.replaceWith(document.createTextNode(element.textContent ?? ''));
    parent?.normalize();
  });
}
