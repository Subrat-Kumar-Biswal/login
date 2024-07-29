const express = require ("express");
const bodyParser = require ("body-parser");
const mongoose =  require ("mongoose");

let port = 3000;
const app = express();

app.use(express.static('./public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


mongoose.connect('mongodb://localhost:27017/LoginData');
var db = mongoose.connection
db.on('error', () => console.log("Error in connecting to database"))
db.once('open', () => console.log("Connected to the database"))



app.post("/login",async (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    
    
    const userData = await db.collection('user').findOne({email})
    // console.log(userData.email);
    if( userData.email === email && userData.password === password){
        res.redirect("dashboard.html")
    }else{
        res.send(`<h1>Wrong Password</h1><a href="login.html">Try Login Again </a>`) 
    }

})


app.post("/sign_up", (req, res) => {    // post requst
    var name = req.body.name
    var age = req.body.age
    var email = req.body.email
    var phone = req.body.phone
    var gender = req.body.gender
    var password = req.body.password

    var data = {
        "name": name,
        "age" : age,
        "email" : email,
        "phone": phone,
        "gender" : gender,
        "password" : password,
    }
    console.log(data)
    db.collection('user').insertOne(data, (err, collection) => {
        if(err){
            throw err
        }
        console.log("Record Insterd success fully");
    })
    return res.redirect('signup_successful.html')

    // check existing user
})
app.post("/user_data", (req, res) => {    // post requst
    var name = req.body.name
    var age = req.body.age
    var email = req.body.email
    var phone = req.body.phone
    var gender = req.body.gender
    var password = req.body.password

    var data = {
        "name": name,
        "age" : age,
        "email" : email,
        "phone": phone,
        "gender" : gender,
        "password" : password,
    }
    console.log(data)
    db.collection('user_data').insertOne(data, (err, collection) => {
        if(err){
            throw err
        }
        console.log("Record Insterd success fully");
    })
    // return res.redirect('signup_successful.html')

    // check existing user
})


app.get("/", (req, res) => {
    // res.set({
        //     "Allow-access-Allow-Origin":'*'
        // })
        res.redirect("login.html")
        // res.send("asdfasdf")
    
})

app.listen(port, ()=> {
    console.log("sever port on http://localhost:3000");
})


