const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
router.use(express.json());
const config = require("config");
const Phd = require("../models/phd");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
router.post("/", [auth], async (req, res) => {
  Phd.find({ is_deleted: false }, (err, result) => {
    if (!err) {
      return res.status(200).send(result);
    } else {
      return res
        .status(401)
        .send(JSON.stringify({ Message: "Some error occured" }));
    }
  });
});
module.exports = router;
