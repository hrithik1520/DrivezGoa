// Anime.js v4 motion layer. Transform + opacity only. Loaded as a module.
import { animate, createTimeline, stagger, onScroll, splitText, svg, utils } from "./anime.esm.min.js";

window.__motionReady = true;
const root = document.documentElement;
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

if (reduce) { root.classList.add("rm"); } else { init(); }

function scrollTrigger(target, extra = {}) {
  return onScroll({ target, enter: "bottom-=8% top", repeat: false, ...extra });
}

function init() {
  /* Split headings: words rise out of a clip mask */
  const heroHeads = [];
  $$("[data-split]").forEach((el) => {
    const inHero = !!el.closest(".hero");
    const split = splitText(el, { words: { wrap: "clip" } });
    el.classList.add("is-split");
    if (inHero) { heroHeads.push(split.words); return; }
    animate(split.words, {
      y: ["110%", "0%"], duration: 900, delay: stagger(60), ease: "outExpo",
      autoplay: scrollTrigger(el),
    });
  });

  /* Hero intro */
  /* Home hero (#hx) is driven by hero.js, which also animates the nav in */
  if (!document.getElementById("hx")) {
    const tl = createTimeline({ defaults: { ease: "outExpo" } });
    heroHeads.forEach((w) => tl.add(w, { y: ["110%", "0%"], duration: 900, delay: stagger(70) }, 120));
    tl.add("[data-hero]", { opacity: [0, 1], y: [24, 0], duration: 800, delay: stagger(90) }, 200)
      .add(".nav", { opacity: [0, 1], y: [-20, 0], duration: 700 }, 200);
  }

  /* Generic reveals */
  $$("[data-reveal]").forEach((el) => {
    animate(el, { opacity: [0, 1], y: [34, 0], duration: 850, ease: "outExpo", autoplay: scrollTrigger(el) });
  });

  /* Staggered children */
  $$("[data-stagger]").forEach((wrap) => {
    animate(wrap.children, {
      opacity: [0, 1], y: [40, 0], duration: 850, delay: stagger(80), ease: "outExpo",
      autoplay: scrollTrigger(wrap),
    });
  });

  /* Count-up */
  $$("[data-count]").forEach((el) => {
    const end = parseFloat(el.dataset.count);
    const dec = parseInt(el.dataset.decimals || "0", 10);
    const suf = el.dataset.suffix || "";
    const o = { v: 0 };
    animate(o, {
      v: end, duration: 1800, ease: "outExpo",
      onUpdate: () => { el.textContent = o.v.toFixed(dec) + suf; },
      autoplay: scrollTrigger(el),
    });
  });

  /* SVG line drawing */
  $$("[data-draw]").forEach((el) => {
    const paths = svg.createDrawable($$("path, line, circle, rect", el));
    animate(paths, { draw: ["0 0", "0 1"], duration: 1600, delay: stagger(140), ease: "inOutQuad", autoplay: scrollTrigger(el) });
  });

  /* Parallax + reading progress are owned by js/scroll.js (GSAP ScrollTrigger) */

  /* Marquee */
  $$(".marquee-track").forEach((t) => {
    animate(t, { x: ["0%", "-50%"], duration: 38000, ease: "linear", loop: true });
  });

  /* Timeline line draw on About */
  $$(".tl i").forEach((el) => {
    animate(el, { scale: [0.6, 1], opacity: [0, 1], duration: 700, ease: "outBack", autoplay: scrollTrigger(el) });
  });

  /* Floating WhatsApp: entrance + pulse */
  const wa = document.querySelector(".wa-float");
  if (wa) {
    animate(wa, { scale: [0, 1], opacity: [0, 1], duration: 800, delay: 1200, ease: "outBack" });
    animate(".wa-pulse", { scale: [1, 1.5], opacity: [0.6, 0], duration: 2200, delay: 2200, loop: true, ease: "outQuad" });
  }

  /* Hover micro-interactions (fine pointers only) */
  if (fine) {
    $$(".car-card, .post-card").forEach((c) => {
      c.addEventListener("pointerenter", () => animate(c, { y: -8, duration: 280, ease: "outQuart" }));
      c.addEventListener("pointerleave", () => animate(c, { y: 0, duration: 380, ease: "outQuart" }));
    });
    $$(".btn-gold, .btn-wa, .wa-float").forEach((b) => {
      b.addEventListener("pointermove", (e) => {
        const r = b.getBoundingClientRect();
        animate(b, { x: (e.clientX - r.left - r.width / 2) * 0.14, y: (e.clientY - r.top - r.height / 2) * 0.22, duration: 220, ease: "outQuad" });
      });
      b.addEventListener("pointerleave", () => animate(b, { x: 0, y: 0, duration: 500, ease: "outElastic(1, .6)" }));
    });
  }


  /* Events from app.js */
  document.addEventListener("menu:open", () => {
    animate(".menu a", { opacity: [0, 1], y: [30, 0], duration: 700, delay: stagger(60, { start: 120 }), ease: "outExpo" });
  });
  document.addEventListener("gallery:change", (e) => {
    animate(e.detail.img, { opacity: [0, 1], scale: [1.04, 1], duration: 600, ease: "outQuart" });
  });
  document.addEventListener("filter:change", () => {
    const vis = $$(".fleet .car-card:not([hidden])");
    animate(vis, { opacity: [0, 1], y: [24, 0], duration: 600, delay: stagger(60), ease: "outExpo" });
  });
}
