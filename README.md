# Saad Ahmed — Academic Portfolio

A static, single-page academic portfolio for Saad Ahmed, Lecturer in CSE at BAUST.

## Editing

All portfolio content lives in `index.html`. Edit it directly (or with AI) and push to `main`. Publications are grouped into Journal Articles, Conference Papers, Under Review, and Datasets; maintain newest-first order within each group. Published journal and conference papers are also listed as `ScholarlyArticle` entries in the JSON-LD in the page head; update those entries when publications change.

Update the page's description, social metadata, and Person JSON-LD when relevant profile details change. Keep the profile image references and dimensions in sync if replacing the photo.

`style.css` contains the responsive layout and light/dark styles. `main.js` handles the theme, navigation, scroll highlighting, and back-to-top button; the content is readable without JavaScript.

## Preview and deployment

Run a local static server from the repository directory:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`. Pushing to `main` publishes the site on GitHub Pages. `.github/workflows/deploy.yml` supports GitHub Actions deployment and stamps the deployment date in `sitemap.xml` and the page's JSON-LD `dateModified`; configure the Pages source as **GitHub Actions** to use it. If Pages is configured to deploy from the branch instead, the site is published without automatic date stamping.

The site uses self-hosted Poppins fonts in `fonts/` and profile images in `images/`. `robots.txt` and `sitemap.xml` provide crawler and sitemap information.
