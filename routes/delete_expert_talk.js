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
  const check = await Expert.findOneAndDelete({ _id: req.body.id })

    .then(res.status(200).send("Expert talk deleted successfully"))
    .catch(console.log("some error occured"));
});
module.exports = router;
