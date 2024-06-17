// service-worker.js
self.addEventListener('push', function(event) {
  const data = event.data.json()
  const options = {
    body: data.body,
    icon: 'icon-192x192.png',
    badge: 'icon-192x192.png',
    data: {
      url: data.url
    }
  };
  event.waitUntil(
    self.registration.showNotification(data.title, options)
    );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled; true }).then(windowClients => {
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        if (client.url === event.notification.data.url && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(event.notification.data.url);
      }
    })
  );
});
