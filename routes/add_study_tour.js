const express=require("express");
const Joi = require("joi");
const router=express.Router();
const jwt=require("jsonwebtoken");
const config=require("config");
const mongoose=require("mongoose")
router.use(express.json());
const Study_tour=require("../models/study_tour")
const auth=require("../middleware/auth");

router.post("/",[auth],async (req,res)=>{
    //console.log(req.username);
    const {err} =validation(req.username,req.body.date,req.body.place,req.body.no_of_students);
    if(err)
    {
        return res.set(401).send(err.details[0].message);
    }
    const check=await Study_tour.findOne({date: req.body.date});
    if(check != null)
    {/*
        await Book.updateOne({username : req.username},{
            $set : 
            { 
                name: req.body.name,
                phno: req.body.phno,
                designation : req.body.designation,
                dateOfJoin : req.body.dateOfJoin,
                qualification : req.body.qualification
            }
        });*/
        res.send("This Study_tour already exists")
    }
    else
    {
        let study_tour=new Study_tour({
            username: req.username,
            date: req.body.date,
            place : req.body.place,
            no_of_students : req.body.no_of_students,
           
        });
        study_tour=await study_tour.save();
        res.send("Data added successfully")


    }
    //res.status(201).json(user);
    }
);

function validation(username,date,place,no_of_students)
{
    const schema=Joi.object({
        email: Joi.string().required(),
        date: Joi.date().required(),
        place: Joi.string().required(),
        no_of_students: Joi.string().required(),
        
    });
    return schema.validate({
        email: username,
        date: date,
        date : date,
        place : place,
        no_of_students: no_of_students,
      
    });
}
module.exports = router;