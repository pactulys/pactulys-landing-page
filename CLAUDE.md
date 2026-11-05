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

- `index.html`: the whole landing page, with HTML, CSS, JS, logo, favicon and illustrations all inline. There are no image or asset files.
- `mentions-legales.html`: legal and privacy page, with its own small `<style>` block. It does not share CSS with `index.html`, and it has no theme toggle or theme script.

## Things that span several places

- **Theme tokens:** the dark palette is written twice in `index.html`, under `@media (prefers-color-scheme: dark)` and under `:root[data-theme="dark"]`. Change both. `mentions-legales.html` repeats a subset of the tokens, and the background colours are also hardcoded in the `theme-color` metas of both files and in the toggle script.
- **Theme choice:** an inline script in `<head>` applies the `pactulys-theme` value from `localStorage` before first paint. The toggle at the bottom of `<body>` writes the same key.
- **Animations:** hidden initial states are scoped to the `.js` class on `<html>` and to `prefers-reduced-motion`, so content stays visible without JS or with reduced motion. New animated elements should follow the same pattern. The hero story is CSS-animated inline SVG; a script pauses it through `.is-paused` when it is off-screen or the visitor pauses it.
- **Waitlist link:** the CTA points to the Tally form `https://tally.so/r/jadW1a` in two places in `index.html`. The form is linked, not embedded.
- **Contact address:** `giovidoh@gmail.com` appears in both HTML files and the README. It is meant to be replaced once a Pactulys domain address exists.

## Copy and legal constraints

- `mentions-legales.html` states that the site sets no cookies and uses no analytics, and that the only third parties are Google Fonts and Tally. Adding any tracker, embed or external resource makes that false, so update the page in the same change.
- The commitments on the landing page ("Nos engagements", "Ce que Pactulys ne fait pas", FAQ) are promises to future customers, written before the product exists. Do not reword or strengthen them as a copy-editing side effect: they repeat across sections and must stay consistent.
- `mentions-legales.html` has `<span class="todo">À COMPLÉTER : …</span>` placeholders for information only the owner can supply (legal name, address, dates, retention period). Never invent these values.
