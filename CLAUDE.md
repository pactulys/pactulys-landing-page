# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Static landing page and waitlist funnel for Pactulys, an upcoming Windows app that locks a porn blocker for a chosen duration. The product does not exist yet: this repo is only the marketing site. All visitor-facing copy is in French and addresses the reader as "vous".

## Commands

There is no build, package manager, linter or test suite. Open `index.html` in a browser, or serve the folder with any static server, to check a change.

## Deployment

GitHub Pages publishes the root of `main` to https://pactulys.icg-reborns.com (the domain comes from `CNAME`), using the legacy Jekyll build. Pushing to `main` is what ships a change, so a local commit is not live until pushed.

Every committed file not excluded by Jekyll is publicly reachable: `/README.md` returns 200 on the live site. Keep this in mind for internal notes, including this file and `tasks/`.

## Structure

The site is bilingual, and French and English have equal standing. Each language has its own static HTML pages, with no JS translation layer and no build step, so any change to text or markup must be made in both.

| | French | English |
|---|---|---|
| Home | `index.html` | `en/index.html` |
| Legal and privacy | `mentions-legales.html` | `en/legal-notice.html` |

- `assets/site.css` and `assets/site.js`: shared by both home pages. Interface strings set by JS live in the `ui` object at the top of `site.js`.
- `assets/legal.css`: shared by both legal pages. They also load `site.js` for the language switcher, but have no theme toggle or theme script.
- The logo, favicon and illustrations are inline in the HTML, so they are duplicated in each home page. There are no image files.

## Things that span several places

- **Language routing:** an inline script in the `<head>` of `index.html` only sends visitors to `/en/` when `pactulys-lang` in `localStorage` is `en`, or when nothing is stored and the browser language is not French. Crawlers are skipped so `/` stays indexable in French. The switcher writes that key on click, and each page lists its counterpart in `hreflang` links, so new pages need both.
- **Theme tokens:** the dark palette is written twice in `assets/site.css`, under `@media (prefers-color-scheme: dark)` and under `:root[data-theme="dark"]`. Change both. `assets/legal.css` repeats a subset of the tokens, and the background colours are also hardcoded in the `theme-color` metas of all four pages and in the toggle script.
- **Theme choice:** an inline script in `<head>` applies the `pactulys-theme` value from `localStorage` before first paint. The toggle at the bottom of `<body>` writes the same key.
- **Animations:** hidden initial states are scoped to the `.js` class on `<html>` and to `prefers-reduced-motion`, so content stays visible without JS or with reduced motion. New animated elements should follow the same pattern. The hero story is CSS-animated inline SVG; a script pauses it through `.is-paused` when it is off-screen or the visitor pauses it.
- **Waitlist links:** each language has its own Tally form, linked rather than embedded, in two places per home page: `https://tally.so/r/jadW1a` in `index.html` and `https://tally.so/r/ArKvke` in `en/index.html`.
- **Contact address:** `giovidoh@gmail.com` appears in all four HTML pages and the README. It is meant to be replaced once a Pactulys domain address exists.

## Copy and legal constraints

- The legal pages state that the site sets no cookies and uses no analytics, and that the only third parties are Google Fonts and Tally. Adding any tracker, embed or external resource makes that false, so update both pages in the same change.
- The commitments on the landing page ("Nos engagements", "Ce que Pactulys ne fait pas", FAQ) are promises to future customers, written before the product exists. Do not reword or strengthen them as a copy-editing side effect: they repeat across sections and must stay consistent, with the same scope in both languages.
- The legal pages list the publisher and publication director as anonymous and give no postal address, at the owner's request. Never add or invent identity details.
