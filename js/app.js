// Non-animation behaviour: nav, menu, filters, gallery, enquiry form.
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

/* Nav background on scroll */
const nav = $(".nav");
if (nav) {
  const on = () => nav.classList.toggle("scrolled", scrollY > 24);
  addEventListener("scroll", on, { passive: true }); on();
}

/* Mobile menu */
const burger = $(".burger"), menu = $("#menu");
if (burger && menu) {
  const setOpen = (open) => {
    burger.setAttribute("aria-expanded", String(open));
    menu.classList.toggle("open", open);
    menu.inert = !open;
    document.body.style.overflow = open ? "hidden" : "";
    if (open) { document.dispatchEvent(new CustomEvent("menu:open")); $(".menu-close", menu).focus(); }
    else burger.focus({ preventScroll: true });
  };
  menu.inert = true;
  burger.addEventListener("click", () => setOpen(true));
  $(".menu-close", menu).addEventListener("click", () => setOpen(false));
  $$("a", menu).forEach((a) => a.addEventListener("click", () => setOpen(false)));
  addEventListener("keydown", (e) => { if (e.key === "Escape" && menu.classList.contains("open")) setOpen(false); });
  matchMedia("(min-width:1024px)").addEventListener("change", (m) => { if (m.matches) setOpen(false); });
}

/* Fleet filters */
const filters = $$("[data-filter]");
if (filters.length) {
  const cards = $$(".fleet .car-card");
  const status = $("#filter-status");
  filters.forEach((btn) => btn.addEventListener("click", () => {
    filters.forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
    const f = btn.dataset.filter;
    let n = 0;
    cards.forEach((c) => { const show = f === "all" || c.dataset.type === f; c.hidden = !show; if (show) n++; });
    if (status) status.textContent = `Showing ${n} car${n === 1 ? "" : "s"}`;
    document.dispatchEvent(new CustomEvent("filter:change"));
  }));
}

/* Gallery */
const stage = $("#stage-img");
if (stage) {
  $$(".thumb").forEach((t) => t.addEventListener("click", () => {
    $$(".thumb").forEach((x) => x.setAttribute("aria-current", String(x === t)));
    stage.src = t.dataset.full; stage.alt = t.dataset.alt;
    document.dispatchEvent(new CustomEvent("gallery:change", { detail: { img: stage } }));
  }));
}

/* WhatsApp enquiry */
const form = $("#enquiry");
if (form) {
  const today = new Date().toISOString().slice(0, 10);
  const from = form.elements.from, to = form.elements.to, err = $("#enquiry-err");
  from.min = to.min = today;
  from.addEventListener("change", () => { to.min = from.value || today; });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    err.textContent = "";
    const mode = form.elements.mode.value;
    if (!from.value || !to.value) { err.textContent = "Please choose both dates so we can check availability."; (from.value ? to : from).focus(); return; }
    const days = Math.round((new Date(to.value) - new Date(from.value)) / 864e5);
    if (days < 0) { err.textContent = "Return date must be after the pick-up date."; to.focus(); return; }
    if (mode === "Self-drive" && days < 2) { err.textContent = "Self-drive needs a minimum of two days. Choose a later return date or add a chauffeur."; to.focus(); return; }
    const msg = `Hi, I want to book the ${form.dataset.car}.\nMode: ${mode}\nFrom: ${from.value}\nTo: ${to.value}\nPick-up: ${form.elements.pickup.value}`;
    window.open(`${form.dataset.wa}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
  });
}
