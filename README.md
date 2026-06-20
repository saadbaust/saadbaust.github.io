# Saad Ahmed — Academic Portfolio

Personal academic portfolio website for **Saad Ahmed**, Lecturer at the Department of CSE, Bangladesh Army University of Science and Technology (BAUST).

🌐 **Live site:** [saadbaust.github.io](https://saadbaust.github.io/)
🛠 **Edit content (CMS):** [app.pagescms.org/saadbaust/saadbaust.github.io](https://app.pagescms.org/saadbaust/saadbaust.github.io)

This site is **content-managed**. You almost never need to touch code — you log into Pages CMS, edit in a form, hit **Save**, and the live site updates within a minute.

---

## Files in This Project

| File | What it does |
|---|---|
| `index.html` | Main portfolio page (home). Reads content from `data.json` and `publications.bib` at runtime. |
| `gallery.html` | Photo gallery page — **hidden from search engines**. Lists whatever is in `images/events/` and `images/memories/`. |
| `style.css` | All visual styling for both pages. |
| `data.json` | **All editable home-page content** — profile, intro, stats, CV link, hero images, experience, education, skills, certifications, phone, email. Managed via the CMS "Basic Info" screen. |
| `publications.bib` | All publications in BibTeX. The site reads this directly and builds the papers list. Managed via the CMS "Publications" screen. |
| `.pages.yml` | Pages CMS configuration — decides what you can edit in the admin panel. |
| `sitemap.xml` | Tells search engines to index the home page only. |
| `robots.txt` | Blocks search engines from crawling the gallery and its images. |
| `.gitattributes` | Git line-ending normalization. Leave as is. |
| `images/` | Your photos, profile picture, favicon, and the two hero charts. |
| `images/s-logo.png` | Site favicon — the small icon shown in browser tabs. |

> **Note:** the old `data.js` file is gone. Its content now lives in `data.json` so it can be edited through the CMS with proper forms. If you have a `data.js` left over, delete it.

---

## Editing Your Site Through the CMS

Go to **[app.pagescms.org/saadbaust/saadbaust.github.io](https://app.pagescms.org/saadbaust/saadbaust.github.io)** and sign in. You'll see three areas in the left sidebar.

### 1. Basic Info
A single screen with grouped sections:

- **Profile & Intro** — name, title line, institution, the badge under your photo, research-focus line, the "About me" paragraph, and your CV link.
- **Google Scholar Stats** — citations, h-index, i10-index. (Your **Papers** count is calculated automatically from your publications, so there's nothing to type for it.)
- **Hero Chart Images** — the two charts near the top of the page. Click an image field and upload a new file to replace either one.
- **Contact** — phone number and email address.
- **Experience** — add, remove, or reorder positions with the **+** / drag controls.
- **Education** — same, for degrees.
- **Technical Skills** — two lists (Research & AI, Development & Tools). Add a skill with **+**.
- **Certifications & Activities** — one item per entry.

Edit anything, click **Save**, done.

### 2. Publications (BibTeX)
One big editor holding your entire `publications.bib`. **Paste the complete contents of your `.bib` file** — all entries together, exactly like opening the file in a text editor. Each entry must start with `@` (e.g. `@article{...}` for journals, `@INPROCEEDINGS{...}` for conferences). The site:

- splits the file into individual papers,
- sorts journals vs. conferences automatically,
- counts the total as your **Papers** number.

To get an entry, click **Cite → BibTeX** on Google Scholar or IEEE Xplore and paste it in. To remove a paper, delete its block.

> **Why paste instead of "upload a new .bib"?** Pages CMS' uploader creates/renames files in a media folder — it can't reliably overwrite one specific tracked file (`publications.bib`) that the site reads by name. Pasting into this editor writes straight to that exact file, so it's the simpler and more reliable option.

### 3. Media
Three image libraries: **Site Images** (profile photo, hero charts, etc.), **Event Photos** (`images/events/`), and **Memory Photos** (`images/memories/`). Drag-and-drop to upload. Gallery photos appear on `gallery.html` automatically, captioned from the filename (e.g. `Sajek Valley.webp` → "Sajek Valley").

---

## A Note on the CMS Look

Pages CMS is a hosted app, so its visual theme isn't customizable from this repository — the way to make the admin experience clean is good configuration, which is what `.pages.yml` does here (clear labels, helper text, one tidy "Basic Info" screen). The only way to fully re-skin the editor UI would be to self-host Pages CMS, which isn't necessary for a personal site.

---

## Search Engines & the Hidden Gallery

The home page is indexable; the **gallery is intentionally hidden** from search engines. That's enforced in three consistent places — change all three if you ever want it public:

- `robots.txt` — `Disallow: /gallery.html` (and gallery image folders blocked for Googlebot-Image)
- `gallery.html` — `<meta name="robots" content="noindex, nofollow, noimageindex">`
- `sitemap.xml` — `gallery.html` is not listed (only indexable pages belong in a sitemap)

After any significant content change, update the `<lastmod>` date in `sitemap.xml`.

---

## Using This as Your Own Template

1. **Replace images** in `images/` — your `saadahmed.png` (profile) and `s-logo.png` (favicon).
2. **Edit `data.json`** — or just do it through the CMS once connected — with your own profile, stats, experience, education, skills, certifications, and contact details.
3. **Edit `publications.bib`** — paste your own BibTeX.
4. **Find-and-replace `saadbaust.github.io`** with your own URL across `index.html` (meta tags + JSON-LD), `gallery.html`, `sitemap.xml`, and `robots.txt`.
5. **Update the CMS link** in `.pages.yml` comments and in the sidebar "CMS Login" link in both HTML files to your own repo path.
6. **Publish on GitHub Pages:** create a repo named `yourusername.github.io`, upload the files, then Settings → Pages → set the source to the `main` branch.
7. **Connect Pages CMS:** sign in at [pagescms.org](https://pagescms.org), authorize your repo, and you're editing through forms.

> The page meta tags and the structured-data (`JSON-LD`) block in `index.html` — name, job title, email, social links used for SEO — are static. Update them by hand if those details ever change.

---

## Dark Mode

The site automatically switches to a dark theme if the visitor's device is set to dark mode. No setup needed.

---

## Credits

Built and designed by [Saad Ahmed](https://saadbaust.github.io/). Free to use as a personal academic portfolio template.
