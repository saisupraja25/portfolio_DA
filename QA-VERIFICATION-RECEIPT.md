# QA Verification Receipt

**Run:** 2026-08-09T02:35:30+00:00  
**Artifact:** Sai Supraja Ravi Kumar portfolio  
**Source ZIP SHA-256:** `e8837591d5c92b49f19b2383cde788bddf4bf8e870d3b56fb79fd76a31dfb49c`

## Completed

- Rebuilt `index.html`, `style.css`, and `script.js` as a responsive, modular static portfolio.
- Preserved the supplied portrait and résumé PDF unchanged.
- Integrated the user-confirmed full name, email, public phone, LinkedIn, GitHub, location, four animated role titles, and four résumé-grounded specialist-value headlines.
- Added semantic SVG icons for email, phone, LinkedIn, GitHub, location, navigation, theme, résumé, and link actions without a FontAwesome dependency.
- Added a persistent dark/light theme, responsive navigation, active-section state, scroll progress, reduced-motion support, and progressive role/reveal effects.
- Reconciled résumé content into the experience, skills, education, certification, and impact sections.
- Removed four unsupported case-study cards rather than presenting them as completed work.
- Featured two public-source-backed projects and added explicitly labeled abstract illustrations.
- Added metadata, canonical URL, Open Graph data, JSON-LD, favicon, skip link, focus states, and safe external-link attributes.

## Source and link evidence

- GitHub profile: HTTP 200
- Strategic Merger Operations Dashboard repository: HTTP 200
- GenAI HR Analytics repository: HTTP 200
- Existing GitHub Pages URL: HTTP 200
- Google Fonts stylesheet: HTTP 200
- LinkedIn: exact user-supplied URL integrated after HTTPS normalization. Automated curl returned LinkedIn status 999, which is consistent with command-line bot blocking and is not reported as human-browser verification.
- Certification verification URLs/IDs were not supplied; no credential links were invented.

## Static validation

- `node --check script.js`: pass
- `html-validate index.html`: pass with zero findings after DOCTYPE, entity encoding, and telephone wrapping corrections
- Local asset audit: pass
- Duplicate ID audit: pass
- Internal fragment audit: pass
- Heading-order audit: pass; one H1 with H2/H3 hierarchy and no skipped levels
- New-tab safety audit: pass; no `_blank` link missing `noopener noreferrer`
- SVG XML parsing: pass for all three SVG assets
- JSON-LD parsing: pass
- QA JSON parsing: pass

## Browser matrix

Executed in headless Chromium against a real local HTTP server:

| Viewport | Horizontal overflow | Broken images | Content visible | Console errors |
|---|---:|---:|---:|---:|
| 1920 × 1080 | 0 px | 0 | Yes | 0 |
| 1440 × 900 | 0 px | 0 | Yes | 0 |
| 768 × 1024 | 0 px | 0 | Yes | 0 |
| 390 × 844 | 0 px | 0 | Yes | 0 |

Additional browser journeys passed:

- Theme toggles and persists after reload.
- All four specialist headlines rotate, settle cleanly, and retain an identical measured container height at wide, desktop, and mobile viewports.
- Mobile/tablet menu opens, becomes visible, locks background scrolling, moves focus to the first navigation link, and closes with Escape.
- Reduced-motion emulation leaves all content visible, keeps the original specialist headline static, and suppresses decorative motion.
- Profile and both project visuals load with non-zero intrinsic dimensions.
- Résumé, social, project, phone, and internal navigation destinations are present and correctly formatted.
- Project visual framing was verified after changing from cropping to full-image containment.

Detailed output: `QA-BROWSER-RESULTS.json`.

## Accessibility evidence

Axe Core 4.10.3 was run against settled light and dark themes using WCAG 2 A/AA, WCAG 2.1 AA, and WCAG 2.2 AA rule tags:

- Light theme: 0 automated violations; 28 passed rules
- Dark theme: 0 automated violations; 28 passed rules
- 46 gradient/composited-background contrast nodes remained marked for manual review in each theme because Axe could not calculate them conclusively.
- Manual visual inspection was performed at wide, desktop, and mobile sizes.

This is evidence of bounded testing, not a claim of complete WCAG conformance or assistive-technology certification. Detailed output: `QA-ACCESSIBILITY-RESULTS.json`.

## Not performed

- No GitHub commit, push, Pages configuration, or production deployment was performed.
- No employer, degree, certification, or metric was independently verified beyond the supplied résumé and public project repositories.
- No live LinkedIn session was used.
- No real screen-reader session was performed.

## Acceptance boundary

The package is ready for static hosting or GitHub Pages deployment. Production acceptance still requires publishing to the intended repository and testing the final public URL in human desktop/mobile browsers.
