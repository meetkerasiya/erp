const express = require("express");
const Joi = require("joi");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");
router.use(express.json());
const Expert = require("../models/exprert_talk");
const auth = require("../middleware/auth");

router.post("/", [auth], async (req, res) => {
  //console.log(req.username);
  const { err } = validation(
    req.username,
    req.body.title_talk,
    req.body.title_program,
    req.body.title,
    req.body.date,
    req.body.vanue,
    req.body.faculty_name,
    req.body.initiation_letter,
    req.body.appreciation_letter
  );
  if (err) {
    return res.status(401).send(err.details[0].message);
  }
  const check = await Expert.findOne({ title_talk: req.body.title_talk });
  if (check != null) {
    res.status(409).send("This Expert talk already exists");
  } else {
    let expert = new Expert({
      username: req.username,
      title_talk: req.body.title_talk,
      title_program: req.body.title_program,
      date: req.body.date,
      venue: req.body.venue,
      faculty_name: req.body.faculty_name,
      initiation_letter: req.body.initiation_letter,
      appreciation_letter: req.body.appreciation_letter,
    });
    expert = await expert.save();
    res.status(200).send("Data added successfully");
  }
  //res.status(201).json(user);
});

function validation(
  username,
  title_talk,
  title_program,
  title,
  date,
  vanue,
  faculty_name,
  initiation_letter,
  appreciation_letter
) {
  const schema = Joi.object({
    email: Joi.string().required(),
    title_talk: Joi.string().required(),
    title_program: Joi.string().required(),
    date: Joi.string().required(),
    vanue: Joi.string().required(),
    faculty_name: Joi.string().required(),
    initiation_letter: Joi.string(),
    appreciation_letter: Joi.string(),
  });
  return schema.validate({
    email: username,
    title_talk: title_talk,
    title_program: title_program,
    title: title,
    date: date,
    vanue: vanue,
    faculty_name: faculty_name,
    initiation_letter: initiation_letter,
    appreciation_letter: appreciation_letter,
  });
}
module.exports = router;
