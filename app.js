var firebase = require("firebase");

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3nwgsNmYbtjCgIAxKKqun6_oAwqe8-kU",
  authDomain: "assignment-9a745.firebaseapp.com",
  databaseURL: "https://assignment-9a745-default-rtdb.firebaseio.com",
  projectId: "assignment-9a745",
  storageBucket: "assignment-9a745.appspot.com",
  messagingSenderId: "963204378873",
  appId: "1:963204378873:web:abe42fa7e084f45319b228",
  measurementId: "G-9FHYKT6WCD"
};

firebase.initializeApp(firebaseConfig);

const ref = firebase.database().ref();

// var email = "masnoon";
// var password = "";



