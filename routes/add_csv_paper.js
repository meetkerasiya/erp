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
  const check = await Paper.insertMany(req.body);
  if (check != null) {
    res.status(202).send(check);
  } else {
    res.status(304).send("Some error occured");
  }
});
