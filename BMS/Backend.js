// define with a variable of the method
require("dotenv").config();
const a= require("express");
const mongoose = require("mongoose");

const path=require("path");

// mentioning the function with variable
const app= a();

// it is used to check the directory path of the file and also it cannot change the path of the file when we gave static 
app.use(a.static(__dirname));

// it was used to make a structure of the pgm ku using the binary code to normal code
app.use(a.urlencoded({extended:true}));

// it is used the connect the backend 
mongoose.connect(`${process.env.MONGODB_URL}`);


const check=mongoose.connection;

// it is used to check the data is connected or not
check.once('open',function(req,res){
    console.log("MONGODB- connected");
})

// it is used to define the schema of the connection
const database_type= new mongoose.Schema({ 
    phone:String,
    password:String,
    email:String
})

//it was used to store the data in the collection//datatype  
const collection=mongoose.model("Data_Stored",database_type);
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,"Sign_in.html"));
})

// when i press the submit button the data will store in the database by using the collection name
app.post("/post",async function(req,res) {
    const{phone,password,email}=req.body;
    
    const data=new collection({
        phone,password,email
    })
    await data.save();

// after the data is stored it will display the data in the console and the next page will be displayed
    console.log(data);
    res.sendFile(path.join(__dirname,"login.html"))
});

// it will display the login page path 
app.get('/login',function(req,res){
    res.sendFile(path.join(__dirname,"login.html"))// this line is used to reterive the direct login file and also act as a link that show in the chrome
});

// post method is used to check the details that i saved in the login page that will check the detail in sign.in page
app.post('/BookMyShow',async function(req,res) {
    const{phone,password,email}=req.body;

    const chk=await collection.findOne({phone,password,email});

    if(chk){
        res.sendFile(path.join(__dirname,"home.html"))
    }
    else{
        res.send("Invalid Email or Password");
    }
    
}) 

// port number is used to display the content in the browser
app.listen(2025,()=>{
    console.log("http://localhost:2025");
})