// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { clearHighlights, highlight, marker } from '../src/content/highlight';
beforeEach(() => {
  document.body.replaceChildren();
});
describe('DOM highlighter', () => {
  it('preserves text and only modifies eligible text nodes', () => {
    document.body.innerHTML =
      '<p>Apple and Saudi Aramco</p><a href="#">Apple</a><script>Apple</script><textarea>Apple</textarea><div contenteditable="">Apple</div><pre>Apple</pre>';
    const before = document.body.textContent;
    expect(highlight(document.body, vi.fn())).toBe(2);
    expect(document.body.textContent).toBe(before);
    expect(document.querySelector('a button')).toBeNull();
    expect(document.querySelector('[contenteditable] button')).toBeNull();
  });
  it('is idempotent, keyboard accessible, and reversible', () => {
    document.body.innerHTML = '<p>Apple</p>';
    const select = vi.fn();
    highlight(document.body, select);
    highlight(document.body, select);
    const buttons = document.querySelectorAll<HTMLButtonElement>(`[${marker}]`);
    expect(buttons).toHaveLength(1);
    expect(buttons[0].tagName).toBe('BUTTON');
    buttons[0].click();
    expect(select).toHaveBeenCalledTimes(1);
    clearHighlights();
    expect(document.body.innerHTML).toBe('<p>Apple</p>');
  });
  it('supports inserted text roots and bounds mutation volume', () => {
    const text = document.createTextNode('Apple Aramco Siemens Energy');
    document.body.append(text);
    expect(highlight(text, vi.fn(), 2)).toBe(2);
    expect(document.querySelectorAll(`[${marker}]`)).toHaveLength(2);
  });
});
