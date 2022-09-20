const express = require("express");
const Joi = require("joi");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");
router.use(express.json());
const Book = require("../models/book_publish");
const auth = require("../middleware/auth");

router.post("/", [auth], async (req, res) => {
  //console.log(req.username);
  const { err } = validation(
    req.username,
    req.body.title,
    req.body.author,
    req.body.co_author,
    req.body.publisher,
    req.body.ISBN
  );
  if (err) {
    return res.status(401).send(err.details[0].message);
  }
  const check = await Book.findOne({ title: req.body.title });
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
    res.status(409).send("This Book already exists");
  } else {
    let book = new Book({
      username: req.username,
      title: req.body.title,
      author: req.body.author,
      co_author: req.body.co_author,
      publisher: req.body.publisher,
      ISBN: req.body.ISBN,
    });
    book = await book.save();
    res.status(200).send("Data added successfully");
  }
  //res.status(201).json(user);
});

function validation(username, title, author, co_author, publisher, isbn) {
  const schema = Joi.object({
    email: Joi.string().required(),
    title: Joi.string().required(),
    author: Joi.string().required(),
    co_author: Joi.string(),
    publisher: Joi.string().required(),
    isbn: Joi.string().required(),
  });
  return schema.validate({
    email: username,
    title: title,
    author: author,
    co_author: co_author,
    publisher: publisher,
    isbn: isbn,
  });
}
module.exports = router;
