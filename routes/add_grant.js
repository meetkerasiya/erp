const express = require("express");
const Joi = require("joi");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");
router.use(express.json());
const Grant = require("../models/grant");
const auth = require("../middleware/auth");

router.post("/", [auth], async (req, res) => {
  //console.log(req.username);
  const { err } = validation(
    req.username,
    req.body.cordinator,
    req.body.project_title,
    req.body.funding_agency,
    req.body.amount
  );
  if (err) {
    return res.status(401).send(err.details[0].message);
  }
  const check = await Grant.findOne({ project_title: req.body.project_title });
  if (check != null) {
    /*
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
    res.status(409).send("This Grant already exists");
  } else {
    let grant = new Grant({
      username: req.username,
      cordinator: req.body.cordinator,
      project_title: req.body.project_title,
      funding_agency: req.body.funding_agency,
      amount: req.body.amount,
    });
    grant = await grant.save();
    res.status(200).send("Data added successfully");
  }
  //res.status(201).json(user);
});

function validation(
  username,
  cordinator,
  project_title,
  project_title,
  funding_agency,
  amount
) {
  const schema = Joi.object({
    email: Joi.string().required(),
    cordinator: Joi.string().required(),
    project_title: Joi.string().required(),
    funding_agency: Joi.string().required(),
    amount: Joi.string().required(),
  });
  return schema.validate({
    email: username,
    cordinator: cordinator,
    project_title: project_title,
    funding_agency: funding_agency,
    amount: amount,
  });
}
module.exports = router;
