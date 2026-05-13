# Academic Portfolio — Static Website

A clean, responsive personal academic portfolio for researchers and lecturers. Built with plain HTML, CSS, and JavaScript — no frameworks, no build tools. Deployable to GitHub Pages or Vercel in minutes.

**Live demo:** [saadbaust.github.io](https://saadbaust.github.io)

---

## File Structure

```
portfolio/
├── index.html        # Main page (bio, papers, contact)
├── gallery.html      # Photo gallery page
├── style.css         # All styling (light + dark mode + mobile)
├── papers.js         # ← YOUR PUBLICATIONS & STATS GO HERE
├── gallery.js        # Auto-loads images from images/gallery/
├── robots.txt        # SEO crawler config
├── sitemap.xml       # SEO sitemap
└── images/
    ├── formal.png    # Your profile photo
    ├── a.png         # Google Scholar interest graph (screenshot)
    ├── b.png         # Google Scholar citation history (screenshot)
    └── gallery/      # Photos for the gallery page
        ├── 1.jpg
        ├── 2.jpg
        └── ...       # Named sequentially: 1, 2, 3, ...
```

---

## Quick Start — If You Are Forking This Template

### Step 1 — Personal Information (`index.html`)

Open `index.html` and update the following:

**Page title and meta tags** (top of file, inside `<head>`):
```html
<title>Your Name | Lecturer & Researcher | Your University</title>
<meta name="description" content="Your description here." />
<meta name="keywords" content="Your Name, your keywords..." />
<meta name="author" content="Your Name" />
<link rel="canonical" href="https://yourusername.github.io/" />
```

**Open Graph tags** (for link previews on WhatsApp, LinkedIn, etc.):
```html
<meta property="og:title" content="Your Name | Your Title | Your University" />
<meta property="og:description" content="Your description." />
<meta property="og:url" content="https://yourusername.github.io/" />
<meta property="og:image" content="https://yourusername.github.io/images/formal.png" />
```

**Structured data** (for Google search appearance — the JSON block inside `<script type="application/ld+json">`):
```json
{
  "name": "Your Full Name",
  "url": "https://yourusername.github.io/",
  "image": "https://yourusername.github.io/images/formal.png",
  "jobTitle": "Lecturer",
  "worksFor": {
    "name": "Your University Full Name"
  },
  "sameAs": [
    "https://github.com/yourusername",
    "https://linkedin.com/in/yourusername",
    "https://scholar.google.com/citations?user=YOUR_SCHOLAR_ID"
  ]
}
```

**Hero section** (your name, title, institution):
```html
<h1>Your Full Name</h1>
<p class="subtitle">Your Title, Dept of CSE</p>
<p class="institution">Your University Full Name</p>
```

**Social media links** — find the `social-icons` div and replace the `href` placeholders:
```html
<a href="https://github.com/yourusername" ...>
<a href="https://linkedin.com/in/yourusername" ...>
<a href="https://scholar.google.com/citations?user=YOUR_SCHOLAR_ID" ...>
<a href="https://www.researchgate.net/profile/Your-Profile" ...>
<a href="https://youtube.com/@yourchannel" ...>
```

**Contact section** (bottom of `index.html`):
```html
<p>Your Full Name</p>
<p>Your Title, Dept of CSE, Your University</p>
<p>+880XXXXXXXXXX</p>
<p>yourname@university.edu.bd</p>
```

**Footer** (very bottom):
```html
<p>&copy; 2026 Your Name • Your University, City</p>
```

---

### Step 2 — Publications & Stats (`papers.js`)

This is the only file you will edit regularly. It has two parts:

#### Part A — Scholar Metrics

```js
const scholarStats = {
    citations: 14,   // ← Your total citation count
    hIndex: 2,       // ← Your h-index
    i10Index: 0      // ← Your i10-index
};
```

Get these numbers from your [Google Scholar profile](https://scholar.google.com). Update them manually whenever they change.

#### Part B — Adding a Paper

Each paper is one object inside the `myPapers` array. Paste the BibTeX directly — the website parses it automatically.

**For a conference paper:**
```js
{
    bibtex: `@INPROCEEDINGS{YourCiteKey,
  author={Last, First and Last2, First2},
  booktitle={2025 Conference Full Name (SHORT)},
  title={Your Paper Title Here},
  year={2025},
  pages={1-6},
  doi={10.XXXX/XXXXXXXX}}`
}
```

**For a journal article:**
```js
{
    bibtex: `@article{YourCiteKey,
  title = {Your Paper Title Here},
  journal = {Journal Full Name},
  volume = {19},
  pages = {100-110},
  year = {2025},
  doi = {10.XXXX/XXXXXXXX},
  author = {First Last and First2 Last2}}`
}
```

> **How the site separates journals from conferences:** It checks if the BibTeX starts with `@article` → goes to **Journal Articles** section. Anything else (`@INPROCEEDINGS`, `@inproceedings`) → goes to **Conference Proceedings**. Papers are automatically sorted by year, newest first.

> **DOI:** If a paper has no DOI yet (e.g., accepted but not published), simply omit the `doi = {...}` line. The DOI button will show but link to `#` harmlessly.

---

### Step 3 — Profile Photo & Images

- Replace `images/formal.png` with your photo. Keep the filename the same, or update the `src` in `index.html`.
- Replace `images/a.png` and `images/b.png` with screenshots from your Google Scholar profile (the "Cited by" interest graph and citation history chart). These appear below your bio.
- Replace `images/favicon-16x16-sq.png` with your own favicon, or remove the `<link rel="icon">` line from `<head>`.

---

### Step 4 — Photo Gallery (`images/gallery/`)

The gallery auto-discovers images — you do not need to edit any code.

**Rules:**
- Name your photos sequentially: `1.jpg`, `2.jpg`, `3.jpg`, ...
- Supported formats: `.jpg`, `.jpeg`, `.png`
- Place them all inside `images/gallery/`
- The gallery stops loading when it finds a missing number, so do not skip numbers

**To add new photos:** Upload them as the next number in the sequence (e.g., if you have `1.jpg` to `5.jpg`, add `6.jpg`).

**To remove a photo:** Remove it and rename the ones after it to fill the gap.

---

### Step 5 — SEO Files

**`robots.txt`** — Update the sitemap URL:
```
Sitemap: https://yourusername.github.io/sitemap.xml
```

**`sitemap.xml`** — Update all URLs from `saadbaust.github.io` to your own domain. Also update the `<lastmod>` date whenever you make major changes.

---

## Deployment

### GitHub Pages (Recommended)

1. Create a repo named exactly `yourusername.github.io` (this is the special name GitHub recognizes).
2. Push all files to the `main` branch.
3. Go to repo **Settings → Pages → Source**, set branch to `main`, folder to `/ (root)`.
4. Your site will be live at `https://yourusername.github.io` within a minute.

### Vercel

1. Import your GitHub repo into [vercel.com](https://vercel.com).
2. No build settings needed — just deploy.
3. Your site will be live at `https://yourusername.vercel.app`.

---

## Features

| Feature | How it works |
|---|---|
| Auto paper sorting | BibTeX year field parsed, sorted newest first |
| Journal/Conference split | Detected from `@article` vs `@inproceedings` BibTeX type |
| BibTeX toggle | Click "BibTeX" under any paper to show/hide the raw entry |
| Scholar metrics | Manually set in `papers.js` → displayed in animated counters |
| Gallery | Sequential image discovery — just drop numbered files in the folder |
| Dark mode | Automatic, based on OS/browser preference (`prefers-color-scheme`) |
| Mobile responsive | Sidebar collapses to top nav, hero stacks vertically, gallery goes single column |

---

## Routine Maintenance Checklist

| When | What to update |
|---|---|
| New paper published | Add BibTeX to `myPapers` in `papers.js` |
| Citation count changes | Update `scholarStats` in `papers.js` |
| New gallery photo | Add next numbered image to `images/gallery/` |
| Scholar graphs updated | Replace `images/a.png` and `images/b.png` with new screenshots |

---

## License

Free to use and adapt for personal academic portfolios. Credit appreciated but not required.