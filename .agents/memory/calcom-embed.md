---
name: Cal.com embed loader
description: The inline Cal.com embed must use the vendor's queued namespace bootstrap exactly.
---

Use Cal.com's documented loader pattern when embedding inline calendars in React. Define the queued `window.Cal` stub once, initialize a namespace per event slug, and queue `inline` and `ui` calls through that namespace. Loading the vendor script separately behind a partial stub can surface an uncaught non-Error runtime exception in the preview.

**Why:** The embed script expects the loader's `loaded`, `ns`, and queue behavior to exist before it is appended.

**How to apply:** Keep the loader shared across package tabs and guard missing namespaces so an invalid event slug falls back to the external booking link instead of crashing the page.