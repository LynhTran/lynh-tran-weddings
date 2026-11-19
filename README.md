# Lynh Tran — Wedding Design & Planning

A four-page, responsive website in sage green, warm tan, and ivory. Built with plain HTML, CSS, and JavaScript: no dependencies, build step, framework, or server-side form.

## Preview locally

From the repository folder:

```sh
python3 -m http.server 8000
```

Open <http://localhost:8000>. Stop the server with `Ctrl+C`. You can also open `index.html` directly, but a local server is recommended for the clipboard feature.

## Pages and editing

| File | Content |
| --- | --- |
| `index.html` | Landing page, service overview, and design philosophy |
| `about.html` | Provisional introduction, values, and aesthetic direction |
| `services.html` | Proposed service outlines, process, and FAQs |
| `contact.html` | Clearly labeled placeholder contact details and local-only inquiry drafts |
| `assets/styles.css` | Shared palette, typography, layouts, and mobile styles |
| `assets/site.js` | Accessible mobile menu, footer year, and inquiry draft interactions |
| `assets/images/` | Locally stored stock inspiration photography |

Brand, navigation, and footer markup are intentionally present in each HTML file, so every page works without JavaScript. Keep shared text and links consistent across all four pages when editing. Colors and fonts are defined at the top of `assets/styles.css`.

### Content to personalize before accepting inquiries

- Replace the provisional first-person introduction with Lynh’s own approved biography.
- Confirm the service outlines, actual scope, availability, pricing, and service location. None is presented as an established credential or fixed package.
- Replace moodboard photography with owned or licensed work when available. Current images are explicitly labeled stock inspiration, not past client events. There are no invented testimonials, awards, or experience claims.
- Replace “Email address coming soon” in `contact.html` with the correct contact address and a `mailto:` link.
- To accept web inquiries, deliberately integrate and test a form service or backend. Update `contact.html` and the draft-only handling in `assets/site.js`, along with the privacy wording and services FAQ. **Changing the email placeholder alone does not connect the form.** GitHub Pages cannot process form submissions by itself.

### Contact behavior and privacy

The form is intentionally **not connected**. It validates the fields in the browser, creates a plain-text draft, and allows copying or saving that draft as a `.txt` file. No form data is transmitted, logged, or stored in cookies/local storage. Drafts are lost on refresh/navigation unless the visitor copies or downloads them. Changing a field hides an old draft until it is regenerated.

If JavaScript is unavailable, the draft form stays hidden and an explanatory message is shown. Mobile navigation remains available without JavaScript. Clipboard access requires a supported browser and a secure context (HTTPS or localhost); the UI explains failures and offers text selection or download instead.

## Publish on GitHub Pages

This repository is separate from the existing `LynhTran/lynhtran.github.io` portfolio. Publishing it as a **project site** does not replace that portfolio.

1. Push the site files to this repository’s `main` branch.
2. In **LynhTran/lynh-tran-weddings → Settings → Pages**, choose **Deploy from a branch**.
3. Select **main** and **/ (root)**, then save.
4. Once GitHub’s Pages deployment finishes, visit <https://lynhtran.github.io/lynh-tran-weddings/>.

All internal links and assets are relative, so they work under the project-site path, on localhost, or at a future custom domain. `.nojekyll` keeps publication static. Do not configure this project to overwrite the existing portfolio or add a custom domain unless that is an intentional later decision.

## Validation

No build is needed. Check JavaScript syntax with:

```sh
node --check assets/site.js
```

Serve locally and check all four pages, service anchor links, mobile navigation (including Escape and keyboard focus), FAQs, required fields, and draft copy/download. The draft must never show a “sent” state.

## Photography and fonts

Stock imagery is downloaded locally from Unsplash and used as a visual moodboard:

- Garden-style reception table — [original image source](https://images.unsplash.com/photo-1519225421980-715cb0215aed)
- Reception table — [original image source](https://images.unsplash.com/photo-1511795409834-ef04bbd61622)
- White and green wedding bouquet by Nikki Gibson — [photo page](https://unsplash.com/photos/white-and-green-flower-bouquet-UQl_-yabQiA), [original image source](https://images.unsplash.com/photo-1595467959554-9ffcbf37f10f)

See the [Unsplash license](https://unsplash.com/license). These images do not depict claimed client work.

Cormorant Garamond and Manrope are loaded from Google Fonts, with local system-font fallbacks. This is the only external runtime request; the photography, favicon, styles, and scripts are local. Google Fonts requests expose normal connection information to Google; no inquiry content is included. Self-host the fonts or remove the CSS `@import` to avoid that third-party request.
