importScripts('https://www.gstatic.com/firebasejs/10.10.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.10.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyDw4hjVKQAKk-4q_X80wKbA2Hd2CWk0j04",

    authDomain: "karu-cousellors.firebaseapp.com",
  
    projectId: "karu-cousellors",
  
    storageBucket: "karu-cousellors.firebasestorage.app",
  
    messagingSenderId: "122679199731",
  
    appId: "1:122679199731:web:2e5b94cec06165f9e7b486",
  
    measurementId: "G-41C9HQL3LM"
  
});

const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: '/images/pict.png'
  });
});
