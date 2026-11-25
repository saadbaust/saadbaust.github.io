"use strict";

// ── Helpers ─────────────────────────────────────────────────────────────
const $ = (id) => document.getElementById(id);

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
const themeToggle = $("theme-toggle");
function syncThemeColor() {
  const isDark = document.documentElement.classList.contains("dark");
  themeToggle.setAttribute("aria-pressed", String(isDark));
  if (themeColorMeta)
    themeColorMeta.setAttribute("content", isDark ? "#101721" : "#f4f6f9");
}
themeToggle.addEventListener("click", () => {
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

// ── Scroll-spy (IntersectionObserver) ──────────────────────────────────
// The observed root is everything above a line just below the navbar, so a
// section intersects once its top has passed that line. The active link is
// the last such section; at the very bottom of the page the last one
// (Contact) wins even if it is too short to reach the line.
const header = $("site-header");
const navLinks = [...navLinksEl.querySelectorAll('.nav-link[href^="#"]')];
const spyTargets = navLinks
  .map((link) => ({ link, section: $(link.getAttribute("href").slice(1)) }))
  .filter((t) => t.section);
const passed = new Set();
let activeIndex = -1;
let atBottom = false;
let spyObserver = null;

function refreshActive() {
  const index = atBottom
    ? spyTargets.length - 1
    : passed.size
      ? Math.max(...passed)
      : -1;
  if (index === activeIndex) return;
  if (activeIndex >= 0) spyTargets[activeIndex].link.classList.remove("active");
  if (index >= 0) spyTargets[index].link.classList.add("active");
  activeIndex = index;
}
function observeSections(navH, viewportH) {
  if (spyObserver) spyObserver.disconnect();
  passed.clear();
  const bottomMargin = Math.max(0, viewportH - navH - 40);
  spyObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const i = spyTargets.findIndex((t) => t.section === entry.target);
        if (entry.isIntersecting) passed.add(i);
        else passed.delete(i);
      }
      refreshActive();
    },
    { rootMargin: `100000px 0px -${bottomMargin}px 0px` },
  );
  spyTargets.forEach((t) => spyObserver.observe(t.section));
}

// ── Back-to-top + bottom-of-page check (reads first, then writes) ───────
const backToTopBtn = $("back-to-top");
function onScroll() {
  const y = window.scrollY;
  const bottom =
    window.innerHeight + y >= document.documentElement.scrollHeight - 4;
  backToTopBtn.classList.toggle("visible", y > 400);
  if (bottom !== atBottom) {
    atBottom = bottom;
    refreshActive();
  }
}
let scrollTicking = false;
window.addEventListener(
  "scroll",
  () => {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(() => {
      scrollTicking = false;
      onScroll();
    });
  },
  { passive: true },
);
backToTopBtn.addEventListener("click", () => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
});

// ── Layout-dependent setup ──────────────────────────────────────────────
// Sticky profile card: stick just below the navbar if the card fits in the
// window, otherwise use a negative offset so its bottom stays on screen.
// ResizeObserver fires once when observation starts, so there is no
// separate initial call; all reads happen before the write.
const rail = document.querySelector("aside.profile-rail");
let lastNavH = -1;
let lastViewportH = -1;
function updateLayout() {
  const navH = header.offsetHeight;
  const viewportH = window.innerHeight;
  const railH = rail.offsetHeight;
  rail.style.setProperty("--rail-top", `${Math.min(navH, viewportH - railH)}px`);
  if (navH !== lastNavH || viewportH !== lastViewportH) {
    lastNavH = navH;
    lastViewportH = viewportH;
    observeSections(navH, viewportH);
  }
  onScroll();
}
if ("ResizeObserver" in window) {
  const ro = new ResizeObserver(updateLayout);
  ro.observe(rail);
  ro.observe(header);
  ro.observe(document.documentElement);
} else {
  window.addEventListener("load", updateLayout);
}
window.addEventListener("resize", updateLayout, { passive: true });
