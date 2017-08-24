export const setBadge = (text = '') => {
  chrome.browserAction.setBadgeText({ text });
};

export const sendNotification = ({
  title = '',
  message = '',
  iconUrl = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' } = {}) => {
  chrome.notifications.create({ type: 'basic', title, message, iconUrl });
  // An easier way for notification is using Notification WebAPI:
  // `new Notification(title, { body });`
  // However the messages sent by Notification API come up with the website domain which is
  // needless.
};

export const sendMessage = message => new Promise((resolve) => {
  // convert the original callback to promise
  chrome.runtime.sendMessage(message, resolve);
});
