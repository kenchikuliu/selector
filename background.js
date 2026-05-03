const RESTRICTED_PROTOCOLS = [
  "chrome:",
  "chrome-extension:",
  "edge:",
  "about:",
  "moz-extension:",
  "devtools:",
  "view-source:"
];

chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.id || !tab.url) return;
  if (RESTRICTED_PROTOCOLS.some((protocol) => tab.url.startsWith(protocol))) return;

  try {
    await chrome.scripting.insertCSS({
      target: { tabId: tab.id },
      files: ["assets/editor.css"]
    });

    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["assets/editor.js"],
      world: "MAIN"
    });
  } catch (error) {
    console.error("Web Element Selector injection failed:", error);
  }
});
