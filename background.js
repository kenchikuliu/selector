const RESTRICTED_PROTOCOLS = [
  "chrome:",
  "chrome-extension:",
  "edge:",
  "about:",
  "moz-extension:",
  "devtools:",
  "view-source:"
];

async function injectSelector(tab) {
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
}

chrome.action.onClicked.addListener(async (tab) => {
  await injectSelector(tab);
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type === "inject-selector") {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      await injectSelector(tabs[0]);
      sendResponse({ ok: true });
    });
    return true;
  }
  if (message?.type === "get-active-tab-state") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      const restricted = !tab?.url || RESTRICTED_PROTOCOLS.some((protocol) => tab.url.startsWith(protocol));
      sendResponse({
        ok: true,
        restricted,
        url: tab?.url || "",
        title: tab?.title || ""
      });
    });
    return true;
  }
});
