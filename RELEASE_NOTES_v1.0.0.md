# Web Element Selector v1.0.0

Web Element Selector is a bookmarklet for AI-assisted UI editing. You click the page, select the exact region you want to change, add instructions, and copy a prompt tailored for your coding assistant.

## Highlights

- Visual element picking with click, multi-select, drag-select, and keyboard navigation
- Per-element notes plus one global task field
- `Safe` and `Full` export modes for privacy-aware copying
- Prompt targets for `Codex`, `Claude Code`, `Cursor`, `JSON`, and selector-only export
- `Focused` and `Nearby` context export modes
- Preset tasks for common UI refinement requests
- Best-effort SVG snapshot export for selected regions
- Remembered settings via `localStorage`
- Better behavior on client-rendered React / Next.js pages through dynamic DOM observation

## Typical workflow

1. Open your local app or staging page
2. Click the `Web Element Selector` bookmark
3. Select the exact UI block you want to change
4. Add a task such as `Optimize this area for mobile`
5. Choose export mode, context mode, and target AI
6. Copy and paste into your coding assistant

## Notes

- `Safe` mode is the default and omits text, HTML, and `data-*` attributes
- `Snapshot` export is best-effort and works best on normal DOM content without heavy cross-origin assets
- React source hints depend on the page/runtime exposing usable debug metadata
