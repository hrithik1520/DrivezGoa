// Site-wide Anime.js layer: fluid blobs, image reveals, FAQ, footer, tilt, page transitions.
// Home hero blobs live in hero.js; everything here skips #hx. Transform + opacity only.
import { animate, stagger, onScroll } from "./anime.esm.min.js";

const root = document.documentElement;
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const NS = "http://www.w3.org/2000/svg";
const trig = (target, extra = {}) => onScroll({ target, enter: "bottom-=8% top", repeat: false, ...extra });

/* ---------- 1. Fluid blobs behind page headers and CTA bands ---------- */
const PRESETS = [
  { cx: 260, cy: 300, r: 190, n: 7, dur: 7000, fill: "rgba(240, 68, 0,.5)" },
  { cx: 720, cy: 280, r: 170, n: 6, dur: 9000, fill: "rgba(240, 68, 0,.16)" },
  { cx: 500, cy: 360, r: 210, n: 8, dur: 11000, fill: "rgba(240, 68, 0,.3)" },
];

function blobPath(b) {
  const pts = b.radii.map((r, i) => {
    const a = (i / b.n) * Math.PI * 2;
    return [b.cx + Math.cos(a) * r, b.cy + Math.sin(a) * r];
  });
  const n = pts.length, k = 1 / 6;
  let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
    d += `C${(p1[0] + (p2[0] - p0[0]) * k).toFixed(1)},${(p1[1] + (p2[1] - p0[1]) * k).toFixed(1)} ` +
      `${(p2[0] - (p3[0] - p1[0]) * k).toFixed(1)},${(p2[1] - (p3[1] - p1[1]) * k).toFixed(1)} ` +
      `${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return d + "Z";
}

const blobSets = [];
function addFluid(host, flip) {
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("viewBox", "0 0 1000 600");
  svg.setAttribute("preserveAspectRatio", "xMidYMid slice");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");
  svg.classList.add("pg-fluid");
  const blobs = PRESETS.map((p, i) => {
    const g = document.createElementNS(NS, "g");
    const path = document.createElementNS(NS, "path");
    path.setAttribute("fill", p.fill);
    g.appendChild(path); svg.appendChild(g);
    const cx = flip ? 1000 - p.cx : p.cx;
    const b = { ...p, cx, g, path, radii: Array.from({ length: p.n }, () => p.r * (0.68 + Math.random() * 0.64)), anims: [] };
    path.setAttribute("d", blobPath(b));
    return b;
  });
  host.prepend(svg);
  blobSets.push({ host, blobs, svg, on: false });
  return blobSets[blobSets.length - 1];
}

function morph(set, b) {
  if (!set.on) { b.running = false; return; }
  b.running = true;
  const from = b.radii.slice();
  const to = from.map(() => b.r * (0.68 + Math.random() * 0.64));
  const o = { t: 0 };
  b.anims[0] = animate(o, {
    t: 1, duration: b.dur, ease: "inOutSine",
    onUpdate: () => { b.radii = from.map((v, i) => v + (to[i] - v) * o.t); b.path.setAttribute("d", blobPath(b)); },
    onComplete: () => morph(set, b),
  });
}

function setActive(set, on) {
  if (set.on === on) return;
  set.on = on;
  set.blobs.forEach((b, i) => {
    if (on) {
      if (!b.drift) {
        b.drift = animate(b.g, {
          x: i % 2 ? [30, -30] : [-40, 40], y: i === 1 ? [30, -30] : [-20, 25],
          duration: 8000 + i * 2500, ease: "inOutSine", loop: true, alternate: true,
        });
      } else b.drift.play();
      if (!b.running) morph(set, b);
    } else if (b.drift) b.drift.pause();
  });
}

if (!reduce) {
  const hosts = $$(".page-head, .cta").filter((h) => !h.closest("#hx"));
  hosts.forEach((h, i) => addFluid(h, i % 2 === 1));
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    const s = blobSets.find((x) => x.host === e.target); if (s) setActive(s, e.isIntersecting);
  }), { rootMargin: "80px" });
  blobSets.forEach((s) => io.observe(s.host));
}

/* ---------- 2. Image reveals (scale settle) on cards, banners, article media ---------- */
if (!reduce) {
  $$(".car-img img, .post-body + img, .prose img, .stage img").forEach((img) => {
    if (img.closest("#hx")) return;
    animate(img, { scale: [1.16, 1], duration: 1400, ease: "outExpo", autoplay: trig(img.closest(".car-img, .stage") || img) });
  });
}

/* ---------- 3. FAQ: answer slides in, chevron icon springs ---------- */
if (!reduce) {
  $$(".faq details").forEach((d) => {
    const ans = d.querySelector(".ans"), icon = d.querySelector("summary i");
    d.addEventListener("toggle", () => {
      if (d.open) {
        animate(ans, { opacity: [0, 1], y: [-10, 0], duration: 520, ease: "outExpo" });
        if (icon) animate(icon, { rotate: [0, 45], duration: 420, ease: "outBack" });
      } else if (icon) animate(icon, { rotate: [45, 0], duration: 300, ease: "outQuad" });
    });
  });
}

/* ---------- 4. Stars pop, footer columns rise ---------- */
if (!reduce) {
  $$(".review .stars").forEach((s) => {
    animate(s.children, { scale: [0, 1], rotate: [-30, 0], duration: 600, delay: stagger(70), ease: "outBack", autoplay: trig(s) });
  });
  const fw = document.querySelector(".footer .wrap");
  if (fw) animate(fw.children, { opacity: [0, 1], y: [30, 0], duration: 900, delay: stagger(110), ease: "outExpo", autoplay: trig(fw, { enter: "bottom-=2% top" }) });
}

/* ---------- 5. Card image tilt (inner image only, no clash with card lift) ---------- */
if (!reduce && fine) {
  $$(".car-card").forEach((card) => {
    const box = card.querySelector(".car-img"); if (!box) return;
    card.addEventListener("pointermove", (e) => {
      const r = box.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
      animate(box, { rotateY: px * 7, rotateX: -py * 7, duration: 300, ease: "outQuad" });
    });
    card.addEventListener("pointerleave", () => animate(box, { rotateX: 0, rotateY: 0, duration: 700, ease: "outElastic(1, .7)" }));
  });
}

/* ---------- 6. Nav link hover underline, soft page transitions ---------- */
if (!reduce && fine) {
  $$(".nav-links a:not(.btn)").forEach((a) => {
    a.addEventListener("pointerenter", () => animate(a, { y: [0, -2], duration: 220, ease: "outQuad" }));
    a.addEventListener("pointerleave", () => animate(a, { y: 0, duration: 300, ease: "outQuad" }));
  });
}

if (!reduce) {
  const body = document.body;
  animate(body, { opacity: [0.001, 1], duration: 500, ease: "outQuad" });
  document.addEventListener("click", (e) => {
    if (e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest && e.target.closest("a[href]");
    if (!a || a.target || a.hasAttribute("download")) return;
    const u = new URL(a.href, location.href);
    if (u.origin !== location.origin || u.pathname === location.pathname || !/\.html$|\/$/.test(u.pathname)) return;
    e.preventDefault();
    animate(body, { opacity: 0, duration: 220, ease: "inQuad", onComplete: () => { location.href = u.href; } });
  });
  addEventListener("pageshow", (e) => { if (e.persisted) body.style.opacity = "1"; });
}
