const express = require("express");
const Joi = require("joi");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");
router.use(express.json());
const Work = require("../models/work");
const auth = require("../middleware/auth");

router.post("/", [auth], async (req, res) => {
  //console.log(req.username);
  const { err } = validation(
    req.username,
    req.body.details,
    req.body.client,
    req.body.cost,
    req.body.faculty_involved
  );
  if (err) {
    return res.status(401).send(err.details[0].message);
  }
  const check = await Work.findOne({
    client: req.body.client,
    username: req.username,
  });
  if (check != null) {
    /*
        await Book.upfaculty_involvedOne({username : req.username},{
            $set : 
            { 
                name: req.body.name,
                phno: req.body.phno,
                designation : req.body.designation,
                faculty_involvedOfJoin : req.body.faculty_involvedOfJoin,
                qualification : req.body.qualification
            }
        });*/
    res.status(409).send("This Work already exists");
  } else {
    let work = new Work({
      username: req.username,
      details: req.body.details,
      client: req.body.client,
      cost: req.body.cost,
      faculty_involved: req.body.faculty_involved,
    });
    work = await work.save();
    res.status(200).send("Data added successfully");
  }
  //res.status(201).json(user);
});

function validation(username, details, client, client, cost, faculty_involved) {
  const schema = Joi.object({
    email: Joi.string().required(),
    details: Joi.string().required(),
    client: Joi.string().required(),
    cost: Joi.string().required(),
    faculty_involved: Joi.string().required(),
  });
  return schema.valifaculty_involved({
    email: username,
    details: details,
    client: client,
    cost: cost,
    faculty_involved: faculty_involved,
  });
}
module.exports = router;
