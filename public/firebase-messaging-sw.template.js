console.log("🔥 Service Worker Loaded");

self.addEventListener("push", (event) => {
  console.log("🔥 PUSH EVENT", event);
});

importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "__API_KEY__",
  authDomain: "__AUTH_DOMAIN__",
  projectId: "__PROJECT_ID__",
  storageBucket: "__STORAGE_BUCKET__",
  messagingSenderId: "__MESSAGING_SENDER_ID__",
  appId: "__APP_ID__",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {

  console.log("🔥 Background Message Received", payload);

  try {
    console.log("Before showNotification");

    self.registration.showNotification(
      payload.notification?.title || "",
      {
        body: payload.notification?.body || "",
        icon: "/logo.png",
        badge: "/logo.png",
        data: payload.data,
        tag: payload.messageId,
        requireInteraction: false,
      }
    );

    console.log("Notification displayed");
  } catch (err) {
    console.error("showNotification failed", err);
  }

});

self.addEventListener("push", (event) => {
  console.log("🔥 PUSH EVENT");

  if (event.data) {
    console.log(event.data.text());

    try {
      console.log(JSON.parse(event.data.text()));
    } catch (e) {
      console.log("Not JSON");
    }
  }
});