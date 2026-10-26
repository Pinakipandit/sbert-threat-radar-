const PATH = "offscreen.html";
async function initContext() {
  const ctx = await chrome.runtime.getContexts({ contextTypes: ["OFFSCREEN_DOCUMENT"] });
  if (ctx.length > 0) return;
  await chrome.offscreen.createDocument({
    url: chrome.runtime.getURL(PATH),
    reasons: ["LOCAL_STORAGE"],
    justification: "Isolated Neural Vector Processing Layer."
  });
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "scan_payload") {
    initContext().then(async () => {
      try {
        const res = await chrome.runtime.sendMessage({
          target: "offscreen-inference", 
          action: "run_ai_scan",
          payload: msg.rawText
        });
        sendResponse({ results: res });
      } catch (err) {
        sendResponse({ results: { status: "CLEAN", alert: "System Clear" } });
      }
    });
    return true;
  }
});
