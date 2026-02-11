# Wunderbuild Email Signature Generator

A tiny, static, client-side signature generator so teammates can create a consistent Wunderbuild email signature without touching HTML.

## What it does

- Lets users enter:
  - Full name
  - Position / title
  - Email (updates the visible text + `mailto:` link)
  - Phone (updates the visible text + `tel:` link)
- Shows a live preview
- Copies the signature for Gmail in one click (prefers rich HTML on the clipboard)
- Provides a `.rtf` download fallback

## Hosting (GitHub Pages)

1. Create a GitHub repository (public is simplest).
2. Upload these files to the repository root:
   - `index.html`
   - `styles.css`
   - `app.js`
3. In GitHub: **Settings → Pages → Build and deployment**
   - Source: **Deploy from a branch**
   - Branch: `main`
   - Folder: `/(root)`
4. Save. Your site URL will appear in the Pages settings.

## Notes

- Clipboard write requires HTTPS and a user interaction (button click).
- If a browser blocks clipboard access, use “Download .rtf”.
