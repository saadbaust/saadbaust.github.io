# Saad Ahmed — Academic Portfolio

Personal academic portfolio website for **Saad Ahmed**, Lecturer at the Department of CSE, Bangladesh Army University of Science and Technology (BAUST).

🌐 **Live site:** [saadbaust.github.io](https://saadbaust.github.io/)
🛠 **Edit content (CMS):** [app.pagescms.org/saadbaust/saadbaust.github.io](https://app.pagescms.org/saadbaust/saadbaust.github.io)

This is a **single-page** portfolio. The scaffolding (layout, styling, name, social links, contact) is **hard-coded in the HTML**, but almost all of the résumé-style content is **content-managed through the CMS** — publications, profile card, About, Experience, Education, Research Projects, Thesis, Research Activities, Teaching Courses, Leadership & Co-curricular Activities, Projects, and Awards — so you can update those without touching code or committing by hand. Each CMS-driven section also keeps a static copy in the HTML as a no-JS fallback.

---

## How the Site Is Built

There is **no build step, no framework, and no Tailwind** — three plain files:

- **`index.html`** — the page structure (plus a tiny inline script in `<head>` that applies the saved theme before first paint).
- **`style.css`** — all styling. Theme colors are CSS custom properties (`--bg-main`, `--brand-color`, etc.) with a `html.dark { … }` override for dark mode. The self-hosted Poppins `@font-face` rules are at the top.
- **`main.js`** — theme toggle, mobile menu, scroll-spy nav highlight, BibTeX parsing (first-author badge, paper buttons, copy-BibTeX) and the two small data fetches.

To deploy, push to the `main` branch. The workflow in `.github/workflows/deploy.yml` publishes the site to GitHub Pages and stamps the deploy date into `sitemap.xml` and the JSON-LD `dateModified`, so you never edit those dates by hand. It also checks that `data.json` and `content.json` are valid JSON and stops the deploy if a CMS edit broke one of them (the live site then keeps the last good version).

> **One-time setup:** on GitHub open **Settings → Pages → Build and deployment** and set **Source** to **GitHub Actions**. Until then the old "deploy from branch" mode keeps working, just without the automatic dates.

> **Browser caching:** GitHub Pages lets browsers cache `style.css` / `main.js` for about 10 minutes, so right after a code change a visitor may briefly see the old version. A hard refresh (Ctrl + F5) shows the new one immediately.

To preview locally, run a static server in the repo folder (the page fetches `data.json`, `content.json` and `publications.bib`, which browsers block when opened via `file://`):

```bash
python -m http.server 8000
```

---

## What Is Hard-Coded vs. CMS-Managed

| Area | Where it lives | How to change it |
|---|---|---|
| Name / greeting, profile photo | `index.html` | Edit the HTML |
| Contact (email) | `index.html` | Edit the HTML |
| **CV button** link | `index.html` (hard-coded URL) | Edit the `href` on `#cv-download-btn` |
| **Email button** | `index.html` (`mailto:` link) | Edit the `href` on `#email-link` |
| **Social links** (LinkedIn, Google Scholar, ORCID, ResearchGate, IEEE Xplore, Semantic Scholar, GitHub, YouTube) | `index.html` | Edit the `<a>` tags in the social block |
| **Publications list** (journals, conferences, **preprints and datasets**) | `publications.bib` | **CMS** → "Publications (BibTeX)" |
| **Profile card** + **About** text/tags | `data.json` | **CMS** → "Profile, Experience & Research" |
| **Experience** timeline | `data.json` | **CMS** → "Profile, Experience & Research" |
| **Education** (degrees + results) | `data.json` | **CMS** → "Profile, Experience & Research" |
| **Research Projects** | `data.json` | **CMS** → "Profile, Experience & Research" |
| **Thesis** | `data.json` | **CMS** → "Profile, Experience & Research" |
| **Research Activities** (review experience + thesis co-supervisions) | `content.json` | **CMS** → "Activities, Teaching & Extras" |
| **Teaching** course table | `content.json` | **CMS** → "Activities, Teaching & Extras" |
| **Leadership & Co-curricular Activities** | `content.json` | **CMS** → "Activities, Teaching & Extras" |
| **Projects** (software / web) | `content.json` | **CMS** → "Activities, Teaching & Extras" |
| **Awards & Achievements** | `content.json` | **CMS** → "Activities, Teaching & Extras" |

---

## Files in This Project

| File | What it does |
|---|---|
| `index.html` | Page structure and SEO tags. Each CMS-driven section also has a static HTML copy as a no-JS fallback. |
| `style.css` | All styling, light + dark theme, and the `@font-face` rules for Poppins. |
| `main.js` | All page logic: renders publications from `publications.bib` and every structured section from `data.json` + `content.json`. |
| `fonts/` | Self-hosted Poppins (weights 400/500/600/700, Latin + Latin Extended, `.woff2`) and its licence (`OFL.txt`). |
| `.github/workflows/deploy.yml` | Publishes to GitHub Pages on every push and stamps the last-modified dates. |
| `publications.bib` | All publications in BibTeX. The page reads it directly, splits it into entries, separates journals / conferences / preprints (`@misc`) / datasets (`@dataset`). Managed via the CMS "Publications" screen. |
| `data.json` | Top half of the page: `profile` card, `about` (paragraph + interests), `experience`, `education`, `researchProjects`, and `thesis`. Managed via the CMS "Profile, Experience & Research" screen. |
| `content.json` | Lower half of the page: `reviewConferences`, `reviewJournals`, `coSupervisionsOngoing`, `coSupervisionsCompleted`, `courses` (Teaching), `leadership`, `devProjects`, and `awards`. Managed via the CMS "Activities, Teaching & Extras" screen. Split out from `data.json` so neither CMS screen is too long to scroll. |
| `.pages.yml` | Pages CMS configuration — exposes the three editable files: Publications (`publications.bib`), Profile, Experience & Research (`data.json`), and Activities, Teaching & Extras (`content.json`). |
| `sitemap.xml` | Tells search engines to index the home page (and the profile image). |
| `robots.txt` | Allows everything; explicitly leaves `data.json` / `content.json` / `publications.bib` crawlable so Google can render and index the dynamic content. |
| `images/` | Profile picture: `saadahmed.webp` (shown on the page) and `saadahmed.png` (fallback + social-preview / SEO image). The favicon is an inline SVG "SA" monogram in the `<head>`. |

> **Removed since the previous version:** the photo **gallery** (`gallery.html`, its navbar link, the gallery image folders, and the gallery GitHub Action) is gone, along with the Tailwind CDN and the old all-content `data.json`. The CMS no longer has a "Media" section.

---

## Editing Through the CMS

Go to **[app.pagescms.org/saadbaust/saadbaust.github.io](https://app.pagescms.org/saadbaust/saadbaust.github.io)** and sign in. There are three screens (one per file):

### 1. Publications (BibTeX)
One editor holding your entire `publications.bib`. **Paste the complete contents of your `.bib` file** — all entries together, exactly like opening the file in a text editor. Each entry must start with `@` (e.g. `@article{...}` for journals, `@INPROCEEDINGS{...}` for conferences, `@misc{...}` for preprints, `@dataset{...}` for datasets). The page splits the file into four lists — **Journal Articles**, **Conference Papers**, **Preprints**, and **Datasets** — each sorted newest first. Every paper gets a **"First author"** badge automatically when your name comes first in its `author` field, and a row of buttons: **PDF** and **arXiv** (for arXiv preprints, from `eprint`), **DOI** (from `doi`), and **BibTeX** (copies the entry to the clipboard). Add optional fields to any entry to get more buttons — `pdf = {https://…}`, `code = {https://github.com/…}`, `dataset = {https://…}`. A preprint is a `@misc` entry carrying `eprint` / `archivePrefix` / `primaryClass` fields (or an arXiv URL), which arXiv's own BibTeX already includes, so paste it unchanged. Datasets use the `@dataset` type; older non-preprint `@misc` dataset entries still render too, for backward compatibility. The Preprints and Datasets headings only appear when at least one such entry exists. To get an entry, click **Cite → BibTeX** on Google Scholar / IEEE Xplore / arXiv / Kaggle and paste it in. To remove an entry, delete its block.

### 2. Profile, Experience & Research (`data.json`)
The top half of the page:

- **Profile Card** — the subtitle/role, institution, and objective line under your photo.
- **About** — the intro paragraph (wrap text in `**double asterisks**` to make it bold) and the short "Teaching" subject list.
- **Experience** — each position has a Job Title, Organization, optional Location, Duration, and a list of Bullet Points.
- **Education** — each degree / certificate has a Degree, Institution, Duration, and Result / Grade (e.g. CGPA), newest first.
- **Research Projects**, **Thesis** — indexed lists with title, duration, and a details/description line (Research Projects also take an optional status badge like "Ongoing").

### 3. Activities, Teaching & Extras (`content.json`)
The lower half of the page:

- **Research Activities** — **Review Experience**, grouped into conference and journal reviews, plus **Thesis Co-Supervisions** split into **Ongoing** (topic + timeframe) and **Completed** (full citations).
- **Teaching Courses** — the rows of the Teaching table (Course Code, Course Title, Semesters Taught).
- **Leadership & Co-curricular Activities** and **Awards & Achievements** — simple bulleted lists, one entry per line.
- **Projects (Software / Web)** — each with a Name, Description, comma-separated Tools, and an optional Project URL.

For every list, use the **+** and trash icons to add or remove entries, and drag to reorder. Save in any screen → it commits to GitHub → the live site updates within about a minute.

---

## Editing Everything Else (Hard-Coded)

Open `index.html` and edit the relevant section directly:

- **Greeting** — the "Hello, this is Saad" heading in `#about-section`.
- **CV button** — change the `href` on the `<a id="cv-download-btn">`.
- **Email** — change the `mailto:` on `<a id="email-link">` (and the address in the Contact section / JSON-LD if it changes).
- **Social links** — edit the `<a class="social-badge-item …">` tags in the social block.
- **Contact** — a clearly labelled `<section>` with plain HTML. (Profile card, About, Experience, Education, Research Projects, Thesis, Research Activities, Teaching, Leadership, Projects, and Awards all come from the CMS `data.json` / `content.json`, not the HTML — the HTML only holds their static fallback copy.)

> **Profile photo.** `images/saadahmed.webp` and `images/saadahmed.png` are referenced directly. To replace the photo, upload new files with the same names (keep the PNG square and update its pixel size in the `og:image:width/height` tags and the JSON-LD `ImageObject` if it changes).
>
> **Static fallback copies.** Each CMS-driven section also has a static copy in `index.html` for visitors without JavaScript and for crawlers. The live page always shows the CMS data, but when you make a big content change it's worth refreshing that copy too.

---

## Dark Mode

The site opens in light mode; visitors switch with the **sun/moon icon** in the top navbar, and the choice is remembered in `localStorage`. A small inline script in the `<head>` applies the saved theme before the page paints, so there's no flash of the wrong theme, and the browser's address-bar colour (`theme-color`) follows the toggle.

---

## SEO

Several pieces keep the page indexable and well-described:

- **Meta tags** (`index.html`) — description, keywords, canonical, Open Graph, and Twitter Card tags (with image dimensions) for clean link previews. Because `og:type` is `profile`, the page also sets `profile:first_name`, `profile:last_name`, and `profile:username`. The `robots` meta includes `max-image-preview:large`, `max-snippet:-1`, and `max-video-preview:-1`.
- **Structured data** (`index.html` `<head>`) — a single linked `@graph` of `WebSite` + `ProfilePage` + an `ImageObject` (profile photo) + `Person` (job title, email, employer, alma maters, and all eight social profiles in `sameAs`), connected via `@id` references. This is static HTML, so **update it by hand** if your name, job title, contact info, alma mater, or social links change. Its `dateModified` is set automatically on each deploy.
- **`sitemap.xml`** — lists the home page plus an image sitemap entry for the profile photo. `<lastmod>` is set automatically on each deploy.
- **`robots.txt`** — allows everything and deliberately leaves `data.json` / `content.json` / `publications.bib` crawlable, since Googlebot's renderer fetches them to index the dynamically-loaded publications and sections.

---

## Using This as Your Own Template

1. **Replace the profile images** (`images/saadahmed.webp` + `.png`) and the "SA" letters in the inline favicon in `<head>`.
2. **Edit `index.html`** with your own profile/About text, contact details, CV link, and social links (and the static fallback copy of the CMS-driven sections).
3. **Edit `publications.bib`** — paste your own BibTeX — and set your profile, experience, education, research projects, and thesis in `data.json`, plus activities, teaching, leadership, projects, and awards in `content.json`.
4. **Find-and-replace `saadbaust.github.io`** with your own URL across `index.html` (meta tags + JSON-LD), `sitemap.xml`, and `robots.txt`.
5. **Update the CMS link** in the README and the comments in `.pages.yml` to your own repo path.
6. **Publish on GitHub Pages:** create a repo named `yourusername.github.io`, upload the files, then Settings → Pages → set the source to **GitHub Actions**.
7. **Connect Pages CMS:** sign in at [pagescms.org](https://pagescms.org), authorize your repo, and you're editing publications and all the `data.json` / `content.json`-backed sections through forms.

---

## Credits

Built and designed by [Saad Ahmed](https://saadbaust.github.io/). Free to use as a personal academic portfolio template.
