const express = require("express");
const Joi = require("joi");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");
router.use(express.json());
const User = require("../models/admin");

router.post("/", async (req, res) => {
  const { err } = validation(req.body.username, req.body.password);
  if (err) {
    return res.status(401).send(err.details[0].message);
  }
  const check = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });
  if (check == null) {
    return res
      .status(409)
      .send("No Admin found with this username or password");
  } else {
    if (check.admin_approval) {
      const token = jwt.sign(
        { username: req.body.username, password: req.body.password },
        config.get("jwtPrivateKey")
      );
      return res.header("x-auth-token", token).send(
        JSON.stringify({
          msg: "Successfully loggedin",
          "x-auth-token": token,
        })
      );
      //res.status(201).json(user);
    } else {
      return res
        .status(406)
        .send(JSON.stringify({ msg: "You have not approved by admin yet" }));
    }
  }
});

function validation(username, password) {
  const schema = Joi.object({
    name: Joi.string().required(),
    pass: Joi.string().required(),
  });
  return schema.validate({
    name: username,
    pass: password,
  });
}
module.exports = router;
