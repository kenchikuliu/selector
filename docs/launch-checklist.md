# Launch Checklist

This checklist is the end-to-end release path for `Web Element Selector`, from local code changes to GitHub release and Chrome Web Store submission.

## 1. Versioning

- Choose the target version number
- Update `manifest.json`
- Update `CHANGELOG.md`
- Add a matching `RELEASE_NOTES_vX.Y.Z.md`
- Confirm any README references to packaged zip names match the new version

## 2. Product sanity check

- Load the unpacked extension in Chrome or Edge
- Open the popup and confirm it renders correctly
- Launch Selector on a normal web page
- Confirm page selection works
- Confirm prompt copy still works
- Confirm options/settings save and reload correctly
- Confirm restricted pages are handled gracefully

## 3. Marketing assets

- Regenerate README screenshots if the UI changed materially
  - Run `node scripts/capture-marketing.mjs`
- Check `assets/marketing/` for fresh output:
  - `readme-screenshot-selector.png`
  - `readme-screenshot-popup.png`
  - `readme-screenshot-overlay.png`
  - `readme-screenshot-copy.png`
  - `readme-screenshot-options.png`
- Confirm `social-preview.png` is still appropriate
- Update README image references if asset names changed

## 4. Install page and public links

- Confirm `index.html` still loads correctly on GitHub Pages
- Confirm Open Graph / Twitter tags still point to valid image URLs
- Confirm `https://kenchikuliu.github.io/web-element-selector/` returns successfully
- Confirm GitHub repository links in README and install page are current

## 5. Package the release

- Build a versioned zip in `dist/`
- Use the current naming convention:
  - `dist/web-element-selector-vX.Y.Z.zip`
- Confirm the zip includes:
  - extension source files
  - assets
  - README
  - release notes
  - docs
  - scripts if they are part of the public toolkit

## 6. Git and GitHub release

- Commit all release changes
- Push `main`
- Create and push the tag:
  - `vX.Y.Z`
- Create a GitHub release using `RELEASE_NOTES_vX.Y.Z.md`
- Upload `dist/web-element-selector-vX.Y.Z.zip`
- Confirm the release page is public and the asset downloads correctly

## 7. Chrome Web Store submission prep

- Open `docs/chrome-web-store/listing.md`
- Reuse the short description and detailed description
- Open `docs/chrome-web-store/privacy.md`
- Reuse the privacy and permissions wording
- Open `docs/chrome-web-store/screenshots.md`
- Upload screenshots in the recommended order
- Open `docs/chrome-web-store/submission-checklist.md`
- Complete the store-specific final checks

## 8. Post-release verification

- Confirm the latest GitHub release badge resolves correctly
- Confirm the README images render on GitHub
- Confirm GitHub Pages still serves the install page after the push
- Confirm the release asset version matches `manifest.json`

## 9. Optional store rollout notes

- Save the final store listing text used in submission if it differs from `listing.md`
- Save any store-specific image exports into `docs/chrome-web-store/assets/`
- Record approval or rejection notes so the next submission is faster
