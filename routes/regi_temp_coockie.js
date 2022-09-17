const express=require("express");
const Joi = require("joi");
const router=express.Router();
const jwt=require("jsonwebtoken");
const config=require("config");
const mongoose=require("mongoose")
router.use(express.json());
const User = require('../models/user');
var cors = require('cors');
const { application, response } = require("express");

var corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200 
  };
router.use(cors)
router.post("/",cors(corsOptions),async (req,res)=>{
    const {err} =validation(req.body.username,req.body.password);
    if(err)
    {
        const response=JSON.stringify({msg: err.details[0].message});
        res.cookie('response', response);
        res.redirect("http://localhost:3000/ans");

       // return res.set(401).send(JSON.stringify({msg: err.details[0].message}));
    }
    const check=await User.findOne({username: req.body.username, password : req.body.password});
    if(check != null)
    {
        const response=JSON.stringify({success:true, msg: "user already exists"});
        res.cookie('response', response);
        
        //return res.status(201).json({success:true, msg: "user already exists"})
        /*res.json({msg: "user alreay exists"});
        return;*/
       // return res.set(409).json({msg: "User already exists"});
    }
    let user=new User({
        username: req.body.username,
        password: req.body.password
    });
    user=await user.save();
    user=await User.findOne({username: req.body.username, password : req.body.password});
    const token= jwt.sign({username : req.body.username, password: req.body.password}, config.get("jwtPrivateKey"));
    res.set(200).header("x-auth-token",token).send(JSON.stringify({token: token})).redirect("http://localhost:3000/ans");

    //res.status(201).json(user); 
    }
);

function validation(username,password)
{
    const schema=Joi.object({
        name: Joi.string().required(),
        pass: Joi.string().required(),
    });
    return schema.validate({
        name: username,
        pass: password
    });
}
module.exports = router;