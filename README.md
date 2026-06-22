# Saad Ahmed — Academic Portfolio

Personal academic portfolio website for **Saad Ahmed**, Lecturer at the Department of CSE, Bangladesh Army University of Science and Technology (BAUST).

🌐 **Live site:** [saadbaust.github.io](https://saadbaust.github.io/)
🛠 **Edit content (CMS):** [app.pagescms.org/saadbaust/saadbaust.github.io](https://app.pagescms.org/saadbaust/saadbaust.github.io)

This site is **content-managed**. You almost never need to touch code — you log into Pages CMS, edit in a form, hit **Save**, and the live site updates within a minute.

---

## How the Site Is Built

There is **no separate CSS or JS file and no build step.** Each page is a single self-contained HTML file:

- **Styling** comes from **Tailwind CSS loaded via CDN.** A small `tailwind.config` (brand colors, dark mode, fonts) and a short `<style>` block (scrollbars, timeline rail, active-link states) are inlined in the `<head>` of each HTML file.
- **Page logic** (rendering helpers, BibTeX parsing, filters, theme toggle, gallery lightbox) is inlined in a `<script>` at the bottom of each HTML file.

So to deploy, you just host the files as-is on GitHub Pages — nothing to compile.

---

## Files in This Project

| File | What it does |
|---|---|
| `index.html` | Main portfolio page (home). Reads `data.json` and `publications.bib` in the browser and renders every section (profile, experience, publications, education, skills, teaching, certifications), plus per-publication structured data, at load time. Tailwind config, styles, and all rendering helpers are **inlined in the page** — no separate CSS/JS files. |
| `gallery.html` | Photo gallery page — **hidden from search engines**. Lists whatever is in `images/events/` and `images/memories/`, primarily from `images/gallery-manifest.json`, falling back to the GitHub API if that file is missing. Self-contained, with its own inlined styles and script. |
| `data.json` | **All editable home-page content** — profile, intro, stats, CV link, experience, education, skills, certifications, research projects, teaching, phone, email, and per-section visibility toggles. Managed via the CMS "Basic Info" screen. |
| `publications.bib` | All publications in BibTeX. The site reads this directly, builds the papers list, and generates per-paper structured data from it. Managed via the CMS "Publications" screen. |
| `.pages.yml` | Pages CMS configuration — decides what you can edit in the admin panel. |
| `sitemap.xml` | Tells search engines to index the home page (and its key images) only. |
| `robots.txt` | Blocks search engines from crawling the gallery and its images; explicitly leaves `data.json`/`publications.bib` crawlable so Google can render and index the dynamic content. |
| `images/gallery-manifest.json` | Auto-generated list of gallery image paths, kept in sync by a GitHub Action. Not edited by hand. |
| `.github/workflows/gallery-manifest.yml` | GitHub Action that regenerates the gallery manifest whenever `images/events/` or `images/memories/` changes. |
| `.github/scripts/generate-gallery-manifest.js` | The script that the Action runs. |
| `.gitattributes` | Git line-ending normalization. Leave as is. |
| `images/` | Your photos, profile picture (`saadahmed.png`), and the two hero charts. |

> **Favicon.** The site uses an inline SVG data URI (`SA` initials in a blue rounded box) embedded directly in each page's `<head>`, so **no favicon image file is needed.** The old `s-logo.png` is no longer referenced anywhere — you can delete it if it's still in `images/`.

> **No `style.css` / `data.js`.** Earlier versions of this project had a separate stylesheet and a `data.js` file. Both are gone: styling is now Tailwind-via-CDN (inlined config), and the content lives in `data.json` so it can be edited through the CMS with proper forms. If you have either leftover file, delete it.

> **Hero chart images.** The two charts near the top of the home page load from `images/Research Interest Distribution.png` and `images/Citation History.png` (the original filenames, spaces included). If you ever replace them, keep those exact names — or, if you rename them to remove the spaces, update the `src` in `index.html` and the matching `image:loc` URLs in `sitemap.xml` and the JSON-LD to match.

---

## Editing Your Site Through the CMS

Go to **[app.pagescms.org/saadbaust/saadbaust.github.io](https://app.pagescms.org/saadbaust/saadbaust.github.io)** and sign in. You'll see three areas in the left sidebar.

### 1. Basic Info
A single screen (`data.json`) with grouped sections:

- **Profile & Intro** — name, title line, institution, the badge under your photo, research-focus line, the "About me" paragraph, and your CV link.
- **Google Scholar Stats** — citations, h-index, i10-index. (Your **Papers** count is calculated automatically from your publications, so there's nothing to type for it.)
- **Contact** — phone number and email address. (The home page wires both the Contact section **and** the hero "Email Me" button to whatever email you set here.)
- **Experience** — add, remove, or reorder positions with the **+** / drag controls.
- **Education** — same, for degrees.
- **Technical Skills** — two lists (Research & AI, Development & Tools). Add a skill with **+**.
- **Certifications & Activities** — one item per entry.
- **Research Projects** — add/remove/reorder projects (title, period/status, funding info, description, optional link). Leaving it empty hides the section automatically. Projects display in the same numbered list style as publications.
- **Teaching** — add/remove/reorder courses, shown as a table with Course Code, Course Title, and Semester. Leaving it empty hides the section automatically.
- **Section Visibility** — a switch for each home-page section (About, Hero charts, Experience, Research Projects, Journal Articles, Conference Proceedings, Teaching, Education, Skills, Certifications, Contact). Turn one off to hide that section from the live site; your content stays saved, it's just hidden, and the matching sidebar link disappears too.

Edit anything, click **Save**, done.

> **Profile/chart photos.** Upload or replace these under **Media → Site Images** (see below). To avoid duplicate files piling up in `images/`, delete the old file first, then upload the replacement — ideally with the same name so it overwrites cleanly.

### 2. Publications (BibTeX)
One big editor holding your entire `publications.bib`. **Paste the complete contents of your `.bib` file** — all entries together, exactly like opening the file in a text editor. Each entry must start with `@` (e.g. `@article{...}` for journals, `@INPROCEEDINGS{...}` for conferences). The site:

- splits the file into individual papers,
- sorts them newest-first and separates journals vs. conferences for the filter tabs,
- counts the total as your **Papers** number,
- generates a `ScholarlyArticle` structured-data entry for each paper at runtime (see SEO section below).

To get an entry, click **Cite → BibTeX** on Google Scholar or IEEE Xplore and paste it in. To remove a paper, delete its block.

> **Why paste instead of "upload a new .bib"?** Pages CMS' uploader creates/renames files in a media folder — it can't reliably overwrite one specific tracked file (`publications.bib`) that the site reads by name. Pasting into this editor writes straight to that exact file, so it's the simpler and more reliable option.

### 3. Media
Three image libraries: **Site Images** (profile photo, hero charts, etc.), **Event Photos** (`images/events/`), and **Memory Photos** (`images/memories/`). Drag-and-drop to upload. Gallery photos appear on `gallery.html` automatically, captioned from the filename (e.g. `Sajek Valley.webp` → "Sajek Valley") — within about a minute, once the GitHub Action regenerates `images/gallery-manifest.json`.

---

## A Note on the CMS Look

Pages CMS is a hosted app, so its visual theme isn't customizable from this repository — the way to make the admin experience clean is good configuration, which is what `.pages.yml` does here (clear labels, helper text, one tidy "Basic Info" screen). The only way to fully re-skin the editor UI would be to self-host Pages CMS, which isn't necessary for a personal site.

---

## SEO

Several pieces work together to keep the home page indexable and well-described, and the gallery deliberately invisible to search engines:

- **Meta tags** (`index.html`) — description, keywords, canonical, Open Graph, and Twitter Card tags (with image dimensions) for clean link previews. Because `og:type` is `profile`, the page also sets `profile:first_name`, `profile:last_name`, and `profile:username`. The `robots` meta includes `max-image-preview:large`, `max-snippet:-1`, and `max-video-preview:-1` so Google isn't capped on preview length.
- **Structured data, static** (`index.html` `<head>`) — a single linked `@graph` of `WebSite` + `ProfilePage` + three `ImageObject`s + `Person`, connected via `@id` references. This is static HTML, so **update it by hand** if your name, job title, contact info, alma mater, or social links change, and keep its `dateModified` in sync with `<lastmod>` in `sitemap.xml` (both are currently `2026-06-22`).
- **Structured data, dynamic** (`index.html` script) — once `publications.bib` loads, `injectPublicationsStructuredData()` (via `buildPublicationsLd()`) builds a `ScholarlyArticle` entry per paper (title, authors, venue, DOI) and appends it as its own `<script type="application/ld+json">` tag. Google executes page JavaScript before reading structured data, so it's picked up like a static block — you never maintain it by hand.
- **Text cleanup** (`index.html` script) — `unescapeBibText()` strips LaTeX escapes (`\&`, leftover `{}` used to protect acronym capitalization) from titles/authors/venues before they reach the page or the structured data, so search engines and readers never see raw BibTeX syntax.
- **`sitemap.xml`** — lists the home page plus an image sitemap (`image:image` entries) for the profile photo and the two hero charts, so Google Image Search has an explicit list of crawlable images tied to that URL.
- **`robots.txt`** — allows everything except the gallery, and deliberately leaves `data.json`/`publications.bib` crawlable, since Googlebot's renderer needs to fetch them to index the dynamically-loaded name, bio, experience, and publications.

### Search Engines & the Hidden Gallery

The home page is indexable; the **gallery is intentionally hidden** from search engines. That's enforced in three consistent places — change all three if you ever want it public:

- `robots.txt` — `Disallow: /gallery.html` (and gallery image folders blocked for Googlebot-Image)
- `gallery.html` — `<meta name="robots" content="noindex, nofollow, noimageindex">`
- `sitemap.xml` — `gallery.html` is not listed (only indexable pages belong in a sitemap)

After any significant content change, update the `<lastmod>` date in `sitemap.xml` **and** the matching `"dateModified"` value in the static JSON-LD block in `index.html`, so the two stay in sync.

---

## Using This as Your Own Template

1. **Replace the profile image** in `images/` — your own `saadahmed.png`. (The favicon is an inline SVG, so there's no separate icon file to swap; edit the `SA` initials in the `<link rel="icon" …>` data URI in each HTML file if you want different letters.)
2. **Edit `data.json`** — or just do it through the CMS once connected — with your own profile, stats, experience, education, skills, certifications, research projects, teaching, and contact details.
3. **Edit `publications.bib`** — paste your own BibTeX.
4. **Find-and-replace `saadbaust.github.io`** with your own URL across `index.html` (meta tags + JSON-LD), `gallery.html`, `sitemap.xml`, and `robots.txt`. In `gallery.html`, also update the `REPO_OWNER` / `REPO_NAME` / `REPO_BRANCH` constants used by the GitHub-API fallback.
5. **Update the CMS link** in the sidebar "CMS Login" link in both HTML files (and the comments in `.pages.yml`) to your own repo path.
6. **Publish on GitHub Pages:** create a repo named `yourusername.github.io`, upload the files, then Settings → Pages → set the source to the `main` branch.
7. **Connect Pages CMS:** sign in at [pagescms.org](https://pagescms.org), authorize your repo, and you're editing through forms.
8. **Enable Actions:** under Settings → Actions → General → Workflow permissions, choose "Read and write permissions" so the gallery-manifest workflow can commit its output.

> The page meta tags and the static structured-data (`JSON-LD`) block in `index.html` — name, job title, email, social links used for SEO — are static. Update them by hand if those details ever change. The per-publication structured data is dynamic and regenerates itself from `publications.bib`.

---

## Dark Mode

The site automatically switches to a dark theme if the visitor's device is set to dark mode, and remembers a manual choice (the in-page **Theme Toggle**, or **Alt+T**) in `localStorage`. No setup needed.

---

## Credits

Built and designed by [Saad Ahmed](https://saadbaust.github.io/). Free to use as a personal academic portfolio template.
