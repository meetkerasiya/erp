const express = require("express");
const Joi = require("joi");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");
router.use(express.json());
const Faculty_workshop = require("../models/faculty_workshop");
const auth = require("../middleware/auth");

router.post("/", [auth], async (req, res) => {
  //console.log(req.username);
  const { err } = validation(
    req.username,
    req.body.start_date,
    req.body.end_date,
    req.body.expert,
    req.body.title,
    req.body.type,
    req.body.funding_agency,
    req.body.certificate,
    req.body.report
  );
  if (err) {
    return res.status(401).send(err.details[0].message);
  }
  const check = await Faculty_workshop.findOne({ title: req.body.title });
  if (check != null) {
    res.status(409).send("This Faculty_workshop already exists");
  } else {
    let faculty_workshop = new Faculty_workshop({
      username: req.username,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      expert: req.body.expert,
      title: req.body.title,
      type: req.body.type,
      funding_agency: req.body.funding_agency,
      certificate: req.body.certificate,
      report: req.body.report,
    });
    faculty_workshop = await faculty_workshop.save();
    res.status(200).send("Data added successfully");
  }
  //res.status(201).json(user);
});

function validation(
  username,
  start_date,
  end_date,
  expert,
  title,
  type,
  funding_agency,
  certificate,
  report
) {
  const schema = Joi.object({
    email: Joi.string().required(),
    start_date: Joi.date().required(),
    end_date: Joi.date().required(),
    title: Joi.string().required(),
    type: Joi.string().required(),
    funding_agency: Joi.string(),
    certificate: Joi.string(),
    report: Joi.string(),
  });
  return schema.validate({
    email: username,
    start_date: start_date,
    end_date: end_date,
    expert: expert,
    title: title,
    type: type,
    funding_agency: funding_agency,
    certificate: certificate,
    report: report,
  });
}
module.exports = router;
