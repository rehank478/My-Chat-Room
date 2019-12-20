const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const md5 = require("md5");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost:27017/ChatDB", {useNewUrlParser: true, useUnifiedTopology: true});

const registerSchema = mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    password: String
});

const Register = mongoose.model("Register", registerSchema);

app.post("/register", function(req,res){
    const registerNewUser = new Register({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: md5(req.body.password)
    });
    registerNewUser.save(function(err){
        if(!err){
            res.send("User Register Successfully");
        }else{
            console.log(err);
            
        }
    });
}); 

var whichUser = "";

const loginSchema = mongoose.Schema({
    email: String,
    password: String
});

const Login = mongoose.model("Login", loginSchema);

app.post("/login", function(req,res){
    Register.findOne({email: req.body.email}, function(err,data){
        if(data){
            if(data.password === md5(req.body.password)){
                whichUser = data.fname;
                res.send("yes");
            }else{
                console.log("Incorrect Password");
            }
        }else{
            console.log("You Dont Have Account");
            
        }
    });
});


const messageSchema = mongoose.Schema({
    key: Number,
    userName: String,
    message: String
});

const Message = mongoose.model("Message", messageSchema);

app.post("/message", function(req,res){
    const newMessage = Message({
        key: 1,
        userName: req.body.userName,
        message: req.body.message
    });
    newMessage.save(function(err){
        if(!err){
            console.log("Message Sent Successfully");
            
        }else{
            console.log("Message Not Sent");
            
        }
    })
})

console.log(whichUser);


app.get("/user", function(req,res){
    res.send(whichUser);
});


app.get("/show", function(req,res){
    Message.find({key: 1}, function(err,messages){
        if(messages){
            res.send(messages);
        }else{
            console.log("No messages found");
        }
    });
});

const sessionSchema = mongoose.Schema({
    email: String,
    loggedIn: Boolean
});

const Session = mongoose.model("Session", sessionSchema);

app.post("/logged", function(req,res){
    const logInfo = new Session({
        email: req.body.email,
        loggedIn: req.body.loggedIn
    });
    logInfo.save(function(err){
        if(!err){
            console.log("Logged In");
            
        }else{
            console.log("Login Failed");
            
        }
    }); 
});


app.listen(5000, function(){
    console.log("server is running on port 5000");
});