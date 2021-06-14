var express = require('express');
var app = express();
app.set("view engine","ejs");
app.use(express.static(__dirname+'/public'));

app.get('/', (req,res)=> {
    res.render("index");
});

app.get('/dashboard', (req,res)=> 
{
        // Initialize Firebase
        res.render("dashboard");
});

app.listen(3000,()=>
{
    console.log("System is running...");
    //firebase.initializeApp(firebaseConfig);
});