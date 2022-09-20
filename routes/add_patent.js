const express = require("express");
const Joi = require("joi");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");
router.use(express.json());
const Patent = require("../models/patent");
const auth = require("../middleware/auth");

router.post("/", [auth], async (req, res) => {
  //console.log(req.username);
  const { err } = validation(
    req.username,
    req.body.faculty,
    req.body.title,
    req.body.application_no,
    req.body.date,
    req.body.status
  );
  if (err) {
    return res.status(401).send(err.details[0].message);
  }
  const check = await Patent.findOne({ title: req.body.title });
  if (check != null) {
    /*
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
    res.status(409).send("This Patent already exists");
  } else {
    let patent = new Patent({
      username: req.username,
      faculty: req.body.faculty,
      title: req.body.title,
      application_no: req.body.application_no,
      date: req.body.date,
      status: req.body.status,
    });
    patent = await patent.save();
    res.status(200).send("Data added successfully");
  }
  //res.status(201).json(user);
});

function validation(
  username,
  faculty,
  title,
  title,
  application_no,
  date,
  status
) {
  const schema = Joi.object({
    email: Joi.string().required(),
    faculty: Joi.string().required(),
    title: Joi.string().required(),
    application_no: Joi.string().required(),
    date: Joi.date().required(),
    status: Joi.string().required(),
  });
  return schema.validate({
    email: username,
    faculty: faculty,
    title: title,
    application_no: application_no,
    date: date,
    status: status,
  });
}
module.exports = router;
