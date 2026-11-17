# ingletide.com

The public website for Ingletide, published with GitHub Pages from this repository.

- `index.html`, `home.css`, `home.js`: the home page. `screens.css` and `screens.js` draw the app screens shown on it (rebuilt from the app with sample data).
- `support.html`, `privacy.html`, `delete-account.html`, `404.html`: plain pages, styled by `styles.css`.
- `invite/` and `join/`: where the app's invite and join links land; they open the app or the store.

**When you change a CSS or JS file**, bump the `?v=` number on its links in the HTML files (any new number, such as today's date and time). Browsers keep these files for up to 10 minutes, and without a new number visitors can get the new page with old styles or scripts.
