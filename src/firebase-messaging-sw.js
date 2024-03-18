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
    measurementId: "G-S8SSWNQM35",
    vapidKey: "BMhKofTDgGHrH4wa8iQSJVqvGlRk1yW29a6ch8bX2TKxKGM7FT8AnApWtT6j-m3dd3CqoyrP6iuk8Jz73RQ8rx4"
});
console.log(firebase)
messaging = firebase.messaging()
