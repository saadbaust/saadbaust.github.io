"use strict";

// ── Helpers ─────────────────────────────────────────────────────────────
const $ = (id) => document.getElementById(id);

// Escape HTML special characters so CMS / BibTeX text can't inject markup.
function escapeHtml(s) {
  return String(s == null ? "" : s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
  );
}

// Only allow http(s) links from data files (blocks javascript: URLs).
function safeUrl(url) {
  const u = typeof url === "string" ? url.trim() : "";
  return /^https?:\/\//i.test(u) ? u : "";
}

// localStorage can throw (private mode / blocked storage) — never let it
// break the page.
function storeTheme(value) {
  try {
    localStorage.setItem("theme", value);
  } catch (e) {}
}

// ── Theme toggle ────────────────────────────────────────────────────────
// Dark mode is manual only (saved choice applied in <head> before paint).
const themeColorMeta = $("theme-color-meta");
function syncThemeColor() {
  const isDark = document.documentElement.classList.contains("dark");
  if (themeColorMeta)
    themeColorMeta.setAttribute("content", isDark ? "#0b0f19" : "#f8f9fd");
}
$("theme-toggle").addEventListener("click", () => {
  const isDark = document.documentElement.classList.toggle("dark");
  storeTheme(isDark ? "dark" : "light");
  syncThemeColor();
});
syncThemeColor();

// ── Mobile navigation (hamburger dropdown) ─────────────────────────────
const hamburger = $("nav-hamburger");
const navLinksEl = $("nav-links");
function setMenu(open) {
  navLinksEl.classList.toggle("open", open);
  hamburger.setAttribute("aria-expanded", String(open));
}
hamburger.addEventListener("click", () =>
  setMenu(!navLinksEl.classList.contains("open")),
);
navLinksEl.addEventListener("click", (e) => {
  if (e.target.closest("a")) setMenu(false);
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navLinksEl.classList.contains("open")) {
    setMenu(false);
    hamburger.focus();
  }
});
document.addEventListener("click", (e) => {
  if (
    navLinksEl.classList.contains("open") &&
    !e.target.closest(".top-navbar")
  )
    setMenu(false);
});

// ── Scroll-spy + back-to-top (one rAF-throttled scroll handler) ─────────
// The active link is the last nav-linked section whose top has passed
// just below the navbar; at the very bottom of the page the last one
// (Contact) wins even if it is too short to reach the top.
const navLinks = [...navLinksEl.querySelectorAll('.nav-link[href^="#"]')];
const spyTargets = navLinks
  .map((link) => ({ link, section: $(link.getAttribute("href").slice(1)) }))
  .filter((t) => t.section);
const backToTopBtn = $("back-to-top");
let activeLink = null;

function onScroll() {
  backToTopBtn.classList.toggle("visible", window.scrollY > 400);

  const offset = $("site-header").offsetHeight + 40;
  const atBottom =
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 4;
  let current = null;
  if (atBottom && spyTargets.length) {
    current = spyTargets[spyTargets.length - 1].link;
  } else {
    for (const t of spyTargets) {
      if (t.section.getBoundingClientRect().top - offset <= 0) current = t.link;
    }
  }
  if (current !== activeLink) {
    if (activeLink) activeLink.classList.remove("active");
    if (current) current.classList.add("active");
    activeLink = current;
  }
}
let scrollTicking = false;
function requestScrollUpdate() {
  if (scrollTicking) return;
  scrollTicking = true;
  requestAnimationFrame(() => {
    scrollTicking = false;
    onScroll();
  });
}
// Sticky profile card: stick just below the navbar if the card fits in the
// window, otherwise use a negative offset so its bottom stays on screen.
const rail = document.querySelector("aside.profile-rail");
function updateRailTop() {
  const navH = $("site-header").offsetHeight;
  const top = Math.min(navH, window.innerHeight - rail.offsetHeight);
  rail.style.setProperty("--rail-top", `${top}px`);
}
if ("ResizeObserver" in window) new ResizeObserver(updateRailTop).observe(rail);
window.addEventListener("resize", updateRailTop, { passive: true });
updateRailTop();

window.addEventListener("scroll", requestScrollUpdate, { passive: true });
window.addEventListener("resize", requestScrollUpdate, { passive: true });
backToTopBtn.addEventListener("click", () => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
});
onScroll();

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PUBLICATIONS: BibTeX parsing + rendering (publications.bib)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Strip wrapping braces/quotes, unescape common LaTeX, collapse spaces.
function cleanBibValue(val) {
  if (!val) return "";
  return val
    .replace(/^\s*[{"]|[}"]\s*$/g, "")
    .replace(/\\([&%$#_])/g, "$1")
    .replace(/[{}]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// Parse BibTeX into [{type, key, field: value, …}]. Each entry runs
// until a line that starts with "}"; values may span several lines.
function parseBibtex(text) {
  const entries = [];
  const entryRegex = /@([a-zA-Z]+)\s*\{\s*([^,]+),([^]*?)\n\s*\}/g;
  const fieldRegex =
    /(?:^|\n)[ \t]*([a-zA-Z0-9_\-]+)[ \t]*=\s*([^]*?)(?=\n[ \t]*[a-zA-Z0-9_\-]+[ \t]*=|$)/g;
  let match;
  while ((match = entryRegex.exec(text)) !== null) {
    const fields = {};
    let f;
    fieldRegex.lastIndex = 0;
    while ((f = fieldRegex.exec(match[3])) !== null) {
      const value = f[2].trim().replace(/,$/, "").trim();
      fields[f[1].toLowerCase()] = cleanBibValue(value);
    }
    entries.push({
      ...fields,
      type: match[1].toLowerCase(),
      key: match[2].trim(),
    });
  }
  return entries;
}

// The site owner's name, matched case-insensitively in author lists.
const MY_NAME = "saad ahmed";

// BibTeX author field → ["First Last", …] ("Last, First" is reordered).
function splitAuthors(authorStr) {
  if (!authorStr) return [];
  return authorStr.split(/\s+and\s+/i).map((raw) => {
    const parts = raw.split(",").map((p) => p.trim()).filter(Boolean);
    return parts.length > 1 ? parts.slice(1).concat(parts[0]).join(" ") : raw.trim();
  });
}
const isMe = (name) => name.toLowerCase().includes(MY_NAME);

// Author line with the site owner in bold + brand colour.
function formatAuthors(names) {
  const html = names.map((n) =>
    isMe(n) ? `<strong class="me">${escapeHtml(n)}</strong>` : escapeHtml(n),
  );
  return html.length > 1
    ? html.slice(0, -1).join(", ") + " and " + html[html.length - 1]
    : html[0] || "";
}

const pubLink = (e) => safeUrl(e.url) || (e.doi ? `https://doi.org/${e.doi}` : "");

// Short venue names, like a CV. An optional `venue = {…}` field in an
// entry always wins (e.g. venue = {Under review, Data in Brief}).
const isIeee = (e) => /\bIEEE\b/.test(e.booktitle || "") || /^10\.1109\//.test(e.doi || "");

// "2026 IEEE 2nd International Conference on … (QPAIN)" → "IEEE QPAIN"
function conferenceVenue(c) {
  if (c.venue) return c.venue;
  const m = /\(([^()]+)\)\s*$/.exec(c.booktitle || "");
  if (!m) return c.booktitle || "Conference";
  return (isIeee(c) ? "IEEE " : "") + m[1].trim();
}

// arXiv entries → "arXiv preprint"
function preprintVenue(p) {
  if (p.venue) return p.venue;
  const server = p.archiveprefix || (p.eprint ? "arXiv" : "");
  return server ? `${server} preprint` : p.howpublished || "Preprint";
}

// Render one publication list as a numbered <ol>:
//   "Title"                              Year
//   Authors [FIRST AUTHOR]
//   Venue
// Returns false when the list is empty.
function renderPubList(containerId, items, venue, untitled) {
  const c = $(containerId);
  if (!c || !items.length) return false;
  c.innerHTML = `<ol class="pub-list">${items
    .map((p) => {
      const link = pubLink(p);
      const title = escapeHtml(p.title || untitled);
      const authors = splitAuthors(p.author);
      // Automatic badge when the site owner is listed first.
      const firstAuthor =
        authors.length && isMe(authors[0])
          ? ' <span class="pub-meta-badge">First author</span>'
          : "";
      return `
        <li class="pub-item">
          <div class="pub-head">
            <h4 class="pub-title">"${
              link
                ? `<a href="${escapeHtml(link)}" target="_blank" rel="noopener noreferrer">${title}</a>`
                : title
            }"</h4>
            ${p.year ? `<span class="pub-year">${escapeHtml(p.year)}</span>` : ""}
          </div>
          <p class="pub-authors">${formatAuthors(authors)}${firstAuthor}</p>
          <p class="pub-venue">${escapeHtml(venue(p))}</p>
        </li>`;
    })
    .join("")}</ol>`;
  return true;
}

async function loadPublications() {
  try {
    const res = await fetch("publications.bib", { cache: "no-cache" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text =
      (await res.text())
        .replace(/\r\n?/g, "\n") // normalise line endings
        .replace(/(^|[^\\])%[^\n]*/g, "$1") + // strip % comments
      "\n\n";
    const db = parseBibtex(text);

    const byYearDesc = (a, b) => (Number(b.year) || 0) - (Number(a.year) || 0);
    const isPreprint = (e) =>
      Boolean(
        e.eprint ||
          e.archiveprefix ||
          e.primaryclass ||
          /arxiv\.org/i.test(e.url || "") ||
          /arxiv|preprint/i.test(e.howpublished || ""),
      );
    const pick = (fn) => db.filter(fn).sort(byYearDesc);

    const journals = pick((e) => e.type === "article");
    const conferences = pick((e) => e.type === "inproceedings");
    const preprints = pick((e) => e.type === "misc" && isPreprint(e));
    // @dataset, plus legacy non-preprint @misc entries.
    const datasets = pick(
      (e) => e.type === "dataset" || (e.type === "misc" && !isPreprint(e)),
    );

    if (!renderPubList("journal-container", journals, (j) => j.venue || j.journal || "Journal", "Untitled Journal Paper"))
      $("journal-container").innerHTML =
        '<p class="empty-note">Journal records will appear here upon publication.</p>';
    if (!renderPubList("conference-container", conferences, conferenceVenue, "Untitled Conference Paper"))
      $("conference-container").innerHTML =
        '<p class="empty-note">Conference records will appear here upon publication.</p>';
    $("preprints-section").hidden = !renderPubList(
      "preprint-container", preprints, preprintVenue, "Untitled Preprint",
    );
    $("datasets-section").hidden = !renderPubList(
      "dataset-container", datasets, (d) => d.venue || d.publisher || "Dataset", "Untitled Dataset",
    );
  } catch (err) {
    console.error("Could not load publications.bib:", err);
    $("journal-container").innerHTML =
      '<p class="empty-note">Publications could not be loaded right now. ' +
      'See the full list on <a href="https://scholar.google.com/citations?user=QFARjNcAAAAJ" target="_blank" rel="noopener noreferrer">Google Scholar</a>.</p>';
    $("conference-container").innerHTML = "";
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CMS DATA: data.json (profile → thesis) + content.json (activities →
// awards). Each renderer keeps the static HTML if its data is missing.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const hasItems = (list) => Array.isArray(list) && list.length > 0;

// Fill a container with one HTML string per list item.
function renderList(id, list, toHtml) {
  const c = $(id);
  if (c && hasItems(list)) c.innerHTML = list.map(toHtml).join("");
}

const bulletItem = (text) => `<li class="academic-list-item">${escapeHtml(text)}</li>`;

function timelineItem(title, duration, org, extra) {
  return `
    <div class="timeline-item">
      <div class="timeline-header">
        <h3 class="timeline-title">${escapeHtml(title || "")}</h3>
        ${duration ? `<span class="timeline-duration">${escapeHtml(duration)}</span>` : ""}
      </div>
      ${org ? `<p class="timeline-org">${org}</p>` : ""}
      ${extra || ""}
    </div>`;
}

// [n] indexed row (ongoing co-supervisions).
function indexedRow(idx, { title, year, note, badge, footer, level = 3 }) {
  return `
    <div class="pub-row-item">
      <span class="pub-row-idx">
        <span class="pub-idx-num">[${idx + 1}]</span>
        ${year ? `<span class="pub-idx-year">${escapeHtml(year)}</span>` : ""}
      </span>
      <div class="pub-row-content">
        <h${level} class="pub-title">${escapeHtml(title || "")}</h${level}>
        ${note ? `<p class="pub-authors">${escapeHtml(note)}</p>` : ""}
        ${badge ? `<p class="pub-venue"><span class="pub-meta-badge">${escapeHtml(badge)}</span></p>` : ""}
        ${footer ? `<p class="pub-venue"><span>${escapeHtml(footer)}</span></p>` : ""}
      </div>
    </div>`;
}

// Numbered list in the same style as Publications (Research Projects,
// Thesis):  1. Title                                   Year
//              Details / description [BADGE]
function renderNumberedList(id, list, toItem) {
  const c = $(id);
  if (!c || !hasItems(list)) return;
  c.innerHTML = `<ol class="pub-list">${list
    .map((raw) => {
      const { title, year, note, badge } = toItem(raw);
      const badgeHtml = badge ? ` <span class="pub-meta-badge">${escapeHtml(badge)}</span>` : "";
      return `
        <li class="pub-item">
          <div class="pub-head">
            <h3 class="pub-title">${escapeHtml(title || "")}</h3>
            ${year ? `<span class="pub-year">${escapeHtml(year)}</span>` : ""}
          </div>
          ${note || badge ? `<p class="pub-authors">${escapeHtml(note || "")}${badgeHtml}</p>` : ""}
        </li>`;
    })
    .join("")}</ol>`;
}

function renderProfile(p) {
  if (!p) return;
  for (const [id, val] of [
    ["profile-subtitle", p.subtitle],
    ["profile-institution", p.institution],
    ["profile-target", p.target],
  ]) {
    if (val) $(id).textContent = val;
  }
}

function renderAbout(a) {
  if (!a) return;
  // Escaped text with **bold** markers turned into <strong>.
  if (a.paragraph)
    $("about-p1").innerHTML = escapeHtml(a.paragraph).replace(
      /\*\*(.+?)\*\*/g,
      "<strong>$1</strong>",
    );
  renderList("about-interests", a.interests, (i) => `<li>${escapeHtml(i)}</li>`);
}

function renderCoSupervisions(ongoing, completed) {
  ongoing = hasItems(ongoing) ? ongoing : [];
  completed = hasItems(completed) ? completed : [];
  if (!ongoing.length && !completed.length) return;
  let html = "";
  if (ongoing.length) {
    html +=
      '<h4 class="cosup-status-title">Ongoing</h4>' +
      ongoing
        .map((o, i) => indexedRow(i, { title: o.title, footer: o.timeframe, level: 5 }))
        .join("");
  }
  if (completed.length) {
    html +=
      '<h4 class="cosup-status-title">Completed</h4>' +
      `<ul class="academic-list">${completed.map(bulletItem).join("")}</ul>`;
  }
  $("cosupervision-container").innerHTML = html;
}

function devProjectItem(p) {
  const name = escapeHtml(p.name || "");
  const url = safeUrl(p.url);
  return `
    <div class="simple-entry">
      <h3 class="simple-entry-title">${
        url
          ? `<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${name}</a>`
          : name
      }</h3>
      ${p.description ? `<p class="simple-entry-desc">${escapeHtml(p.description)}</p>` : ""}
      ${p.tools ? `<p class="simple-entry-meta"><span class="meta-label">Tools:</span> ${escapeHtml(p.tools)}</p>` : ""}
    </div>`;
}

async function fetchJson(url) {
  try {
    const res = await fetch(url, { cache: "no-cache" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error(`Could not load ${url}:`, err);
    return {};
  }
}

async function loadData() {
  // Fetched in parallel; a failure in one file doesn't affect the other.
  const [primary, extra] = await Promise.all([
    fetchJson("data.json"),
    fetchJson("content.json"),
  ]);
  const data = { ...primary, ...extra };

  renderProfile(data.profile);
  renderAbout(data.about);
  renderList("experience-container", data.experience, (e) =>
    timelineItem(
      e.title,
      e.duration,
      [e.org, e.location].filter(Boolean).map(escapeHtml).join(" &middot; "),
      hasItems(e.bullets)
        ? `<ul class="job-desc-list">${e.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join("")}</ul>`
        : "",
    ),
  );
  renderList("education-container", data.education, (e) =>
    timelineItem(
      e.degree,
      e.duration,
      e.school ? escapeHtml(e.school) : "",
      e.grade ? `<p class="edu-grade">${escapeHtml(e.grade)}</p>` : "",
    ),
  );
  renderNumberedList("projects-container", data.researchProjects, (p) => ({
    title: p.title, year: p.duration || p.year, note: p.meta, badge: p.status,
  }));
  renderNumberedList("thesis-container", data.thesis, (t) => ({
    title: t.title, year: t.duration || t.year, note: t.description,
  }));
  renderList("review-conferences-container", data.reviewConferences, bulletItem);
  renderList("review-journals-container", data.reviewJournals, bulletItem);
  renderCoSupervisions(data.coSupervisionsOngoing, data.coSupervisionsCompleted);
  renderList("teaching-container", data.courses, (c) =>
    `<tr><td class="course-code">${escapeHtml(c.code)}</td><td>${escapeHtml(c.title)}</td><td>${escapeHtml(c.semesters)}</td></tr>`,
  );
  renderList("leadership-container", data.leadership, bulletItem);
  renderList("dev-projects-container", data.devProjects, devProjectItem);
  renderList("awards-container", data.awards, bulletItem);

  requestScrollUpdate(); // section heights may have changed
}

$("footer-year").textContent = new Date().getFullYear();
Promise.all([loadPublications(), loadData()]).then(() => {
  // Content above the target may have grown while loading, so re-apply
  // a deep link such as /#publications once everything is rendered.
  const target = location.hash && document.getElementById(location.hash.slice(1));
  if (target) target.scrollIntoView({ behavior: "instant" });
  requestScrollUpdate();
});
