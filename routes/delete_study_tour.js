const express = require("express");
const Joi = require("joi");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");
router.use(express.json());
const Tour = require("../models/study_tour");
const auth = require("../middleware/auth");

router.post("/", [auth], async (req, res) => {
  //console.log(req.username);
  const check = await Tour.findOneAndDelete({ _id: req.body.id })

    .then(res.status(200).send("Tour deleted successfully"))
    .catch(console.log("some error occured"));
});
module.exports = router;
