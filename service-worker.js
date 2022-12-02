  self.addEventListener("install", function (event) {
  console.log('Service worker install event!');
  const cacheName = 'static-shell-v1';
  const resourcesToPrecache = [
   
    '/',
    '/chat.html',
    '/proposal.html',
    '/dashboard.html',
    '/signin.html',
     '/aboutus.html',
     '/sitemap.html'
    ];
  event.waitUntil(
    caches.open(cacheName) 
  .then(function (cache) {
    return cache.addAll(resourcesToPrecache);
    })
  );
  });

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
    );
  });
/*
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import { getMessaging , onBackgroundMessage} from "https://www.gstatic.com/firebasejs/9.9.3/firebase-messaging-sw.js";

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseConfig = {
    apiKey: "AIzaSyAN-X9u7n7QnM8RLrVV4YnXq2MmVz6WNfw",
    authDomain: "em-issyoo.firebaseapp.com",
    projectId: "em-issyoo",
    storageBucket: "em-issyoo.appspot.com",
    messagingSenderId: "33480809995",
    appId: "1:33480809995:web:74df1e056f7638d0b5310e",
    measurementId: "G-C64NWHRT0Y"
  };

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = getMessaging(firebaseApp);
onBackgroundMessage(messaging, (payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
*/
