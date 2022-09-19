const express=require("express");
const Joi = require("joi");
const router=express.Router();
const jwt=require("jsonwebtoken");
const config=require("config");
const mongoose=require("mongoose")
router.use(express.json());
const research_and_dev=require("../models/research_and_dev")
const auth=require("../middleware/auth");

router.post("/",[auth],async (req,res)=>{
    //console.log(req.username);
    const {err} =validation(req.username,req.body.cordinator,req.body.title,req.body.funding_agency,req.body.amount,req.body.date);
    if(err)
    {
        return res.set(401).send(err.details[0].message);
    }
    const check=await Rnd.findOne({title: req.body.title});
    if(check != null)
    {/*
        await Book.upamountOne({username : req.username},{
            $set : 
            { 
                name: req.body.name,
                phno: req.body.phno,
                designation : req.body.designation,
                amountOfJoin : req.body.amountOfJoin,
                qualification : req.body.qualification
            }
        });*/
        res.send("This Rnd already exists")
    }
    else
    {
        let rnd=new Rnd({
            username: req.username,
            cordinator: req.body.cordinator,
            title: req.body.title,
            funding_agency : req.body.funding_agency,
            amount : req.body.amount,
            date:req.body.date,
            
        });
        rnd=await rnd.save();
        res.send("Data added successfully")


    }
    //res.date(201).json(user);
    }
);

function validation(username,cordinator,title,title,funding_agency,amount,date)
{
    const schema=Joi.object({
        email: Joi.string().required(),
        cordinator: Joi.string().required(),
        title: Joi.string().required(),
        funding_agency: Joi.string().required(),
        amount: Joi.string().required(),
        date:Joi.date().required(),
        
    });
    return schema.valiamount({
        email: username,
        cordinator: cordinator,
        title : title,
        funding_agency: funding_agency,
        amount: amount,
        date:date,
       
    });
}
module.exports = router;