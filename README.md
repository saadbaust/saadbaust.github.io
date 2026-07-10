# Saad Ahmed — Academic Portfolio

Personal academic portfolio website for **Saad Ahmed**, Lecturer at the Department of CSE, Bangladesh Army University of Science and Technology (BAUST).

🌐 **Live site:** [saadbaust.github.io](https://saadbaust.github.io/)
🛠 **Edit publications & stats (CMS):** [app.pagescms.org/saadbaust/saadbaust.github.io](https://app.pagescms.org/saadbaust/saadbaust.github.io)

This is a **single-page** portfolio. The scaffolding (layout, styling, hero/About text, social links) is **hard-coded in the HTML**, but most of the résumé-style content is **content-managed through the CMS** — publications, citation/h-index stats, Experience, Research Projects, Thesis, Research Activities, Teaching Courses, Leadership & Co-curricular Activities, Projects, and Awards — so you can update those without touching code or committing by hand. Each CMS-driven section also keeps a static copy in the HTML as a no-JS fallback.

---

## How the Site Is Built

There is **no build step, no framework, and no Tailwind.** The whole site is one self-contained HTML file:

- **Styling** is plain, hand-written **CSS** inside a single `<style>` block in the `<head>`. Theme colors are defined as CSS custom properties (`--bg-main`, `--brand-color`, etc.) with a `html.dark { … }` override for dark mode.
- **Page logic** (theme toggle, mobile menu, scroll-spy nav highlight, BibTeX parsing, and the two small data fetches) is inlined in a `<script>` at the bottom of the file.

To deploy, host the file as-is on GitHub Pages — nothing to compile.

> **Deploying:** the working file is named `new.html`. On GitHub Pages the home page must be **`index.html`**, so rename `new.html` → `index.html` (replacing the old one) when you publish. The "Home" link in the sidebar already points at `index.html`.

---

## What Is Hard-Coded vs. CMS-Managed

| Area | Where it lives | How to change it |
|---|---|---|
| Name, title, institution, About text | `index.html` | Edit the HTML |
| Contact (email, phone) | `index.html` | Edit the HTML |
| **CV button** link | `index.html` (hard-coded URL) | Edit the `href` on `#cv-download-btn` |
| **Email button** | `index.html` (`mailto:` link) | Edit the `href` on `#email-link` |
| **Social links** (LinkedIn, Google Scholar, ORCID, ResearchGate, IEEE Xplore, Semantic Scholar, GitHub, YouTube) | `index.html` | Edit the `<a>` tags in the social block |
| **Publications list** (journals, conferences **and datasets**) | `publications.bib` | **CMS** → "Publications (BibTeX)" |
| **Total Pubs** number | auto-counted from `publications.bib` (journals + conferences) | nothing to set |
| **Citations** + **h-index** | `data.json` | **CMS** → "Site Content" |
| **Experience** timeline | `data.json` | **CMS** → "Site Content" |
| **Education** (degrees + results) | `data.json` | **CMS** → "Site Content" |
| **Research Projects** | `data.json` | **CMS** → "Site Content" |
| **Thesis** | `data.json` | **CMS** → "Site Content" |
| **Research Activities** (review experience + thesis co-supervisions) | `data.json` | **CMS** → "Site Content" |
| **Teaching Duties** course table | `data.json` | **CMS** → "Site Content" |
| **Leadership & Co-curricular Activities** | `data.json` | **CMS** → "Site Content" |
| **Projects** (software / web) | `data.json` | **CMS** → "Site Content" |
| **Awards & Achievements** | `data.json` | **CMS** → "Site Content" |

---

## Files in This Project

| File | What it does |
|---|---|
| `index.html` (delivered as `new.html`) | The entire site. All content, styling, and logic are inlined. Renders the publications list from `publications.bib` and the citation/h-index stats from `data.json` in the browser at load time. Everything else is static HTML. |
| `publications.bib` | All publications in BibTeX. The page reads it directly, splits it into entries, separates journals / conferences / datasets (`@misc`), and counts the total (journals + conferences). Managed via the CMS "Publications" screen. |
| `data.json` | Every structured, editable section of the site: the publication stats (`citations`, `hIndex`), `experience`, `education`, `researchProjects`, `thesis`, `reviewExperience`, `coSupervisionsOngoing`, `coSupervisionsCompleted`, `courses` (Teaching), `leadership`, `devProjects`, and `awards`. Managed via the CMS "Site Content" screen. (Total Pubs is counted from the BibTeX, so it isn't stored here.) The page keeps a static copy of each section in the HTML as a no-JS fallback. |
| `.pages.yml` | Pages CMS configuration — exposes the two editable files: Publications (BibTeX) and Site Content (`data.json`). |
| `sitemap.xml` | Tells search engines to index the home page (and the profile image). |
| `robots.txt` | Allows everything; explicitly leaves `data.json` / `publications.bib` crawlable so Google can render and index the dynamic content. |
| `images/` | Your photos, profile picture (`saadahmed.webp`), and the site logo/favicon (`logo.png`). |

> **Removed since the previous version:** the photo **gallery** (`gallery.html`, its navbar link, the gallery image folders, and the gallery GitHub Action) is gone, along with the Tailwind CDN and the old all-content `data.json`. The CMS no longer has a "Media" section.

---

## Editing Through the CMS

Go to **[app.pagescms.org/saadbaust/saadbaust.github.io](https://app.pagescms.org/saadbaust/saadbaust.github.io)** and sign in. There are two screens:

### 1. Publications (BibTeX)
One editor holding your entire `publications.bib`. **Paste the complete contents of your `.bib` file** — all entries together, exactly like opening the file in a text editor. Each entry must start with `@` (e.g. `@article{...}` for journals, `@INPROCEEDINGS{...}` for conferences, `@misc{...}` for datasets). The page splits the file into papers, separates journals / conference papers / datasets, and counts the journals + conferences as the **Total Pubs** number (datasets are listed under their own heading and not counted). To get an entry, click **Cite → BibTeX** on Google Scholar / IEEE Xplore / Kaggle and paste it in. To remove an entry, delete its block.

### 2. Site Content
Everything else that's structured, in one screen (all backed by `data.json`):

- **Stats** — the **Citations** and **h-index** numbers (Total Pubs is automatic, so it isn't listed here).
- **Experience** — each position has a Job Title, Organization, optional Location, Duration, and a list of Bullet Points.
- **Education** — each degree / certificate has a Degree, Institution, Duration, and Result / Grade (e.g. CGPA), newest first.
- **Research Projects**, **Thesis** — indexed lists with title, duration, and a details/description line (Research Projects also take an optional status badge like "Ongoing").
- **Research Activities** — **Review Experience** (a bulleted list), plus **Thesis Co-Supervisions** split into **Ongoing** (topic + timeframe) and **Completed** (full citations).
- **Teaching Courses** — the rows of the Teaching Duties table (Course Code, Course Title, Semesters Taught).
- **Leadership & Co-curricular Activities** and **Awards & Achievements** — simple bulleted lists, one entry per line.
- **Projects (Software / Web)** — cards with a Name, Description, and comma-separated Tools (each tool becomes a tag).

For every list, use the **+** and trash icons to add or remove entries, and drag to reorder. Edit, click **Save**, and the live site updates within a minute.

Save in either screen → it commits to GitHub → the live site updates within about a minute.

---

## Editing Everything Else (Hard-Coded)

Open `index.html` and edit the relevant section directly:

- **About / hero** — the `#about-section` and hero block near the top.
- **CV button** — change the `href` on the `<a id="cv-download-btn">`.
- **Email** — change the `mailto:` on `<a id="email-link">` (and the address in the Contact section / JSON-LD if it changes).
- **Social links** — edit the `<a class="social-badge-item …">` tags in the social block.
- **Contact** — a clearly labelled `<section>` with plain HTML. (Experience, Education, Research Projects, Thesis, Research Activities, Teaching, Leadership, Projects, and Awards all come from the CMS `data.json`, not the HTML — the HTML only holds their static fallback copy.)

> **Profile photo & favicon.** `images/saadahmed.webp` (profile) and `images/logo.png` (favicon) are static files referenced directly. To replace one, upload a file with the same name so it overwrites cleanly.

---

## Dark Mode

The site automatically follows the visitor's device theme and remembers a manual choice in `localStorage`. Toggle it with the **sun/moon icon** in the sidebar (desktop) or the top bar (mobile). A small inline script in the `<head>` applies the saved theme before the page paints, so there's no flash of the wrong theme.

---

## SEO

Several pieces keep the page indexable and well-described:

- **Meta tags** (`index.html`) — description, keywords, canonical, Open Graph, and Twitter Card tags (with image dimensions) for clean link previews. Because `og:type` is `profile`, the page also sets `profile:first_name`, `profile:last_name`, and `profile:username`. The `robots` meta includes `max-image-preview:large`, `max-snippet:-1`, and `max-video-preview:-1`.
- **Structured data** (`index.html` `<head>`) — a single linked `@graph` of `WebSite` + `ProfilePage` + an `ImageObject` (profile photo) + `Person` (job title, email, employer, alma maters, and all eight social profiles in `sameAs`), connected via `@id` references. This is static HTML, so **update it by hand** if your name, job title, contact info, alma mater, or social links change, and keep its `dateModified` in sync with `<lastmod>` in `sitemap.xml` (both are currently `2026-06-23`).
- **`sitemap.xml`** — lists the home page plus an image sitemap entry for the profile photo.
- **`robots.txt`** — allows everything and deliberately leaves `data.json` / `publications.bib` crawlable, since Googlebot's renderer fetches them to index the dynamically-loaded publications and stats.

After any significant content change, bump the `<lastmod>` date in `sitemap.xml` **and** the matching `"dateModified"` value in the JSON-LD block in `index.html` so the two stay in sync.

---

## Using This as Your Own Template

1. **Replace the profile image** (`images/saadahmed.webp`) and favicon (`images/logo.png`).
2. **Edit `index.html`** with your own profile/About text, contact details, CV link, and social links (and the static fallback copy of the CMS-driven sections).
3. **Edit `publications.bib`** — paste your own BibTeX — and set your stats, experience, education, projects, thesis, activities, teaching, leadership, and awards in `data.json`.
4. **Find-and-replace `saadbaust.github.io`** with your own URL across `index.html` (meta tags + JSON-LD), `sitemap.xml`, and `robots.txt`.
5. **Update the CMS link** in the README and the comments in `.pages.yml` to your own repo path.
6. **Publish on GitHub Pages:** create a repo named `yourusername.github.io`, upload the files (with the home file named `index.html`), then Settings → Pages → set the source to the `main` branch.
7. **Connect Pages CMS:** sign in at [pagescms.org](https://pagescms.org), authorize your repo, and you're editing publications and all the `data.json`-backed sections through forms.

---

## Credits

Built and designed by [Saad Ahmed](https://saadbaust.github.io/). Free to use as a personal academic portfolio template.
