const express=require("express");
const Joi = require("joi");
const router=express.Router();
const jwt=require("jsonwebtoken");
const config=require("config");
const mongoose=require("mongoose")
router.use(express.json());
const Event=require("../models/event")
const auth=require("../middleware/auth");

router.post("/",[auth],async (req,res)=>{
    //console.log(req.username);
    const {err} =validation(req.username,req.body.type,req.body.cordinator,req.body.title,req.body.start_date,req.body.end_date,
                    req.body.no_of_participants,req.body.sponsor,req.body.for_whome,req.body.report);
    if(err)
    {
        return res.set(401).send(err.details[0].message);
    }
    const check=await Event.findOne({title: req.body.title});
    if(check != null)
    {
        res.send("This Event already exists")
    }
    else
    {
        let event=new Event({
            username: req.username,
            type: req.body.type,
            cordinator: req.body.cordinator,
            title : req.body.title,
            start_date : req.body.start_date,
            end_date : req.body.end_date,
            no_of_participants: req.body.no_of_participants,
            sponsor: req.body.sponsor,
            for_whome: req.body.for_whome,
            report: req.body.report
        });
        event=await event.save();
        res.send("Data added successfully")


    }
    //res.status(201).json(user);
    }
);

function validation(username,type,cordinator,title,start_date,end_date,no_of_participants,sponsor,for_whome,report)
{
    const schema=Joi.object({
        email: Joi.string().required(),
        type: Joi.string().required(),
        cordinator: Joi.string().required(),
        title: Joi.string().required(),
        start_date: Joi.string().required(),
        end_date: Joi.string().required(),
        no_of_participants: Joi.number().required(),
        sponsor: Joi.string(),
        for_whome: Joi.string().required(),
        report: Joi.string()

    });
    return schema.validate({ 
        email: username,
        type: type,
        cordinator : cordinator,
        title : title,
        start_date: start_date,
        end_date: end_date,
        no_of_participants: no_of_participants,
        sponsor: sponsor,
        for_whome: for_whome,
        report: report
    });
}
module.exports = router;