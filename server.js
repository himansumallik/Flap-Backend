const express = require('express')
const cors = require("cors");
const app = express()
const fs = require('fs')
const { isEmailValid, getUserWithEmail } = require('./authentication')

var bodyParser = require('body-parser');
const { users } = require('./database');
const {userPostRecord} = require('./userPostRecord')

app.use(cors())
app.use(bodyParser.json())

app.get('/',(req, res, next)=> {
    res.send("hello")
})

app.post("/signin", (req, res)=>{
    try{
        const data = req.body;
        if(!data.email){
            throw new Error("Email is required");
        }

        if(!data.password){
            throw new Error("Password is required");
        }

        if(!isEmailValid(data.email)){
            throw new Error("User with this email doesn't exist");
        }

        const user = getUserWithEmail(data.email);
        if(user.password !== data.password){
            throw new Error("Incorrect Password");
        }
        
    }
    catch(error){
        return res.send({success: false, message: error.message})
    }
    
    res.send({success: true})
})

app.post("/signup", (req, res)=>{
    try{
        const data = req.body;
        if(!data.email){
            throw new Error("Email is required");
        }

        for(let i = 0; i< users.length; i++){
            if(data.email === users[i].email){
                throw new Error("User already exists.")
            }
        }

        if(!data.password){
            throw new Error("Password is required");
        }
        

        const user = {
            email: data.email,
            password: data.password
        }
        users.push(user)
        fs.writeFileSync("users.json", JSON.stringify(users));
    }
    catch(error){
        return res.send({success: false, message: error.message})
    }
    
    res.send({success: true})
})

app.post("/postpage", (req, res)=>{
    try{
        const data = req.body;
        if(!data){
            throw new Error("Post area is empty");
        }
        
        eachUserpost = {
            email: data.email,
            post: data.text,
            time: new Date()
        } 

        userPostRecord.push(eachUserpost);
        fs.writeFileSync("userPostRecord.json", JSON.stringify(userPostRecord));
    }
    catch(error){
        return res.send({success: false, message: error.message})
    }
    
    res.send({success: true})
})


app.get("/allposts", (req, res) => {
    try{
        return res.send({success: true, data: userPostRecord})
    }catch(error){
        return res.send({success: false, message: "Error retrieving posts"})
    }
})

app.listen(8000, () => {
    console.log('Flap Backend Server running on port 8000...')
})
