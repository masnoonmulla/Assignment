var firebase = require("firebase");
var jwt = require('jsonwebtoken');

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

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
var email = "";
var password = "";

ref.on("value", function (snapshot) {
    var users = snapshot.val().users;
    email = users.email;
    password = users.password;
});

var express = require('express');

var app = express();
app.set("view engine", "ejs");

app.use(express.urlencoded({
    extended: true
}));


app.get('/', function (req, res) {
    var token = localStorage.getItem('auth_token');
    var jwtToken = "";
    ref.on("value", function (snapshot) {
        var users = snapshot.val().users;
        jwtToken = users.jwtToken
    });
    if (token == jwtToken) {
        res.redirect("/dashboard");
    } else {
        res.render('example');
    }
});

app.get('/dashboard', function (req, res) {
    var token = localStorage.getItem('auth_token');
    var jwtToken = "";
    ref.on("value", function (snapshot) {
        var users = snapshot.val().users;
        jwtToken = users.jwtToken
    });
    if (token == jwtToken) {
        res.render('dashboar');
    } else {
        res.redirect('/');
    }
    
});

app.post('/login-auth', function (req, res) {
    if (email == req.body.username && password == req.body.password) {
        var date = new Date();
        var date_time = date.getDate() + "" + date.getHours() + "" + date.getMinutes() + "" + date.getSeconds();

        var token = jwt.sign({ date: date_time }, "assingment");
        console.log(jwt.decode(token));
        localStorage.setItem('auth_token', token);

        var updates = {};
        updates['/jwtToken'] = token;
        ref.child('users').update(updates);
        res.redirect('/dashboard');
    } else {
        res.redirect('/');
    }

});

app.listen(3000);