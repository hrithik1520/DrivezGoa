import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { EMAIL, PHONE, PHONE_TEL, WA, cars, faqs, locations, posts, reviews } from "./tools/data.mjs";

const OUT = dirname(fileURLToPath(import.meta.url));
const BRAND = "Goa Luxe Drives";
const WA_URL = `https://wa.me/${WA}`;
const inr = (n) => "₹" + n.toLocaleString("en-IN");
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const wa = (text) => `${WA_URL}?text=${encodeURIComponent(text)}`;
const write = (file, html) => { const f = join(OUT, file); mkdirSync(dirname(f), { recursive: true }); writeFileSync(f, html); };
const fmtDate = (d) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

const icon = (id, cls = "") => `<svg class="${cls}" aria-hidden="true" focusable="false"><use href="#i-${id}"/></svg>`;
const sprite = `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>
<symbol id="i-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></symbol>
<symbol id="i-wa" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.27-1.38A9.9 9.9 0 1 0 12.04 2Zm0 1.8a8.1 8.1 0 1 1-4.13 15.07l-.3-.18-3.12.82.83-3.04-.2-.31A8.1 8.1 0 0 1 12.04 3.8Zm-3.2 3.7c-.17 0-.45.06-.69.32-.24.26-.9.88-.9 2.15s.92 2.5 1.05 2.67c.13.17 1.8 2.88 4.45 3.93 2.2.87 2.65.7 3.13.65.48-.04 1.55-.63 1.77-1.24.22-.6.22-1.13.15-1.24-.07-.1-.24-.17-.5-.3-.27-.13-1.55-.77-1.8-.86-.24-.09-.41-.13-.59.13-.17.26-.68.86-.83 1.03-.15.17-.3.2-.57.07-.26-.13-1.1-.4-2.1-1.3-.77-.69-1.3-1.55-1.45-1.8-.15-.27-.02-.4.12-.54.12-.12.26-.3.4-.46.13-.15.17-.26.26-.44.09-.17.04-.33-.02-.46-.07-.13-.58-1.42-.8-1.94-.2-.5-.42-.43-.58-.44h-.5Z"/></symbol>
<symbol id="i-star" viewBox="0 0 24 24" fill="currentColor"><path d="m12 2.8 2.7 5.9 6.4.7-4.8 4.3 1.4 6.3L12 16.8 6.3 20l1.4-6.3L2.9 9.4l6.4-.7L12 2.8Z"/></symbol>
<symbol id="i-gear" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="2"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M6 8v8M18 8v3a2 2 0 0 1-2 2H8"/></symbol>
<symbol id="i-seat" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="7" r="3.2"/><path d="M5.5 20a6.5 6.5 0 0 1 13 0"/></symbol>
<symbol id="i-fuel" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16M3 21h12M14 9h2.5a1.5 1.5 0 0 1 1.5 1.5V16a1.5 1.5 0 0 0 3 0V8l-3-3M6.5 7h5"/></symbol>
<symbol id="i-pin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/></symbol>
<symbol id="i-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5"/></symbol>
<symbol id="i-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></symbol>
<symbol id="i-quote" viewBox="0 0 24 24" fill="currentColor"><path d="M4 18v-5.2C4 8.6 6.2 6 10 5.5v2.2c-1.9.4-2.9 1.6-3 3.3H10V18H4Zm10 0v-5.2c0-4.2 2.2-6.8 6-7.3v2.2c-1.9.4-2.9 1.6-3 3.3H20V18h-6Z"/></symbol>
<symbol id="i-shield" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M24 4 8 10v12c0 10 6.5 18 16 22 9.5-4 16-12 16-22V10L24 4Z"/><path d="m17 24 5 5 9-10"/></symbol>
<symbol id="i-key" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="15" cy="30" r="8"/><path d="M21 24 40 5M33 12l5 5M28 17l4 4"/></symbol>
<symbol id="i-wheel" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="24" cy="24" r="19"/><circle cx="24" cy="24" r="4"/><path d="M24 5v15M24 28v15M7.5 14.5 20 21.5M28 26.5l12.5 7M7.5 33.5 20 26.5M28 21.5l12.5-7"/></symbol>
<symbol id="i-plane" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="m4 27 16-6V8a3 3 0 0 1 6 0v13l18 8v4l-18-3v8l5 3v3l-8-2-8 2v-3l5-3v-8L4 31v-4Z"/></symbol>
<symbol id="i-clock" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="24" cy="24" r="19"/><path d="M24 12v12l8 5"/></symbol>
<symbol id="i-phone" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/></symbol>
<symbol id="i-mail" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 7 8.5 6.5L20.5 7"/></symbol>
</defs></svg>`;

const stars = (n) => `<span class="stars" role="img" aria-label="${n} out of 5 stars">${[1, 2, 3, 4, 5].map((i) => icon("star", i > n ? "off" : "")).join("")}</span>`;

/* image maps */
const gallery = (c) => [c.image, ...(c.key === "a3" ? [2, 3, 5] : [2, 3, 4]).map((n) => `images/cars/angles/${c.key}-${n}.jpg`)];
const carBySlug = Object.fromEntries(cars.map((c) => [c.slug, c]));
const postImg = {
  "best-luxury-cars-to-rent-in-goa": "land-rover-defender-110-rental-goa",
  "self-drive-vs-chauffeur-goa": "ford-mustang-rental-goa",
  "goa-airport-luxury-car-rental-guide": "bmw-x5-new-rental-goa",
  "best-convertible-cars-rental-goa": "mini-cooper-convertible-rental-goa",
  "luxury-car-rental-north-goa-guide": "audi-a3-convertible-rental-goa",
  "luxury-car-rental-south-goa-guide": "bmw-5-series-m5-rental-goa",
};
const postCar = (s) => carBySlug[postImg[s]] || cars[0];

const NAV = [["index.html", "Home", "home"], ["cars/index.html", "Our Cars", "cars"], ["about.html", "About", "about"], ["blog/index.html", "Blog", "blog"], ["reviews.html", "Reviews", "reviews"]];

function layout({ depth = 0, title, desc, file, current, body, ogImage = "images/hero-car.jpg", ld = "", extraBody = "" }) {
  const p = "../".repeat(depth);
  const links = NAV.map(([h, t, k]) => `<a href="${p}${h}"${k === current ? ' aria-current="page"' : ""}>${t}</a>`).join("");
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:type" content="website">
<meta property="og:image" content="${p}${ogImage}">
<meta name="theme-color" content="#FAF7F2">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%23030407'/%3E%3Cpath d='M9 8h7a8 8 0 0 1 0 16H9V8Z' fill='none' stroke='%23d4ff24' stroke-width='2'/%3E%3C/svg%3E">
<script>(function(d){d.documentElement.classList.add('js');if(matchMedia('(prefers-reduced-motion: reduce)').matches)d.documentElement.classList.add('rm');setTimeout(function(){if(!window.__motionReady)d.documentElement.classList.add('motion-failed')},3000)})(document)</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Manrope:wght@400;500;600;700;800&display=swap">
<link rel="stylesheet" href="${p}css/styles.css">
${ld}
</head>
<body${current === "home" ? ' class="home"' : ""}>
<a class="skip" href="#main">Skip to content</a>
${sprite}
${current === "article" ? '<div class="progress" aria-hidden="true"></div>' : ""}
<header class="nav"><div class="wrap nav-in">
<a class="brand" href="${p}index.html" aria-label="${BRAND} home"><svg class="brand-mark" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="18.5" fill="none" stroke="#F04400"/><path d="M13 11h7.5a9 9 0 0 1 0 18H13V11Z" fill="none" stroke="#FFD91A" stroke-width="1.6"/><path d="M13 20h12" stroke="#F04400" stroke-width="1.6"/></svg><span class="brand-text">Goa Luxe<small>Drives</small></span></a>
<nav class="nav-links" aria-label="Primary">${links}<a class="btn btn-gold" href="${WA_URL}" target="_blank" rel="noopener">Book on WhatsApp</a></nav>
<button class="burger" aria-label="Open menu" aria-expanded="false" aria-controls="menu"><span></span></button>
</div></header>
<div class="menu" id="menu" role="dialog" aria-modal="true" aria-label="Menu">
<button class="menu-close" aria-label="Close menu">${icon("close")}</button>
${links}<a class="btn btn-wa btn-lg" href="${WA_URL}" target="_blank" rel="noopener">${icon("wa")} Book on WhatsApp</a>
</div>
<main id="main">
${body}
</main>
<footer class="footer"><div class="wrap">
<div class="foot-grid">
<div><a class="brand" href="${p}index.html"><svg class="brand-mark" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="18.5" fill="none" stroke="#F04400"/><path d="M13 11h7.5a9 9 0 0 1 0 18H13V11Z" fill="none" stroke="#FFD91A" stroke-width="1.6"/></svg><span class="brand-text">Goa Luxe<small>Drives</small></span></a><p>Self-drive and chauffeur-driven luxury cars in Goa, delivered to the airport, your hotel or your villa.</p></div>
<div><h4>Explore</h4><ul>${NAV.map(([h, t]) => `<li><a href="${p}${h}">${t}</a></li>`).join("")}</ul></div>
<div><h4>Fleet</h4><ul>${cars.slice(0, 5).map((c) => `<li><a href="${p}cars/${c.slug}.html">${esc(c.name)}</a></li>`).join("")}</ul></div>
<div><h4>Talk to us</h4><ul><li><a href="tel:${PHONE_TEL}">${icon("phone", "")}&nbsp;${PHONE}</a></li><li><a href="mailto:${EMAIL}">${icon("mail", "")}&nbsp;${EMAIL}</a></li><li><a href="${WA_URL}" target="_blank" rel="noopener">${icon("wa", "")}&nbsp;WhatsApp us</a></li></ul></div>
</div>
<div class="foot-base"><span>© ${new Date().getFullYear()} ${BRAND}. All rights reserved.</span><span>Mopa · Dabolim · North Goa · South Goa</span></div>
</div></footer>
<a class="wa-float" href="${WA_URL}?text=${encodeURIComponent("Hi, I'd like to book a car in Goa")}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp"><span class="wa-pulse"></span>${icon("wa")}<span class="wa-label">Chat on WhatsApp</span></a>
${extraBody}
<script src="${p}js/app.js" type="module"></script>
<script src="${p}js/motion.js" type="module"></script>
<script src="${p}js/flow.js" type="module"></script>
<script src="${p}js/gsap.min.js" defer></script><script src="${p}js/ScrollTrigger.min.js" defer></script><script src="${p}js/scroll.js" type="module"></script>${file === "index.html" ? `<script src="${p}js/hero.js" type="module"></script>` : ""}
</body>
</html>`;
}

const carCard = (c, p) => `<article class="car-card" data-type="${c.type}">
<div class="car-img"><span class="tag">${c.type === "convertible" ? "Convertible" : c.type === "suv" ? "SUV" : "Luxury"}</span><img src="${p}${c.image}" alt="${esc(c.name)} available for rent in Goa" width="700" height="525" loading="lazy" decoding="async"></div>
<div class="car-body"><span class="car-make">${esc(c.make)}</span><h3><a href="${p}cars/${c.slug}.html">${esc(c.name)}</a></h3>
<ul class="specs"><li>${icon("gear")}${c.transmission}</li><li>${icon("seat")}${c.seats} seats</li><li>${icon("fuel")}${c.fuel}</li></ul>
<div class="car-foot"><p class="price num">${inr(c.price)}<small>per day</small></p><span class="go" aria-hidden="true">${icon("arrow")}</span></div></div></article>`;

const reviewCard = (r) => `<figure class="review" style="margin:0">${icon("quote", "qm")}${stars(r.stars)}<blockquote>“${esc(r.text)}”</blockquote><figcaption class="who"><span class="avatar" aria-hidden="true">${esc(r.initial)}</span><span><strong>${esc(r.name)}</strong><small>${esc(r.count)} · ${esc(r.when)}</small></span></figcaption></figure>`;

const faqHtml = `<div class="faq" data-reveal>${faqs.map(([q, a]) => `<details><summary>${esc(q)}<i aria-hidden="true"></i></summary><p class="ans">${esc(a)}</p></details>`).join("")}</div>`;

const ctaSection = (p) => `<section class="section cta"><div class="wrap"><span class="eyebrow" data-reveal>Reserve your drive</span><h2 class="h-xl" data-split>Your keys are <em class="gold">waiting</em></h2><p class="lead" data-reveal>Tell us the car, the dates and where to meet you. We reply on WhatsApp with availability and the exact rate.</p><div class="cta-actions" data-reveal><a class="btn btn-wa btn-lg" href="${WA_URL}" target="_blank" rel="noopener">${icon("wa")} Book on WhatsApp</a><a class="btn btn-ghost btn-lg" href="tel:${PHONE_TEL}">${icon("phone")} ${PHONE}</a></div></div></section>`;

const pageHead = ({ p, crumbs, eyebrow, h1, lead }) => `<section class="page-head"><div class="wrap">
<ol class="crumbs" aria-label="Breadcrumb">${crumbs.map(([h, t], i) => (h ? `<li><a href="${p}${h}">${t}</a></li>` : `<li aria-current="page">${t}</li>`)).join("")}</ol>
<span class="eyebrow" data-hero>${eyebrow}</span><h1 class="h-xl" data-split>${h1}</h1>${lead ? `<p class="lead" data-hero>${lead}</p>` : ""}</div></section>`;

/* ---------------- HOME ---------------- */
const featured = cars.filter((c) => c.featured).slice(0, 6);
const brands = [...new Set(cars.map((c) => c.make))];
write("index.html", layout({
  title: `${BRAND} | Luxury Car Rental in Goa — Self-Drive & Chauffeur`,
  desc: "Rent a BMW, Mercedes, Audi, Mustang, Mini or Land Rover in Goa. Self-drive or chauffeur, delivered to Mopa and Dabolim airports, hotels and villas.",
  file: "index.html", current: "home",
  ld: `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@type": "AutoRental", name: BRAND, telephone: PHONE, email: EMAIL, areaServed: "Goa, India", aggregateRating: { "@type": "AggregateRating", ratingValue: "4.7", reviewCount: "426" } })}</script>`,
  body: `
<section class="hx" id="hx" aria-labelledby="hx-title">
<div class="hx-bg" aria-hidden="true"></div>
<div class="wrap hx-grid">
<div class="hx-info">
<span class="eyebrow">Luxury car rental · Goa</span>
<h1 class="h-xl" id="hx-title">Arrive in Goa the way it <em class="gold">deserves</em></h1>
<p class="hx-desc">Hand-picked Mini, BMW, Mercedes, Audi, Mustang and Defender rentals. Self-drive or with a chauffeur, delivered to the airport, your hotel or your villa.</p>
<a class="hx-cta" href="cars/index.html"><span>View all cars</span><i aria-hidden="true">${icon("arrow")}</i></a>
<div class="hx-card"><div class="hx-thumbs" role="group" aria-label="Mini Cooper Convertible gallery">
<button type="button" class="hx-thumb" data-i="0" aria-label="Open photo 1 of 3"><img src="images/hero-mini.webp" alt="Mini Cooper Convertible, front three-quarter" width="96" height="64" loading="lazy"></button>
<button type="button" class="hx-thumb" data-i="1" aria-label="Open photo 2 of 3"><img src="images/mini-side.webp" alt="Mini Cooper Convertible, side profile" width="96" height="44" loading="lazy"></button>
<button type="button" class="hx-thumb" data-i="2" aria-label="Open photo 3 of 3"><img src="images/mini-top.webp" alt="Mini Cooper Convertible, top view" width="96" height="72" loading="lazy"></button>
</div><p class="hx-card-t"><strong>Mini Cooper Convertible</strong><span>From ₹17,000 / day</span></p></div>
</div>
<div class="hx-stage" id="hx-stage">
<a class="hx-badge" href="${WA_URL}" target="_blank" rel="noopener" aria-label="Book now on WhatsApp"><svg viewBox="0 0 120 120" aria-hidden="true" focusable="false"><defs><path id="hx-circ" d="M60 60m-43 0a43 43 0 1 1 86 0a43 43 0 1 1-86 0"/></defs><text><textPath href="#hx-circ" textLength="266" lengthAdjust="spacing">BOOK NOW • BOOK NOW • BOOK NOW • </textPath></text></svg><i aria-hidden="true">${icon("arrow")}</i></a>
<svg class="hx-fx" viewBox="0 0 800 600" aria-hidden="true" focusable="false"><g class="fx-rings"><circle class="fx-r1" cx="400" cy="300" r="270"/><circle class="fx-r2" cx="400" cy="300" r="212"/><circle class="fx-ticks" cx="400" cy="300" r="244"/></g><g class="fx-orbit"><circle class="fx-dot" cx="670" cy="300" r="6"/></g><g class="fx-speed"><path d="M20 250h150M0 300h110M40 350h170"/><path d="M630 250h150M690 300h110M590 350h170"/></g></svg>
<div class="hx-car" id="hx-car"><div class="hx-tilt" id="hx-tilt"><div class="hx-layer" data-l="0"><img id="hx-img" src="images/hero-mini.webp" alt="Slate blue Mini Cooper Convertible with the roof down, front three-quarter" width="1400" height="915" fetchpriority="high"><i class="hx-sheen" aria-hidden="true"></i></div><div class="hx-layer" data-l="1"><img src="images/mini-side.webp" alt="Slate blue Mini Cooper Convertible, side profile with the roof up" width="1000" height="406"></div><div class="hx-layer" data-l="2"><img src="images/mini-top.webp" alt="Slate blue Mini Cooper Convertible seen from above with the roof open" width="900" height="636"></div></div></div>
<div class="hx-ctrl" role="group" aria-label="Hero slideshow controls">
<button type="button" class="hx-cb" id="hx-prev" aria-label="Previous slide">${icon("arrow")}</button>
<div class="hx-dots" id="hx-dots"><button type="button" aria-label="Slide 1: front three-quarter" aria-current="true"></button><button type="button" aria-label="Slide 2: side profile"></button><button type="button" aria-label="Slide 3: top view"></button></div>
<button type="button" class="hx-cb" id="hx-pp" aria-label="Pause slideshow" aria-pressed="false"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path class="pp-pause" d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z"/><path class="pp-play" d="M8 5l11 7-11 7z"/></svg></button>
<button type="button" class="hx-cb" id="hx-next" aria-label="Next slide">${icon("arrow")}</button>
</div>
<p class="sr-only" id="hx-live" aria-live="polite"></p>
</div>
<form class="hx-buy" id="hx-buy" aria-label="Plan your rental">
<div class="hx-row"><span class="hx-lab" id="l-mode">Drive</span><div class="hx-opts" role="radiogroup" aria-labelledby="l-mode"><button type="button" role="radio" aria-checked="true" data-mode="0">Self-drive</button><button type="button" role="radio" aria-checked="false" data-mode="1">Chauffeur</button></div><p class="hx-note" id="hx-note">2-day minimum · fuel and tolls extra</p></div>
<div class="hx-row"><span class="hx-lab" id="l-days">Days</span><div class="hx-opts" role="radiogroup" aria-labelledby="l-days"><button type="button" role="radio" aria-checked="true" data-days="1">1</button><button type="button" role="radio" aria-checked="false" data-days="2">2</button><button type="button" role="radio" aria-checked="false" data-days="3">3</button><button type="button" role="radio" aria-checked="false" data-days="5">5</button><button type="button" role="radio" aria-checked="false" data-days="7">7</button></div></div>
<div class="hx-row"><span class="hx-lab">Reviews</span><p class="hx-rev"><span class="hx-stars" aria-hidden="true">★★★★★</span> <b id="hx-rating">4.7</b> <span>from <b id="hx-count">426</b> Google reviews</span></p></div>
<div class="hx-row"><span class="hx-lab">Estimate</span><p class="hx-price" aria-live="polite"><span>₹</span><b id="hx-price">17,000</b></p><p class="hx-note" id="hx-sub">₹17,000 per day · Mini Cooper Convertible</p></div>
<a class="btn btn-gold btn-lg hx-book" id="hx-book" href="${WA_URL}" target="_blank" rel="noopener">${icon("wa")} Book on WhatsApp</a>
<a class="link-arrow hx-fleet" href="cars/index.html">Explore the fleet ${icon("arrow")}</a>
</form>
</div>
<dialog class="hx-lb" id="hx-lb" aria-label="Mini Cooper Convertible photos"><button type="button" class="hx-lb-x" aria-label="Close gallery">×</button><button type="button" class="hx-lb-n prev" aria-label="Previous photo">‹</button><img id="hx-lb-img" src="" alt="" width="1280" height="853"><button type="button" class="hx-lb-n next" aria-label="Next photo">›</button></dialog>
<div class="scroll-cue" aria-hidden="true">Scroll<i></i></div></section>

<div class="marquee" aria-hidden="true"><div class="marquee-track">${[...brands, ...brands, ...brands, ...brands].map((b) => `<span>${esc(b)}</span>`).join("")}</div></div>

<section class="section"><div class="wrap">
<div class="sec-head split"><div><span class="eyebrow" data-reveal>Featured fleet</span><h2 class="h-lg" data-split style="margin-top:18px">Cars worth the <em class="gold">detour</em></h2></div><p class="lead" data-reveal>Every car is cleaned and checked before it reaches you. Rates are per day, and the price you see is the price in the WhatsApp message.</p></div>
<div class="fleet" data-stagger>${featured.map((c) => carCard(c, "")).join("")}</div>
<p style="margin-top:44px;text-align:center" data-reveal><a class="link-arrow" href="cars/index.html">See all ${cars.length} cars ${icon("arrow")}</a></p>
</div></section>

<section class="section" style="background:var(--ink-2)"><div class="wrap">
<div class="sec-head"><span class="eyebrow" data-reveal>Why Goa Luxe Drives</span><h2 class="h-lg" data-split>A calmer way to <em class="gold">rent</em></h2></div>
<div class="features" data-stagger>
<div class="feature"><span class="idx">01</span><div><h3>Delivered, not collected</h3><p>We hand over at Mopa or Dabolim airport, your hotel or your villa. No counters, no shuttle buses.</p></div></div>
<div class="feature"><span class="idx">02</span><div><h3>Self-drive or chauffeur</h3><p>Keep the keys for two days or more, or add a driver for ₹3,500 per 8 hours when the day has a flight or a wedding.</p></div></div>
<div class="feature"><span class="idx">03</span><div><h3>Clear terms up front</h3><p>Fuel, tolls, inter-state permission and the deposit are discussed on WhatsApp before you confirm, never after the keys are in your hand.</p></div></div>
</div></div></section>

<section class="section"><div class="wrap">
<div class="sec-head"><span class="eyebrow" data-reveal>How it works</span><h2 class="h-lg" data-split>Three steps to the <em class="gold">keys</em></h2></div>
<div class="steps" data-stagger>
<div class="step"><b>01</b><h3>Choose your car</h3><p>Pick a car and your dates. Self-drive needs at least two days.</p></div>
<div class="step"><b>02</b><h3>Confirm on WhatsApp</h3><p>We confirm availability, the rate and the deposit in one message.</p></div>
<div class="step"><b>03</b><h3>We deliver</h3><p>Show your licence and a government photo ID (plus passport for international guests) and drive away.</p></div>
</div></div></section>

<section class="banner"><div class="banner-word" aria-hidden="true" data-parallax="30">LUXE</div><div class="wrap"><div class="banner-car-wrap"><img class="banner-car" data-parallax="50" src="images/banner-car.webp" alt="Black Mercedes C-Class sedan" width="1452" height="658" loading="lazy"></div>
<div class="banner-copy"><h2 class="h-lg" data-split>Drive the coast. <em class="gold">Your way.</em></h2><p class="lead" data-reveal>From a roof-down Mini through Fontainhas to a Defender up to the villa, there's a car for the plan.</p><p data-reveal><a class="btn btn-gold btn-lg" href="cars/index.html">Choose your car</a></p></div></div></section>

<section class="section"><div class="wrap">
<div class="sec-head split"><div><span class="eyebrow" data-reveal>Guest reviews</span><h2 class="h-lg" data-split style="margin-top:18px">Loved by those who <em class="gold">drove</em></h2></div>
<div class="rating-big" data-reveal><b class="num">4.7</b><div>${stars(5)}<p class="lead" style="margin-top:6px">From 426 Google reviews</p></div></div></div>
<div class="reviews three" data-stagger>${reviews.slice(0, 3).map(reviewCard).join("")}</div>
<p style="margin-top:44px" data-reveal><a class="link-arrow" href="reviews.html">Read all reviews ${icon("arrow")}</a></p>
</div></section>

<section class="section" style="background:var(--ink-2)"><div class="wrap">
<div class="sec-head"><span class="eyebrow" data-reveal>Delivery</span><h2 class="h-lg" data-split>Wherever you land in <em class="gold">Goa</em></h2><p class="lead" data-reveal>We deliver across North Goa, South Goa and both airports.</p></div>
<div class="locs" data-stagger>${locations.map((l) => `<span class="loc">${icon("pin")}${esc(l.name)}</span>`).join("")}</div>
</div></section>

<section class="section"><div class="wrap">
<div class="sec-head"><span class="eyebrow" data-reveal>Good to know</span><h2 class="h-lg" data-split>Questions, <em class="gold">answered</em></h2></div>
${faqHtml}
</div></section>
${ctaSection("")}`,
}));

/* ---------------- CARS LISTING ---------------- */
write("cars/index.html", layout({
  depth: 1, current: "cars",
  title: `Our Cars | Luxury Car Rental Fleet in Goa | ${BRAND}`,
  desc: "Browse BMW, Mercedes-Benz, Audi, Mini, Ford Mustang and Land Rover rentals in Goa with daily rates, seats and fuel type.",
  body: `${pageHead({ p: "../", crumbs: [["index.html", "Home"], [null, "Our Cars"]], eyebrow: "The fleet", h1: `Choose your <em class="gold">drive</em>`, lead: "Convertibles for the coast, SUVs for villa stays and a saloon for the long run. Rates are per day." })}
<section class="section"><div class="wrap">
<div class="filters" role="group" aria-label="Filter cars by type"><button class="chip" data-filter="all" aria-pressed="true">All</button><button class="chip" data-filter="convertible" aria-pressed="false">Convertibles</button><button class="chip" data-filter="suv" aria-pressed="false">SUVs</button><button class="chip" data-filter="luxury" aria-pressed="false">Luxury</button></div>
<p class="sr-only" id="filter-status" role="status" aria-live="polite"></p>
<div class="fleet">${cars.map((c) => carCard(c, "../")).join("")}</div>
</div></section>${ctaSection("../")}`,
}));

/* ---------------- CAR DETAIL ---------------- */
const similar = (c) => cars.filter((x) => x.slug !== c.slug && (x.type === c.type || x.make === c.make)).slice(0, 3);
for (const c of cars) {
  const g = gallery(c);
  const text = `Hi, I want to book the ${c.name}`;
  write(`cars/${c.slug}.html`, layout({
    depth: 1, current: "cars", ogImage: c.image,
    title: `${c.name} Rental in Goa — ${inr(c.price)}/day | ${BRAND}`,
    desc: `Rent the ${c.name} in Goa for ${inr(c.price)} per day. ${c.transmission}, ${c.seats} seats, ${c.fuel}. Self-drive or chauffeur, delivered to the airport, hotel or villa.`,
    ld: `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@type": "Product", name: `${c.name} rental in Goa`, image: c.image, brand: c.make, offers: { "@type": "Offer", priceCurrency: "INR", price: c.price, availability: "https://schema.org/InStock" } })}</script>`,
    body: `<div class="wrap"><div class="detail">
<div>
<ol class="crumbs" aria-label="Breadcrumb"><li><a href="../index.html">Home</a></li><li><a href="index.html">Our Cars</a></li><li aria-current="page">${esc(c.name)}</li></ol>
<div class="gallery" data-reveal>
<div class="stage"><img id="stage-img" src="../${g[0]}" alt="${esc(c.name)} front view" width="1200" height="750" fetchpriority="high"></div>
<div class="thumbs">${g.map((src, i) => `<button class="thumb" type="button" data-full="../${src}" data-alt="${esc(c.name)} view ${i + 1}" aria-label="Show ${esc(c.name)} view ${i + 1}" aria-current="${i === 0}"><img src="../${src}" alt="" width="200" height="125" loading="lazy"></button>`).join("")}</div>
</div>
<div class="two-col" style="margin-top:56px"><div class="prose" data-reveal><h2 class="h-md">About the ${esc(c.name)}</h2><p style="margin-top:14px;color:var(--text-2)">${esc(c.blurb)}</p><p style="margin-top:14px;color:var(--text-2)">Delivered clean and checked to Mopa or Dabolim airport, your hotel or your villa, anywhere across North and South Goa.</p></div>
<div data-reveal><h2 class="h-md">What the rate includes</h2><ul class="incl">
<li>${icon("check")}<span><b>Delivery &amp; pick-up</b><br>Airports, hotels and villas across Goa.</span></li>
<li>${icon("check")}<span><b>Self-drive from two days</b><br>No one-day self-drive. Add a chauffeur for ₹3,500 per 8 hours.</span></li>
<li>${icon("check")}<span><b>Clear terms before you pay</b><br>Fuel, tolls and inter-state permission are agreed on WhatsApp.</span></li>
<li>${icon("check")}<span><b>Documents</b><br>Driving licence and a government photo ID. Passport for international guests.</span></li>
</ul></div></div>
</div>
<aside class="book" data-reveal aria-label="Booking">
<div><span class="car-make">${esc(c.make)}</span><h1>${esc(c.name)}</h1></div>
<p class="price num">${inr(c.price)}<small>per day · chauffeur +₹3,500 / 8 hrs</small></p>
<div class="spec-grid"><div class="spec"><small>Gearbox</small><span>${icon("gear")}${c.transmission}</span></div><div class="spec"><small>Seats</small><span>${icon("seat")}${c.seats}</span></div><div class="spec"><small>Fuel</small><span>${icon("fuel")}${c.fuel}</span></div><div class="spec"><small>Type</small><span>${icon("check")}${c.type === "suv" ? "SUV" : c.type[0].toUpperCase() + c.type.slice(1)}</span></div></div>
<form id="enquiry" data-car="${esc(c.name)}" data-wa="${WA_URL}" novalidate style="display:grid;gap:14px">
<div class="field"><label for="mode">Driving</label><select id="mode" name="mode"><option>Self-drive</option><option>With chauffeur</option></select></div>
<div class="field-row"><div class="field"><label for="from">From</label><input id="from" name="from" type="date" required></div><div class="field"><label for="to">To</label><input id="to" name="to" type="date" required></div></div>
<div class="field"><label for="pickup">Pick-up</label><select id="pickup" name="pickup"><option>Mopa Airport</option><option>Dabolim Airport</option><option>Hotel or villa</option></select></div>
<p id="enquiry-err" class="note" role="alert" style="color:var(--danger);min-height:0"></p>
<button class="btn btn-wa btn-lg" type="submit">${icon("wa")} Book on WhatsApp</button>
<p class="note">Self-drive has a two-day minimum. The deposit is confirmed on WhatsApp.</p>
</form>
</aside>
</div></div>
<section class="section" style="background:var(--ink-2)"><div class="wrap"><div class="sec-head"><span class="eyebrow" data-reveal>More to drive</span><h2 class="h-lg" data-split>Similar <em class="gold">cars</em></h2></div><div class="fleet" data-stagger>${similar(c).map((x) => carCard(x, "../")).join("")}</div></div></section>`,
  }));
}

/* ---------------- ABOUT ---------------- */
write("about.html", layout({
  current: "about",
  title: `About Us | ${BRAND}`,
  desc: `${BRAND} rents self-drive and chauffeur-driven luxury cars across Goa, with airport delivery and a two-day minimum on self-drive.`,
  body: `${pageHead({ p: "", crumbs: [["index.html", "Home"], [null, "About"]], eyebrow: "Our story", h1: `Driven by the booking, not the <em class="gold">badge</em>`, lead: `${BRAND} is a Goa car rental desk for guests who want a specific car, a clear daily rate and a handover at the airport, hotel or villa.` })}
<section class="section"><div class="wrap"><div class="about-grid" data-stagger>
<article class="about-card">${icon("key")}<h3>Self-drive</h3><p>You keep the keys for at least two days. The car stays with you between beach, dinner and the drive south.</p></article>
<article class="about-card">${icon("wheel")}<h3>Chauffeur</h3><p>A driver for ₹3,500 per 8 hours when the day has a flight, a wedding or a route you would rather not drive.</p></article>
<article class="about-card">${icon("shield")}<h3>The fleet</h3><p>BMW, Mercedes-Benz, Audi, Mini, Land Rover and Ford, cleaned and checked before every handover.</p></article>
<article class="about-card">${icon("plane")}<h3>Where we deliver</h3><p>Mopa, Dabolim, the North Goa beach belt, Panaji and South Goa through to Palolem.</p></article>
</div></div></section>
<section class="section" style="background:var(--ink-2)"><div class="wrap"><div class="stats" data-reveal>
<div><b class="num" data-count="4.7" data-decimals="1">4.7</b><span>Google rating</span></div>
<div><b class="num" data-count="426" data-suffix="+">426+</b><span>Guest reviews</span></div>
<div><b class="num" data-count="${cars.length}">${cars.length}</b><span>Premium cars</span></div>
<div><b class="num" data-count="${locations.length}">${locations.length}</b><span>Delivery zones</span></div>
</div></div></section>
<section class="section"><div class="wrap"><div class="sec-head"><span class="eyebrow" data-reveal>How a booking works</span><h2 class="h-lg" data-split>Simple, in <em class="gold">writing</em></h2></div>
<div class="timeline">
<div class="tl"><i>1</i><p>You send the car, the dates and the pick-up point.</p></div>
<div class="tl"><i>2</i><p>We reply with availability, the rate and the deposit. If the car you asked for is out, we name the closest free one with its real rate.</p></div>
<div class="tl"><i>3</i><p>The car is cleaned and checked, then delivered to the airport, hotel or villa.</p></div>
<div class="tl"><i>4</i><p>Pricing shown is the current daily rate. Season and longer hires can change it, and any change is in the message before you pay.</p></div>
</div></div></section>
<section class="section" style="background:var(--ink-2)"><div class="wrap"><div class="sec-head"><span class="eyebrow" data-reveal>Where we deliver</span><h2 class="h-lg" data-split>All across <em class="gold">Goa</em></h2></div>
<div class="zones" data-stagger>${["North Goa", "South Goa", "Airport"].map((r) => `<div class="zone"><h3>${r === "Airport" ? "Airports" : r}</h3><p>${locations.filter((l) => l.region === r).map((l) => esc(l.name)).join(" · ")}</p></div>`).join("")}</div></div></section>
${ctaSection("")}`,
}));

/* ---------------- REVIEWS ---------------- */
write("reviews.html", layout({
  current: "reviews",
  title: `Customer Reviews | ${BRAND}`,
  desc: "Rated 4.7 from 426 Google reviews. Read what guests say about renting luxury cars in Goa.",
  body: `${pageHead({ p: "", crumbs: [["index.html", "Home"], [null, "Reviews"]], eyebrow: "Guest reviews", h1: `Words from the <em class="gold">road</em>` })}
<section class="section"><div class="wrap">
<div class="rating-big" data-reveal style="margin-bottom:56px"><b class="num">4.7</b><div>${stars(5)}<p class="lead" style="margin-top:6px">Average from 426 Google reviews</p></div></div>
<div class="reviews" data-stagger>${reviews.map(reviewCard).join("")}</div>
</div></section>${ctaSection("")}`,
}));

/* ---------------- BLOG ---------------- */
write("blog/index.html", layout({
  depth: 1, current: "blog",
  title: `Blog | Goa Car Rental Guides | ${BRAND}`,
  desc: "Guides to renting luxury cars in Goa: best cars, self-drive vs chauffeur, airport pick-up, convertibles, North and South Goa.",
  body: `${pageHead({ p: "../", crumbs: [["index.html", "Home"], [null, "Blog"]], eyebrow: "Journal", h1: `Goa, <em class="gold">behind the wheel</em>`, lead: "Practical guides for renting and driving luxury cars in Goa." })}
<section class="section"><div class="wrap"><div class="posts" data-stagger>${posts.map((po, i) => { const c = postCar(po.slug); return `<article class="post-card${i === 0 ? " big" : ""}"><div class="car-img"><img src="../${c.image}" alt="${esc(c.name)} on a Goa road" width="700" height="525" loading="${i < 2 ? "eager" : "lazy"}" decoding="async"></div><div class="post-body"><time datetime="${po.date}">${fmtDate(po.date)}</time><h2><a href="${po.slug}.html">${esc(po.title)}</a></h2><p>${esc(po.description)}</p><span class="link-arrow">Read article ${icon("arrow")}</span></div></article>`; }).join("")}</div></div></section>`,
}));

for (const po of posts) {
  const c = postCar(po.slug);
  const more = posts.filter((x) => x.slug !== po.slug).slice(0, 2);
  write(`blog/${po.slug}.html`, layout({
    depth: 1, current: "article", ogImage: c.image,
    title: `${po.title} | ${BRAND}`, desc: po.description,
    ld: `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: po.title, datePublished: po.date, description: po.description, publisher: { "@type": "Organization", name: BRAND } })}</script>`,
    body: `<section class="page-head" style="border:0;padding-bottom:30px"><div class="wrap article" style="max-width:860px">
<ol class="crumbs" aria-label="Breadcrumb"><li><a href="../index.html">Home</a></li><li><a href="index.html">Blog</a></li><li aria-current="page">Article</li></ol>
<div class="article-meta" data-hero><time datetime="${po.date}">${fmtDate(po.date)}</time><span>·</span><span>${Math.max(2, Math.round(po.paras.join(" ").split(/\s+/).length / 200))} min read</span></div>
<h1 class="h-xl" data-split style="font-size:clamp(2.4rem,6vw,4.4rem);max-width:none;margin-top:20px">${esc(po.title)}</h1></div></section>
<div class="wrap"><div class="article-hero" data-reveal><img src="../${c.image}" alt="${esc(c.name)} on a Goa road" width="1200" height="514"></div>
<article class="article" data-reveal>${po.paras.map((t) => `<p>${esc(t)}</p>`).join("")}
<div class="cta-card"><h2>Ready to book?</h2><p>Message us with the car, dates and pick-up point and we will confirm on WhatsApp.</p><a class="btn btn-wa btn-lg" href="${WA_URL}" target="_blank" rel="noopener">${icon("wa")} Book on WhatsApp</a></div></article></div>
<section class="section"><div class="wrap"><div class="sec-head"><span class="eyebrow" data-reveal>Keep reading</span></div><div class="posts" data-stagger>${more.map((x) => { const cc = postCar(x.slug); return `<article class="post-card"><div class="car-img"><img src="../${cc.image}" alt="${esc(cc.name)}" width="700" height="525" loading="lazy"></div><div class="post-body"><time datetime="${x.date}">${fmtDate(x.date)}</time><h2><a href="${x.slug}.html">${esc(x.title)}</a></h2><p>${esc(x.description)}</p></div></article>`; }).join("")}</div></div></section>`,
  }));
}
console.log("built", 5 + cars.length + posts.length, "pages");
