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
