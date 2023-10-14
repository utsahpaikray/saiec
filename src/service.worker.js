importScripts('https://www.gstatic.com/firebasejs/7.16.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.16.1/firebase-messaging.js');
firebase.initializeApp({
    apiKey: "AIzaSyAeL-ItFUqLEglbERDtFOUPfBBtqAiDfoM",
    authDomain: "saiecmatrutritha.firebaseapp.com",
    databaseURL: "https://saiecmatrutritha.firebaseio.com",
    projectId: "saiecmatrutritha",
    storageBucket: "saiecmatrutritha.appspot.com",
    messagingSenderId: "984054275412",
    appId: "1:984054275412:web:2fbfab0820c2cb8301bcc1",
    measurementId: "G-S8SSWNQM35"
});
// console.log(firebase)
const messaging = firebase.messaging();
onBackgroundMessage(messaging, (payload) => {
    // do whatever you want
  //  alert(payload, messaging)
  })
