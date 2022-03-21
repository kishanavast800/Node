const http = require('http')
const express = require('express')
const localhost = '127.0.0.1'
const port = process.env.PORT ||80
const path = require('path')
const mongoose = require('mongoose')
const app = express();
require("./db/conn")
const hbs = require('hbs');
const Register = require("./models/register")
const static_path = path.join(__dirname,"../public")
const tempalte_path = path.join(__dirname,"../tempaltes/views")
const partials_path = path.join(__dirname,"../tempaltes/partials")
app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",tempalte_path);
hbs.registerPartials(partials_path)
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.get('/',(req,res)=>{
    res.render("index");
})
// app.get('/',(req,res)=>{
//     res.send("hello hjm");
// })

app.get("/login",(req,res)=>{
    res.render('login');
})
app.get("/register",(req,res)=>{
    res.render('register');
})
app.post("/register",async(req,res)=>{
    //res.render('register');
    try{
        const pass = req.body.psw;
        const cpass = req.body.confirmPass;

        if(pass=== cpass)
        {
            const registerEmployee = new Register({
             name : req.body.name,
             email:req.body.email,
             psw:req.body.psw,
             confirmPass:req.body.confirmPass   
            })

            const registered = await registerEmployee.save();
            res.status(200).render("index");
        }else{
            res.send("password not same")
        }
    }catch(e){
        res.status(400).send(`${e}`);
    }
})

app.get("/login",(req,res)=>{
    res.render('login');
})

app.post("/login",async(req,res)=>{
    //res.render('login');
    try{
        const name = req.body.name;
        const pass =req.body.psw;
       const username =await Register.findOne({name:name})
       res.send(username);
       console.log(username);
    }catch(e){
        res.send(`invalid ${e}`)
    }
})
app.listen(port,localhost,()=>{
    console.log(`server:http://${localhost}:${port}`);
})