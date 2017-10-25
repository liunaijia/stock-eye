export const setBadge = (text = '') => {
  if (!chrome) { return; }

  chrome.browserAction.setBadgeText({ text });
};

export const sendMessage = message => new Promise((resolve) => {
  // convert the original callback to promise
  if (!chrome) { return; }
  chrome.runtime.sendMessage(message, resolve);
});
