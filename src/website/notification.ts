export async function sendNotification(options: NotificationOptions & {title: string}): Promise<void> {
  if (!('Notification' in window)) {
    return;
  }

  if (Notification.permission === 'default') {
    await Notification.requestPermission();
  }

  if (Notification.permission === 'granted') {
    // eslint-disable-next-line no-new
    new Notification(options.title, options);
  }
}
