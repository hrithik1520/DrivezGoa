/* scroll.js — site-wide GSAP ScrollTrigger layer.
   Owns scrubbed/scroll-linked motion; Anime.js (motion.js/flow.js) owns
   entrances and micro-interactions. #hx internals belong to hero.js. */
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

function init() {
  if (reduce || !window.gsap || !window.ScrollTrigger) return;
  const g = window.gsap;
  g.registerPlugin(window.ScrollTrigger);

  /* Scrubbed parallax: data-parallax="depth" drifts against its section */
  document.querySelectorAll("[data-parallax]").forEach((el) => {
    const d = parseFloat(el.dataset.parallax) || 60;
    const host = el.closest("section") || el;
    g.fromTo(el, { y: d }, {
      y: -d, ease: "none",
      scrollTrigger: { trigger: host, start: "top bottom", end: "bottom top", scrub: true },
    });
  });

  /* Reading progress bar (articles) */
  const bar = document.querySelector(".progress");
  if (bar) {
    g.fromTo(bar, { scaleX: 0 }, {
      scaleX: 1, ease: "none", transformOrigin: "0 50%",
      scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: true },
    });
  }

  /* Page heads: content drifts up and softens as the head scrolls away */
  document.querySelectorAll(".page-head .wrap").forEach((w) => {
    g.to(w, {
      yPercent: -14, opacity: 0.35, ease: "none",
      scrollTrigger: { trigger: w.closest(".page-head"), start: "top top", end: "bottom top", scrub: true },
    });
  });

  /* Article hero image: slow inner parallax (image oversized to avoid gaps) */
  document.querySelectorAll(".article-hero img").forEach((img) => {
    g.set(img, { scale: 1.15 });
    g.fromTo(img, { yPercent: -7 }, {
      yPercent: 7, ease: "none",
      scrollTrigger: { trigger: img.closest(".article-hero"), start: "top bottom", end: "bottom top", scrub: true },
    });
  });

  /* Gallery stage scrub intentionally omitted: flow.js owns .stage img
     (anime scale-settle reveal) — two writers on one transform fight. */

  /* CTA band: settles from a slight scale as it enters */
  document.querySelectorAll(".cta").forEach((s) => {
    g.fromTo(s, { scale: 0.965, opacity: 0.6 }, {
      scale: 1, opacity: 1, ease: "none",
      scrollTrigger: { trigger: s, start: "top 92%", end: "top 45%", scrub: true },
    });
  });

  /* Banner copy: counter-drift against the giant word for depth */
  document.querySelectorAll(".banner .banner-copy").forEach((c) => {
    g.fromTo(c, { y: 40 }, {
      y: -40, ease: "none",
      scrollTrigger: { trigger: c.closest(".banner"), start: "top bottom", end: "bottom top", scrub: true },
    });
  });

  /* Section dividers: eyebrow-led blocks get a subtle horizontal rule wipe */
  document.querySelectorAll(".section .wrap > .eyebrow").forEach((e) => {
    g.from(e, {
      x: -24, autoAlpha: 0, duration: 0.7, ease: "power2.out",
      scrollTrigger: { trigger: e, start: "top 88%", toggleActions: "play none none none" },
    });
  });

  /* Recalculate after images settle */
  addEventListener("load", () => window.ScrollTrigger.refresh(), { once: true });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}
