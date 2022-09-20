const express = require("express");
const Joi = require("joi");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");
router.use(express.json());
const Phd = require("../models/phd");
const auth = require("../middleware/auth");

router.post("/", [auth], async (req, res) => {
  //console.log(req.username);
  const { err } = validation(
    req.username,
    req.body.title,
    req.body.date_of_completion,
    req.body.institute
  );
  if (err) {
    return res.status(401).send(err.details[0].message);
  }
  const check = await Phd.findOne({ title: req.body.title });
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
    res.status(409).send("This phd already exists");
  } else {
    let phd = new Phd({
      username: req.username,
      title: req.body.title,
      date_of_completion: req.body.date_of_completion,
      institute: req.body.institute,
    });
    phd = await phd.save();
    res.status(200).send("Data added successfully");
  }
  //res.status(201).json(user);
});

function validation(
  username,
  title,
  date_of_completion,
  institute,
  year,
  author,
  type,
  indexing,
  ISBN
) {
  const schema = Joi.object({
    email: Joi.string().required(),
    title: Joi.string().required(),
    date_of_completion: Joi.date().required(),
    institute: Joi.string().required(),
  });
  return schema.validate({
    email: username,
    title: title,
    title: title,
    date_of_completion: date_of_completion,
    institute: institute,
  });
}
module.exports = router;
