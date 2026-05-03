const launchButton = document.getElementById("launch-btn");
const tabTitle = document.getElementById("tab-title");
const tabUrl = document.getElementById("tab-url");
const tabStatus = document.getElementById("tab-status");

function setStatus(text, type = "") {
  tabStatus.textContent = text;
  tabStatus.className = `status${type ? ` ${type}` : ""}`;
}

function truncate(text, max) {
  if (!text) return "";
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

function refreshTabState() {
  chrome.runtime.sendMessage({ type: "get-active-tab-state" }, (response) => {
    if (chrome.runtime.lastError || !response?.ok) {
      tabTitle.textContent = "Unable to read current tab";
      tabUrl.textContent = "";
      launchButton.disabled = true;
      setStatus("Try reopening the popup.", "error");
      return;
    }

    tabTitle.textContent = truncate(response.title || "Untitled page", 70);
    tabUrl.textContent = truncate(response.url || "", 120);

    if (response.restricted) {
      launchButton.disabled = true;
      setStatus("This browser page does not allow script injection.", "error");
      return;
    }

    launchButton.disabled = false;
    setStatus("Ready to launch on this page.");
  });
}

launchButton.addEventListener("click", () => {
  launchButton.disabled = true;
  setStatus("Launching selector…");

  chrome.runtime.sendMessage({ type: "inject-selector" }, (response) => {
    if (chrome.runtime.lastError || !response?.ok) {
      launchButton.disabled = false;
      setStatus("Launch failed. Try refreshing the page.", "error");
      return;
    }

    setStatus("Selector launched on the current page.", "success");
    window.setTimeout(() => window.close(), 500);
  });
});

refreshTabState();
