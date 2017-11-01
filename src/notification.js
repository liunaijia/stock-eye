export const sendNotification = ({
  title = '',
  body = '',
  // iconUrl = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
} = {}) => {
  // There are two ways to send notifications.

  // Notification WebAPI is more generic than chrome private API. However the messages sent by
  // Notification API come up with the website domain which is needless.
  new Notification(title, { body }); // eslint-disable-line no-new

  // Alternately chrome private API can be used, but Webpack Dev Server doesn't like it.
  // chrome.notifications.create({
  //   type: 'basic', title, message, iconUrl,
  // });
};

