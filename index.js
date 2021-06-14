var express = require('express');
var app = express();
var firebase = require('firebase/app');
require("firebase/auth");
require("firebase/firestore");
app.set("view engine","ejs");
app.use(express.static(__dirname+'/public'));
var firebaseConfig = {
    apiKey: "AIzaSyBhT_UgYabv0UZ0KoHw082biu2S4SEyNbw",
    authDomain: "onetimepassword-f8dc6.firebaseapp.com",
    projectId: "onetimepassword-f8dc6",
    storageBucket: "onetimepassword-f8dc6.appspot.com",
    messagingSenderId: "344320674572",
    appId: "1:344320674572:web:b9cf6aeede0c7289aad729",
    measurementId: "G-WNQW4QSNM1"
};
app.get('/', (req,res)=> {
    res.render("index");
});

app.get('/dashboard', (req,res)=> 
{
        // Initialize Firebase
        res.render("dashboard");
});
app.get('/add_passcode/', (req,res)=> 
{
        // Initialize Firebase
        res.render("add_passcode");
});

app.listen(process.env.PORT||5000,()=>
{
    console.log("System is running...");
    //firebase.initializeApp(firebaseConfig);
});