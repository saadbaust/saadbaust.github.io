# Saad Ahmed — Academic Portfolio

Personal academic portfolio website for **Saad Ahmed**, Lecturer at the Department of CSE, Bangladesh Army University of Science and Technology (BAUST).

🌐 **Live site:** [saadbaust.github.io](https://saadbaust.github.io/)

---

## Files in This Project

| File | What it does |
|---|---|
| `index.html` | Main portfolio page (home) |
| `gallery.html` | Photo gallery page |
| `style.css` | All visual styling for both pages |
| `data.js` | Your publications, experience, education, skills — edit this to update content |
| `sitemap.xml` | Helps search engines find your pages |
| `robots.txt` | Tells search engines what to crawl |
| `images/` | Folder for your photos and stat images |

---

## Using This as Your Own Portfolio Template

This template is designed so that **you only need to edit one file** to update almost everything on the site — `data.js`. Here's how to make it yours, step by step.

### Step 1 — Get the files onto your computer

Download or clone this repository to your computer. You'll see the files listed in the table above.

### Step 2 — Replace the profile photo

Go into the `images/` folder and replace `formal.png` with your own photo. Keep the filename the same, or remember to update it in `index.html` if you use a different name. A square or portrait photo works best.

### Step 3 — Update your personal info in `index.html`

Open `index.html` in any text editor (Notepad, VS Code, etc.) and find the following things to change:

- **Your name** — appears in the `<h1>` tag and a few meta tags at the top
- **Your job title and institution** — just below your name
- **Your "About me" paragraph** — inside the `academic-summary` box
- **Your CV link** — replace the Google Drive link with your own
- **Your social media links** — GitHub, LinkedIn, Google Scholar, ResearchGate, YouTube
- **Your contact details** — phone number and email address
- **Your website URL** — search for `saadbaust.github.io` and replace with your own URL throughout the file

### Step 4 — Update your content in `data.js`

This is the main file to edit. Open it and update four things:

**Google Scholar stats** — update your citation count, h-index, and i10-index. You can find these on your Google Scholar profile page.

**Publications** — add or remove entries in the `myPapers` list. Each paper uses BibTeX format, which you can copy directly from Google Scholar or IEEE Xplore by clicking "Cite" on any paper. The site automatically separates journals and conferences for you.

**Experience, education, skills, certifications** — all of these are in the `academicInfo` section. Just edit the text to match your own background. You can add or remove items by copying the pattern you see.

### Step 5 — Add gallery photos (optional)

Open `gallery.html` and find the `galleryImages` list near the bottom. Add your image file paths and descriptions there. Put your images in the `images/` folder first.

### Step 6 — Update the SEO files

Open `sitemap.xml` and `robots.txt` and replace `saadbaust.github.io` with your own website URL. Also update the `lastmod` date in the sitemap whenever you make changes.

In `index.html` and `gallery.html`, search for `saadbaust.github.io` at the top of the file (in the meta tags) and replace those with your own URL too.

### Step 7 — Publish it

The easiest free way to host this is **GitHub Pages**:

1. Create a free account at [github.com](https://github.com) if you don't have one
2. Create a new repository named `yourusername.github.io`
3. Upload all your files into it
4. Go to the repository Settings → Pages → set source to the main branch
5. Your site will be live at `https://yourusername.github.io` within a few minutes

---

## Keeping It Updated

Whenever you publish a new paper, just open `data.js`, paste in the BibTeX, and push the changes. The site updates automatically. Same for adding a new job or updating your citation count — it all lives in `data.js`.

---

## Dark Mode

The site automatically switches to a dark theme if the visitor's device is set to dark mode. No extra setup needed.

---

## Credits

Built and designed by [Saad Ahmed](https://saadbaust.github.io/). Free to use as a personal academic portfolio template.
