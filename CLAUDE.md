# CLAUDE.md — EJP

## What This Is

Static HTML/CSS wireframe for the EJP (Employment & Job Placement) platform, a unified
healthcare career platform for 1199SEIU Training & Employment Fund. Consolidates 3 sites:
Employment Center (1199careers.org), TEF Employment Page, Career Pathways Training (CPT).

Design/dev: Late Bloomer Studio (Pete Wallace)

## Notes & Docs — Obsidian I/O

Project markdown lives in the Obsidian Clients vault. Do **not** commit meeting notes,
prep docs, SOWs, or briefs to this repo — save them to Obsidian instead.

**Vault root:** `/Users/pete/Dropbox/Notes/Obsidian/Clients`
**Client folder:** `Join/1199/`

```bash
# Create a new note
cd "/Users/pete/Dropbox/Notes/Obsidian/Clients" && obsidian create path="Join/1199/<filename>.md" content="<content>"

# Append to an existing note
cd "/Users/pete/Dropbox/Notes/Obsidian/Clients" && obsidian append path="Join/1199/<filename>.md" content="<content>"

# Read a note
cd "/Users/pete/Dropbox/Notes/Obsidian/Clients" && obsidian read path="Join/1199/<filename>.md"

# List all 1199 notes
cd "/Users/pete/Dropbox/Notes/Obsidian/Clients" && obsidian files folder="Join/1199"
```

Note naming conventions:
- Meetings: `Meeting-YYYY-MM-DD Title.md`
- Prep: `Prep-YYYY-MM-DD Title.md`
- Briefs: `Brief — Title.md`
- SOWs: `SOW — Title.md`

The "installer out of date" stderr warning from the obsidian CLI is harmless.

## Tech Stack

Static HTML/CSS (wireframe phase). No build step. Roboto font. CSS custom properties for design tokens.

## Key Files

- `wireframe.html` — full interactive wireframe with design tokens and responsive layout

All project docs (brand guidelines, sitemap, SOWs, meeting notes, pitch prep, issue list) live in Obsidian at `Join/1199/` — see Notes & Docs above.

## Salesforce Integration

See memory/salesforce-config.md for all org IDs, field IDs, and endpoint URLs.
Stream A complete (2026-03-18): SF_ORG_ID=00DdL00000rNMCb, GitHub Pages=toolnyc.github.io/ejp
