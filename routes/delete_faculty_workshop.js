const express = require("express");
const Joi = require("joi");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");
router.use(express.json());
const Faculty_Workshop = require("../models/faculty_workshop");
const auth = require("../middleware/auth");

router.post("/", [auth], async (req, res) => {
  //console.log(req.username);
  const check = await Faculty_Workshop.findByIdAndDelete({
    _id: req.body.id,
  }).then(res.status(200).send("Faculty_Workshop deleted successfully"));
});
module.exports = router;
