import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const rootDir = "/Users/Yuki/web-element-selector";
const extensionPath = rootDir;
const assetsDir = path.join(rootDir, "assets", "marketing");
const port = 4173;

const server = http.createServer((req, res) => {
  const urlPath = req.url === "/" ? "/assets/marketing/demo-page.html" : req.url;
  const safePath = path.normalize(decodeURIComponent(urlPath)).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(rootDir, safePath);

  if (!filePath.startsWith(rootDir)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }

    const ext = path.extname(filePath);
    const type = ({
      ".html": "text/html; charset=utf-8",
      ".css": "text/css; charset=utf-8",
      ".js": "text/javascript; charset=utf-8",
      ".svg": "image/svg+xml",
      ".png": "image/png"
    })[ext] || "application/octet-stream";

    res.writeHead(200, { "Content-Type": type });
    res.end(data);
  });
});

await new Promise((resolve) => server.listen(port, resolve));

const userDataDir = path.join(rootDir, ".tmp", "marketing-browser");
fs.mkdirSync(userDataDir, { recursive: true });

const context = await chromium.launchPersistentContext(userDataDir, {
  headless: true,
  viewport: { width: 1440, height: 980 },
  args: []
});

try {
  const page = await context.newPage();
  await page.goto(`http://127.0.0.1:${port}/assets/marketing/demo-page.html`, { waitUntil: "networkidle" });

  await page.screenshot({
    path: path.join(assetsDir, "readme-screenshot-selector.png"),
    clip: { x: 64, y: 110, width: 1312, height: 770 }
  });

  await page.addStyleTag({ path: path.join(rootDir, "assets", "editor.css") });
  await page.addScriptTag({ path: path.join(rootDir, "assets", "editor.js") });
  await page.waitForTimeout(500);

  await page.mouse.click(320, 244);
  await page.waitForTimeout(300);

  const promptInput = page.locator(".ai-editor-prompt-input");
  await promptInput.fill("Improve the visual hierarchy and spacing in this section.");
  await page.waitForTimeout(250);

  await page.screenshot({
    path: path.join(assetsDir, "readme-screenshot-overlay.png"),
    clip: { x: 50, y: 96, width: 1340, height: 792 }
  });

  await page.screenshot({
    path: path.join(assetsDir, "readme-screenshot-copy.png"),
    clip: { x: 910, y: 140, width: 420, height: 640 }
  });

  const popupPage = await context.newPage();
  await popupPage.addInitScript(() => {
    window.chrome = {
      runtime: {
        lastError: null,
        sendMessage(message, callback) {
          if (message?.type === "get-active-tab-state") {
            callback({
              ok: true,
              restricted: false,
              url: "http://127.0.0.1:4173/assets/marketing/demo-page.html",
              title: "Web Element Selector Demo Page"
            });
            return;
          }
          if (message?.type === "get-last-launch") {
            callback({
              ok: true,
              lastLaunch: {
                title: "Web Element Selector Demo Page",
                url: "http://127.0.0.1:4173/assets/marketing/demo-page.html",
                at: Date.now() - 3 * 60 * 1000
              }
            });
            return;
          }
          if (message?.type === "inject-selector") {
            callback({ ok: true });
            return;
          }
          callback({ ok: true });
        }
      }
    };
  });
  await popupPage.goto(`http://127.0.0.1:${port}/popup.html`, { waitUntil: "networkidle" });
  await popupPage.setViewportSize({ width: 410, height: 930 });
  await popupPage.screenshot({
    path: path.join(assetsDir, "readme-screenshot-popup.png"),
    clip: { x: 0, y: 0, width: 410, height: 930 }
  });

  const optionsPage = await context.newPage();
  await optionsPage.addInitScript(() => {
    window.chrome = {
      runtime: {
        lastError: null,
        sendMessage(message, callback) {
          if (message?.type === "get-options") {
            callback({
              ok: true,
              options: {
                promptTarget: "codex",
                exportMode: "safe",
                contextMode: "focused",
                globalInstruction: "Improve the visual hierarchy and spacing in this section."
              }
            });
            return;
          }
          if (message?.type === "set-options") {
            callback({ ok: true, options: message.options });
            return;
          }
          callback({ ok: true });
        }
      }
    };
  });
  await optionsPage.goto(`http://127.0.0.1:${port}/options.html`, { waitUntil: "networkidle" });
  await optionsPage.setViewportSize({ width: 1400, height: 980 });
  await optionsPage.screenshot({
    path: path.join(assetsDir, "readme-screenshot-options.png"),
    fullPage: true
  });
} finally {
  await context.close();
  await new Promise((resolve) => server.close(resolve));
}
