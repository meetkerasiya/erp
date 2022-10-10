const express = require("express");
const Joi = require("joi");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");
router.use(express.json());
const RnD = require("../models/research_and_dev");
const auth = require("../middleware/auth");

router.post("/", [auth], async (req, res) => {
  //console.log(req.username);
  const check = await RnD.findOneAndDelete({ _id: req.body.id })

    .then(res.status(200).send("Research deleted successfully"))
    .catch(console.log("some error occured"));
});
module.exports = router;
