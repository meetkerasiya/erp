const express = require("express");
const Joi = require("joi");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");
router.use(express.json());
const Profile = require("../models/profile");
const auth = require("../middleware/auth");

router.post("/", [auth], async (req, res) => {
  //console.log(req.username);
  const { err } = validation(
    req.username,
    req.body.name,
    req.body.phno,
    req.body.designation,
    req.body.dateOfJoin,
    req.body.qualification
  );
  if (err) {
    return res.status(401).send(err.details[0].message);
  }
  const check = await Profile.findOne({ username: req.username });
  if (check != null) {
    await Profile.updateOne(
      { username: req.username },
      {
        $set: {
          name: req.body.name,
          phno: req.body.phno,
          designation: req.body.designation,
          dateOfJoin: req.body.dateOfJoin,
          qualification: req.body.qualification,
        },
      }
    );
    res.status(201).send("Data updated successfully");
  } else {
    let profile = new Profile({
      username: req.username,
      name: req.body.name,
      phno: req.body.phno,
      designation: req.body.designation,
      dateOfJoin: req.body.dateOfJoin,
      qualification: req.body.qualification,
    });
    profile = await profile.save();
    res.status(200).send("Data added successfully");
  }
  //res.status(201).json(user);
});

function validation(
  username,
  name,
  phno,
  designation,
  dateOfJoin,
  qualification
) {
  const schema = Joi.object({
    email: Joi.string().required(),
    uname: Joi.string().required(),
    phone: Joi.string().required(),
    post: Joi.string().required(),
    joindate: Joi.string().required(),
    qual: Joi.string().required(),
  });
  return schema.validate({
    email: username,
    uname: name,
    phone: phno,
    post: designation,
    joindate: dateOfJoin,
    qual: qualification,
  });
}
module.exports = router;
