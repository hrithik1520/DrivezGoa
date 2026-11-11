# Editing Guide

After any change to `tools/data.mjs` or `build.mjs`, run:

```bash
node build.mjs
```

Then preview with `python3 -m http.server 8765` and open http://localhost:8765. Never edit the generated `.html` files directly. The next build overwrites them.

---

## Change contact details

Edit the first line of `tools/data.mjs`:

```js
export const PHONE = "+91 95187 10841", PHONE_TEL = "+919518710841", WA = "919518710841", EMAIL = "goaluxedrives@gmail.com";
```

`WA` is digits only with the country code (no `+`). Rebuild.

## Change a car's price, seats or description

In `tools/data.mjs`, find the car in `cars` and edit its fields (`price` is a number in rupees, for example `17000`). Rebuild. The home hero's booking card has its own rate for the Mini Cooper at the top of `js/hero.js` (`RATE = 17000`). Update that too if the Mini's price changes.

## Add a new car

1. Put the main photo in `images/cars/` (WebP, about 700 px wide, e.g. `porsche-911-700.webp`).
2. Add an object to `cars` in `tools/data.mjs`:
   ```js
   { slug: "porsche-911-rental-goa", name: "Porsche 911", price: 60000, transmission: "Automatic", seats: 2, fuel: "Petrol", make: "Porsche", type: "luxury", featured: false, image: "images/cars/porsche-911-700.webp", blurb: "One-sentence pitch." }
   ```
   `type` must be `convertible`, `suv` or `luxury` (it drives the filter chips). `featured: true` shows it on the home page (first six only).
3. Optional gallery: give the car a short `key` in `tools/data.mjs`, then add `images/cars/angles/<key>-2.jpg`, `-3.jpg` and `-4.jpg` (the gallery uses 2, 3, 4 by default; change the list in `gallery()` in `build.mjs` for a different set).
4. Optional: add the slug to `postImg` in `build.mjs` if a blog post should use it.
5. Rebuild. The page `cars/<slug>.html` is created and it appears in the fleet, footer and similar-cars lists.

## Remove a car

Delete its entry from `cars`, then delete `cars/<slug>.html` (the build doesn't remove old files) and remove its reference in `postImg` in `build.mjs`.

## Edit reviews, FAQs and locations

Edit the arrays `reviews`, `faqs` and `locations` in `tools/data.mjs`. Keep each entry's shape the same. For `reviews`, `stars` is 1 to 5. Rebuild.

## Add or edit a blog post

In `posts` in `tools/data.mjs`, add an object:

```js
{ slug: "my-new-post", title: "Post title", date: "2026-11-11", description: "Meta description, about 155 characters.", paras: ["First paragraph.", "Second paragraph."] }
```

Each string in `paras` becomes one paragraph. Choose which car's photo the post uses via `postImg` in `build.mjs` (the first car is used if the slug isn't listed). Rebuild. The post is added to the blog index and its own page.

## Change page copy (headings, About text, buttons)

Static page text lives in the templates in `build.mjs`. Search for a distinctive phrase:

```bash
grep -n "Your keys are" build.mjs
```

Edit the text, keeping the surrounding HTML tags, and rebuild. In headings, `<em class="gold">word</em>` renders the word in orange.

## Change the navigation

Edit the `NAV` array near the top of `build.mjs`. Each entry is `[path, label, key]`.

## Swap the home "Drive the coast" banner image

Replace `images/banner-car.webp` with a transparent PNG/WebP cutout of the car and keep the name. If the new image has a different size, update the `width`/`height` attributes on the `.banner-car` `<img>` in `build.mjs` (search `banner-car`) and rebuild. A tight crop around the car works best. Convert with:

```bash
python3 -c "from PIL import Image; im=Image.open('new.png').convert('RGBA'); im=im.crop(im.getbbox()); im.save('images/banner-car.webp', quality=90)"
```

## Swap a car photo

Overwrite the file in `images/cars/` using the same name. If the name changes, update `image` in `tools/data.mjs`. Prefer WebP, and keep images under about 150 KB.

## Change colours and fonts

Open `css/styles.css` and edit the tokens in `:root`:

- `--gold` / `--gold-2`: the orange accent and its hover shade
- `--ink`, `--ink-2`: page backgrounds
- `--surface`: card background
- `--text`, `--text-2`, `--text-3`: text colours
- `--font-display`, `--font-body`: fonts. If you change them, update the Google Fonts `<link>` in `layout()` in `build.mjs` and rebuild.

The home hero re-declares a few of these under `.hx`, so change them there too if you want the hero to match.

Check text contrast stays at 4.5:1 or better (a browser's DevTools shows the ratio).

## Add a new page

1. In `build.mjs`, add a block like the About page: `write("faq.html", layout({ depth: 0, current: "faq", title: "…", desc: "…", body: `…` }));`
2. Reuse helpers: `pageHead({...})` for the title band and `ctaSection(p)` for the WhatsApp call to action.
3. To link it from the menu, add `["faq.html", "FAQ", "faq"]` to `NAV`.
4. Rebuild. Increase the page count in the final `console.log` if you want it exact.

## Tune or turn off animations

- Reveal style: change the attribute on the element in `build.mjs` (`data-reveal`, `data-stagger`, `data-split`).
- Parallax strength: change the number in `data-parallax="50"`. Remove the attribute to disable it.
- Timings and easing are in `js/motion.js` and `js/flow.js`. Hero-only motion is in `js/hero.js`.
- Visitors with reduced-motion enabled automatically get a static site.

## Pre-publish checklist

- [ ] `node build.mjs` runs without errors
- [ ] Phone, WhatsApp and email are correct in the header, footer and CTA
- [ ] Prices match what you quote on WhatsApp
- [ ] Images load on all pages (check the browser console for 404s)
- [ ] Layout is fine at 375 px (phone) and 1440 px (desktop), with no sideways scrolling
- [ ] Links in the nav, footer and blog work

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Edit doesn't show | You edited a generated `.html`, or forgot `node build.mjs`. Also try a hard refresh (Ctrl+Shift+R). |
| `Cannot find module` or syntax error on build | Check commas and quotes in `tools/data.mjs`. Every entry needs a comma after it except the last. |
| Content is invisible | JavaScript failed to load. Check the browser console. Reveal states depend on `js/motion.js`. |
| Car page missing | The car's `slug` in `data.mjs` must be unique. Rebuild. |
| Old page still exists after a rename | Delete the old file by hand. The build only writes files, it never removes them. |
