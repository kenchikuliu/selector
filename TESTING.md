# Testing Checklist

Use this checklist to validate the bookmarklet on real pages before calling a release done.

## Baseline

- Open the install page and confirm the bookmarklet link loads correctly
- Drag the bookmark to the browser bookmarks bar
- Click the bookmark on a normal page and confirm the panel appears

## Selection behavior

- Click a single element and confirm it receives an overlay and tag
- Shift-click multiple elements and confirm all selected tags appear
- Drag-select a region and confirm multiple elements are captured
- Use arrow keys to move to parent, child, and sibling elements
- Press `Esc` to clear selection
- Press `Cmd/Ctrl + Z` to undo the last selection change

## Tasking and annotations

- Add a global task in the task box and confirm it is included in copied output
- Click a preset task chip and confirm it fills the task box
- Add a per-element instruction and confirm it appears in copied output
- Remove a selected element from the tag list and confirm overlays update

## Export modes

- In `Safe` mode, copy output and confirm text, HTML, and `data-*` are omitted
- In `Full` mode, copy output and confirm text/HTML/data attributes appear when available
- Switch `Focused` / `Nearby` and confirm nearby container context only appears in `Nearby`

## Prompt targets

- Copy for `Codex` and confirm structured task/context/output formatting
- Copy for `Claude Code` and confirm Claude-style instruction formatting
- Copy for `Cursor` and confirm compact editor-oriented formatting
- Copy for `Selectors` and confirm selector-first minimal output
- Copy for `JSON` and confirm valid structured JSON output

## Persistence

- Change task text, export mode, context mode, and target AI
- Close the picker and reopen it
- Confirm previous settings are restored

## Snapshot

- Select one or more ordinary DOM regions and export `Snapshot`
- Confirm an SVG file downloads
- Open the SVG and confirm the selected regions are visually recognizable

## Dynamic apps

- Open a React or Next.js page with client-side rendered updates
- Launch the picker before the dynamic content finishes loading
- Confirm newly rendered nodes can still be selected after they appear

## Edge checks

- Select content near the top edge of the viewport and confirm labels/buttons remain visible
- Select content near the right edge and confirm annotation popovers remain visible
- Scroll after selecting and confirm overlays stay aligned
- Remove a selected node from the DOM and confirm stale overlays/tags do not persist

## Known limitations

- Cross-origin iframes may not be selectable
- Snapshot export is best-effort and may not perfectly reproduce complex pages
- React source metadata may be unavailable on many production builds
