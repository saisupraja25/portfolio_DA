# Sai Supraja Ravi Kumar — Portfolio

A deployment-ready static portfolio for Business Intelligence, Data Analyst, Power BI Analyst, and BI Developer opportunities.

## Strategy applied

- Preserved the supplied résumé and professional portrait as authoritative source assets.
- Retained the original dark analytics direction while refining it into a polished midnight-slate, teal, and blue system with an accessible light theme.
- Replaced unsupported portfolio-case-study claims with two projects backed by public GitHub repositories.
- Added abstract analytics illustrations. Each is explicitly labeled as a designed illustration, not a project screenshot.
- Integrated the supplied email, phone, LinkedIn, GitHub, location, experience, achievements, skills, education, and certifications.
- Added four rotating specialist-value headlines with measured height locking, plus a four-role typing/erasing effect and assistive-technology-safe static alternatives.

## Deployable files

- `index.html` — semantic portfolio structure, metadata, inline SVG icon sprite, and JSON-LD person data
- `style.css` — responsive dark/light design system
- `script.js` — theme persistence, mobile menu, scroll progress, active navigation, reveal enhancement, specialist-headline and role animation, responsive height measurement, and reduced-motion fallback
- `sai-supraja-profile.png` — supplied portrait
- `Sai-Supraja-Resume.pdf` — supplied résumé
- `assets/strategic-merger-visual.svg` — abstract project illustration
- `assets/genai-hr-visual.svg` — abstract project illustration
- `assets/favicon.svg` — portfolio favicon

## Local preview

From this folder, run:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

Opening `index.html` directly may work, but an HTTP server is recommended because it matches deployed browser behavior more closely.

## GitHub Pages deployment

1. Back up the current repository or create a branch.
2. Copy the deployable files listed above into the GitHub Pages repository root.
3. Preserve the exact relative filenames unless the references in `index.html` are updated too.
4. Commit and push the files.
5. In the repository, open **Settings → Pages**.
6. Confirm Pages publishes from the intended branch and root folder.
7. Verify the published URL in an incognito window on desktop and mobile.
8. Test the résumé, email, phone, LinkedIn, GitHub, and both project-repository links.

This package has **not** been pushed or deployed automatically.

## External dependency

The site loads DM Sans and Manrope from Google Fonts. System-font fallbacks are declared if Google Fonts is blocked or unavailable.

## Verification notes

- GitHub profile and both project URLs returned HTTP 200 during verification.
- The supplied LinkedIn URL was integrated exactly after HTTPS normalization. LinkedIn returned status 999 to the automated command-line request, which is LinkedIn’s bot-blocking behavior; it was not treated as proof that the human-facing profile is unavailable.
- Certification URLs and credential IDs were not supplied, so the site labels both credentials as “listed on résumé” without inventing verification links.
- See `QA-VERIFICATION-RECEIPT.md`, `QA-BROWSER-RESULTS.json`, and `QA-ACCESSIBILITY-RESULTS.json` for evidence and boundaries.
