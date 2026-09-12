# Privacy and permissions

The extension reads eligible text nodes on HTTP(S) pages to match bundled company aliases. Matching happens entirely on-device. Page text, company mentions, search queries, and browsing history are not stored or uploaded.

The `storage` permission saves only the highlighting-enabled preference. Content-script URL matches allow automatic annotation across normal HTTP(S) pages. Use Chrome’s site-access controls to restrict access, or pause highlighting from the popup. The extension does not run on Chrome’s internal pages or the extension store.

Opening a source link navigates to its publisher in a new tab using `noopener noreferrer`. The publisher then receives an ordinary page request. There is no extension backend, account, analytics, remote model call, or external catalogue fetch.

Pause restores the text altered by the extension on already-initialized tabs. A tab opened before installation or a freshly reloaded extension may need a page refresh before its content script is active.
