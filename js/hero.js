// Product-style hero: finish swap, tilt, rolling numbers, light sweep, gallery. Anime.js v4.
import { animate, createTimeline, stagger, utils } from "./anime.esm.min.js";
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
const hx = $("#hx"); if (!hx) throw 0;
const car = $("#hx-car"), tilt = $("#hx-tilt"), sheen = $(".hx-sheen"), stage = $("#hx-stage");
const NAME = "Mini Cooper Convertible", RATE = 17000, CHAUF = 3500;
const finishes = [{ word: "Ember", tint: "240,68,0" }, { word: "Lime", tint: "208,240,48" }, { word: "Sun", tint: "255,217,26" }];
const state = { mode: 0, days: 2, c: 0, shown: 0 };
const fmt = (n) => Math.round(n).toLocaleString("en-IN");
const total = () => (RATE + (state.mode ? CHAUF : 0)) * state.days;
const priceEl = $("#hx-price");
const select = (btns, el) => btns.forEach((b) => b.setAttribute("aria-checked", String(b === el)));

function roll() {
  const to = total(), from = state.shown, o = { v: from };
  state.shown = to;
  if (reduce) { priceEl.textContent = fmt(to); return; }
  animate(o, { v: to, duration: 600, ease: "outExpo", onUpdate: () => (priceEl.textContent = fmt(o.v)) });
}
function sub() {
  $("#hx-sub").textContent = `₹${fmt(RATE + (state.mode ? CHAUF : 0))} per day${state.mode ? " incl. chauffeur (8 h)" : ""} · ${NAME}`;
  $("#hx-note").textContent = state.mode ? "Chauffeur ₹3,500 per 8 hours · no 2-day minimum" : "2-day minimum · fuel and tolls extra";
  const msg = `Hi, I want to book the ${NAME}.\nMode: ${state.mode ? "With chauffeur" : "Self-drive"}\nDays: ${state.days}\nEstimate: ₹${fmt(total())}`;
  $("#hx-book").href = `https://wa.me/919518710841?text=${encodeURIComponent(msg)}`;
}
function sweep() {
  if (reduce) return;
  animate(sheen, { opacity: [0, 1, 0], x: ["-70%", "70%"], duration: 1100, ease: "inOutQuad" });
}
function setTint(i) { hx.style.setProperty("--tint", finishes[i].tint); }
function swapCar(i) {
  setTint(i);
  if (reduce) return;
  createTimeline().add(car, { y: [0, "-14%"], rotate: [0, -3], opacity: [1, 0], duration: 320, ease: "inQuad" })
    .add(car, { y: ["14%", 0], rotate: [3, 0], opacity: [0, 1], duration: 700, ease: "outBack(1.3)", onBegin: sweep });
}

$$("[data-mode]").forEach((b) => b.addEventListener("click", () => { state.mode = +b.dataset.mode; select($$("[data-mode]"), b); sub(); roll(); }));
$$("[data-days]").forEach((b) => b.addEventListener("click", () => { state.days = +b.dataset.days; select($$("[data-days]"), b); sub(); roll(); }));
$$("[data-c]").forEach((b) => b.addEventListener("click", () => { if (+b.dataset.c === state.c) return; state.c = +b.dataset.c; select($$("[data-c]"), b); swapCar(state.c); }));
sub(); state.shown = total(); priceEl.textContent = fmt(state.shown);

/* intro */
if (!reduce) {
  const tl = createTimeline({ defaults: { ease: "outExpo" } });
  tl.add(car, { opacity: [0, 1], y: ["18%", 0], scale: [.92, 1], duration: 1200 }, 0)
    .add(".hx-info > *", { opacity: [0, 1], y: [24, 0], duration: 800, delay: stagger(90) }, 150)
    .add(".hx-buy > *", { opacity: [0, 1], y: [24, 0], duration: 700, delay: stagger(70) }, 350)
    .add(".nav", { opacity: [0, 1], y: [-20, 0], duration: 700 }, 200);
  tl.then(() => sweep());
  /* idle float, paused off-screen */
  const fl = animate(tilt, { y: [0, -10], duration: 2600, ease: "inOutSine", alternate: true, loop: true, autoplay: false });
  new IntersectionObserver(([e]) => (e.isIntersecting ? fl.play() : fl.pause())).observe(hx);
  /* pointer tilt + glow */
  if (fine) {
    stage.addEventListener("pointermove", (e) => {
      const r = stage.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      animate(car, { rotateY: x * 10, rotateX: -y * 6, duration: 450, ease: "outQuad" });
    });
    stage.addEventListener("pointerleave", () => animate(car, { rotateY: 0, rotateX: 0, duration: 700, ease: "outExpo" }));
  }
}

/* cinematic loop: 10s, three photographic layers, seamless (ends exactly where it starts) */
const L = $$(".hx-layer", tilt), dots = $$("#hx-dots button"), pp = $("#hx-pp"), live = $("#hx-live");
const names = ["front three-quarter", "side profile", "top view"], starts = [0, 3600, 7000];
const HIDDEN = "inset(-10% 100% -70% 0)", SHOWN = "inset(-10% 0% -70% 0)";
let loop = null, paused = false, hover = false, cur = 0;
function mark(i, say) {
  if (i === cur) return; cur = i;
  dots.forEach((d, k) => d.setAttribute("aria-current", String(k === i)));
  if (say) live.textContent = "Slide " + (i + 1) + " of 3: " + names[i];
}
if (!reduce) {
  const makeLoop = () => {
    const tl = createTimeline({ loop: true, defaults: { ease: "inOutSine" }, autoplay: true });
    /* sequential handoffs: the outgoing photo fully exits before the incoming one
       enters, so two transparent car cutouts are never visible at the same time */
    tl.add(L[0], { scale: [1, 1.06], duration: 3500, ease: "linear" }, 0)          /* slow push-in */
      .call(sweep, 700)                                                            /* light across the bonnet */
      .add(L[0], { opacity: [1, 0], x: [0, 26], duration: 380, ease: "inQuad" }, 3120)  /* exit right */
      .add(L[1], { opacity: [0, 1], duration: 350, ease: "outQuad" }, 3500)
      .add(L[1], { clipPath: [HIDDEN, SHOWN], x: [-36, 0], duration: 900, ease: "outQuart" }, 3500) /* wipe against empty backdrop */
      .add(L[1], { scale: [1, 1.035], duration: 3000, ease: "linear" }, 3500)
      .add(L[1], { opacity: [1, 0], duration: 380, ease: "inQuad" }, 6520)         /* exit */
      .add(L[2], { opacity: [0, 1], scale: [1.08, 1], duration: 700, ease: "outQuad" }, 6900) /* soft settle */
      .add(L[1], { clipPath: [SHOWN, HIDDEN], scale: [1.035, 1], duration: 1, ease: "linear" }, 7650) /* reset while hidden */
      .add(L[2], { opacity: [1, 0], duration: 380, ease: "inQuad" }, 9240)         /* exit */
      .add(L[0], { x: [26, 0], scale: [1.06, 1], duration: 1, ease: "linear" }, 9610) /* reset while hidden */
      .add(L[0], { opacity: [0, 1], duration: 379, ease: "outQuad" }, 9620)        /* back to frame one */
      .add({ t: 0 }, { t: 1, duration: 1 }, 9999);                                 /* pad to exactly 10s */
    tl.onUpdate = () => { const t = tl.currentTime; mark(t >= 6900 && t < 9620 ? 2 : t >= 3500 && t < 6900 ? 1 : 0, false); };
    return tl;
  };
  /* baseline = exact pre-loop state; forward seeks from 0 on a fresh timeline are deterministic */
  const baseline = () => {
    utils.set(L[0], { opacity: 1, scale: 1, x: 0 });
    utils.set(L[1], { opacity: 0, clipPath: HIDDEN, x: 0, scale: 1 });
    utils.set(L[2], { opacity: 0, scale: 1 });
  };
  baseline();
  loop = makeLoop();
  const arm = () => { if (!loop) return; (paused || hover || document.hidden) ? loop.pause() : loop.play(); };
  /* Note: anime v4 "replace" tween composition makes backward seeks on a live looping
     timeline unreliable (later tweens keep ownership of a property). So on manual nav we
     cancel the old timeline, reset layers, build a fresh one and seek it forward. */
  const jump = (i) => {
    const k = (i + 3) % 3;
    loop.cancel();
    baseline();
    loop = makeLoop();
    window.__hxLoop = loop;
    loop.seek(starts[k] + 1100, true);
    mark(k, true); arm();
  };
  $("#hx-next").addEventListener("click", () => jump(cur + 1));
  $("#hx-prev").addEventListener("click", () => jump(cur - 1));
  dots.forEach((d, k) => d.addEventListener("click", () => jump(k)));
  pp.addEventListener("click", () => { paused = !paused; pp.setAttribute("aria-pressed", String(paused)); pp.setAttribute("aria-label", paused ? "Play slideshow" : "Pause slideshow"); arm(); });
  stage.addEventListener("pointerenter", () => { hover = true; arm(); });
  stage.addEventListener("pointerleave", () => { hover = false; arm(); });
  document.addEventListener("visibilitychange", arm);
  window.__hxLoop = loop;
} else {
  /* reduced motion: static first frame, controls step between views without animation */
  paused = true; pp.setAttribute("aria-pressed", "true"); pp.setAttribute("aria-label", "Play slideshow");
  const show = (i) => { i = (i + 3) % 3; L.forEach((l, k) => { l.style.opacity = k === i ? 1 : 0; }); mark(i, true); };
  L.forEach((l, k) => { l.style.opacity = k === 0 ? 1 : 0; });
  $("#hx-next").addEventListener("click", () => show(cur + 1));
  $("#hx-prev").addEventListener("click", () => show(cur - 1));
  dots.forEach((d, k) => d.addEventListener("click", () => show(k)));
}

/* gallery lightbox */
const lb = $("#hx-lb"), lbi = $("#hx-lb-img");
const shots = [["images/hero-mini.webp", "Mini Cooper Convertible, front three-quarter"], ["images/mini-side.webp", "Mini Cooper Convertible, side profile"], ["images/mini-top.webp", "Mini Cooper Convertible, top view"]];
let gi = 0, opener = null;
const show = (i) => { gi = (i + shots.length) % shots.length; lbi.src = shots[gi][0]; lbi.alt = shots[gi][1]; };
$$(".hx-thumb").forEach((t) => t.addEventListener("click", () => { opener = t; show(+t.dataset.i); lb.showModal(); }));
$(".hx-lb-x").addEventListener("click", () => lb.close());
$(".hx-lb-n.prev").addEventListener("click", () => show(gi - 1));
$(".hx-lb-n.next").addEventListener("click", () => show(gi + 1));
lb.addEventListener("click", (e) => { if (e.target === lb) lb.close(); });
lb.addEventListener("keydown", (e) => { if (e.key === "ArrowLeft") show(gi - 1); if (e.key === "ArrowRight") show(gi + 1); });
lb.addEventListener("close", () => opener && opener.focus());

// Scroll-driven parallax exit (GSAP ScrollTrigger). Targets are wrappers Anime.js never animates.
if (!reduce && window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: { trigger: hx, start: "top top", end: "bottom top", scrub: 0.6, invalidateOnRefresh: true }
  });
  tl.to(".fx-rings", { rotation: 80, svgOrigin: "400 300" }, 0)
    .to(".fx-speed", { scaleX: 1.6, svgOrigin: "400 300", opacity: 0 }, 0)
    .to(".hx-bg", { yPercent: 12, scale: 1.08 }, 0)
    .to(".hx-stage", { y: () => -innerHeight * 0.12, scale: 0.94 }, 0)
    .to(".hx-info", { y: () => -innerHeight * 0.06, opacity: 0.35 }, 0);
}

// Motion-graphics intro + ambient loops (GSAP). Touches only .hx-fx internals and h1 word spans.
(() => {
  const fx = $(".hx-fx");
  if (!fx) return;
  if (reduce || !window.gsap) { fx.style.opacity = 1; return; }
  const title = $("#hx-title");
  if (title && !title.querySelector(".w")) {
    const split = (node) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((t) => {
            if (!t) return;
            if (/^\s+$/.test(t)) { frag.append(t); return; }
            const w = document.createElement("span"); w.className = "w";
            const s = document.createElement("span"); s.textContent = t;
            w.append(s); frag.append(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1) split(n);
      });
    };
    split(title);
  }
  const words = $$("#hx-title .w > span");
  const r1 = $(".fx-r1"), r2 = $(".fx-r2");
  [r1, r2].forEach((c) => { const L = c.getTotalLength(); c.style.strokeDasharray = L; c.style.strokeDashoffset = L; });
  gsap.set(fx, { opacity: 1 });
  gsap.set(".fx-ticks, .fx-dot", { opacity: 0 });
  gsap.set(words, { yPercent: 115 });
  const loops = [];
  const intro = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.1 });
  intro.to(r1, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut" }, 0)
    .to(r2, { strokeDashoffset: 0, duration: 1.4, ease: "power2.inOut" }, 0.2)
    .to(".fx-ticks", { opacity: 1, duration: 0.8 }, 0.6)
    .to(".fx-dot", { opacity: 1, duration: 0.5 }, 1)
    .from(".fx-speed path", { xPercent: (i) => (i ? 40 : -40), opacity: 0, duration: 0.9, stagger: 0.08 }, 0.5)
    .to(words, { yPercent: 0, duration: 0.9, stagger: 0.07, ease: "expo.out" }, 0.15)
    .add(() => loops.forEach((l) => l.play()));
  loops.push(
    gsap.to(".fx-orbit", { rotation: 360, svgOrigin: "400 300", duration: 14, ease: "none", repeat: -1, paused: true }),
    gsap.to(".fx-ticks", { rotation: -360, svgOrigin: "400 300", duration: 60, ease: "none", repeat: -1, paused: true }),
    gsap.to(".fx-speed path", { opacity: 0.45, duration: 1.4, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 0.2, paused: true })
  );
  new IntersectionObserver(([e]) => {
    if (intro.progress() < 1) return;
    loops.forEach((l) => (e.isIntersecting ? l.play() : l.pause()));
  }).observe(hx);
  $$("[data-c]").forEach((b) => b.addEventListener("click", () =>
    gsap.fromTo([r1, r2], { scale: 0.94, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.9, ease: "elastic.out(1,.5)", overwrite: "auto" })));
})();
