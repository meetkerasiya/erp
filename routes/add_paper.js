const express = require("express");
const Joi = require("joi");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");
router.use(express.json());
const Paper = require("../models/paper");
const auth = require("../middleware/auth");

router.post("/", [auth], async (req, res) => {
  //console.log(req.username);
  const { err } = validation(
    req.username,
    req.body.type1,
    req.body.title,
    req.body.volume,
    req.body.issue,
    req.body.year,
    req.body.author,
    req.body.type,
    req.body.indexing,
    req.body.ISBN,
    req.body.cetificate,
    req.body.paper
  );
  if (err) {
    return res.status(401).send(err.details[0].message);
  }
  const check = await Paper.findOne({ title: req.body.title });
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
    res.status(409).send("This Paper already exists");
  } else {
    let paper = new Paper({
      username: req.username,
      type1: req.body.type1,
      title: req.body.title,
      volume: req.body.volume,
      issue: req.body.issue,
      year: req.body.year,
      author: req.body.author,
      type: req.body.type,
      indexing: req.body.indexing,
      ISBN: req.body.ISBN,
      certificate: req.body.cetificate,
      paper: req.body.paper,
    });
    paper = await paper.save();
    res.status(200).send("Data added successfully");
  }
  //res.status(201).json(user);
});

function validation(
  username,
  type1,
  title,
  volume,
  issue,
  year,
  author,
  type,
  indexing,
  ISBN,
  certificate,
  paper
) {
  const schema = Joi.object({
    email: Joi.string().required(),
    type1: Joi.string().required(),
    title: Joi.string().required(),
    volume: Joi.string(),
    issue: Joi.string().required(),
    year: Joi.string().required(),
    author: Joi.string().required(),
    type: Joi.string().required(),
    indexing: Joi.string().required(),
    ISBN: Joi.string().required(),
    certificate: Joi.string(),
    paper: Joi.string(),
  });
  return schema.validate({
    email: username,
    type1: type1,
    title: title,
    volume: volume,
    issue: issue,
    year: year,
    author: author,
    type: type,
    indexing: indexing,
    ISBN: ISBN,
    certificate: certificate,
    paper: paper,
  });
}
module.exports = router;
