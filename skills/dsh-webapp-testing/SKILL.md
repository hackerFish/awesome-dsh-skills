---
name: dsh-webapp-testing
description: Verify a local web application's rendered browser behavior with console, network, server, and focused regression-test evidence.
whenToUse: Use when a task requires browser interaction, visual inspection, or end-to-end validation beyond source or unit-test checks.
metadata: dsh-portable-skill-pack
---

# DSH Web App Testing

1. Confirm the project path, start command, target URL, fixture or test account, and whether browser automation is enabled.
2. Inspect the affected route, UI, API boundary, and existing tests before choosing commands.
3. Prefer the project's existing browser framework. Otherwise require an enabled Playwright, CDP, or equivalent browser plugin.
4. Start the app with its documented command. Reuse a running server only after confirming its URL and code state.
5. Record initial browser state: viewport, URL, visible controls, console failures, failed requests, and relevant server logs.
6. Perform the smallest realistic user flow. Prefer accessible roles, labels, and stable selectors over fragile DOM paths.
7. Verify both the rendered result and a relevant backing effect: navigation, request, response, persistence, or error state.
8. Exercise one meaningful negative or boundary case for validation, permissions, loading, retry, or errors.
9. Add the narrowest compatible regression test when the project already has a suitable test suite.
10. Do not treat source inspection, shell output, or an HTTP status as proof of rendered browser behavior.
11. If automation or authentication is unavailable, state exactly which UI behavior remains unverified; never request or expose production secrets.
12. Report setup, actions, expected and actual results, failures, test command, and screenshot path only when visual evidence matters.
