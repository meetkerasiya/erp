const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
router.use(express.json());
const config = require("config");
const Paper = require("../models/paper");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
router.post("/", [auth], async (req, res) => {
  const papers = Paper.find({ is_deleted: false }, (err, result) => {
    if (!err) {
      return res.status(200).send(result);
    } else {
      return res
        .status(401)
        .send(JSON.stringify({ Message: "Some error occured" }));
    }
  });
  /*if(papers)
    {
        return res.set(200).send(JSON.stringify({
            {
                  
                  "type1": ,
                  "title": "python and ML",
                  "volume" : "4",
                  "issue" : "2A",
                  "year" : "2022",
                  "author":"Mitesh Kateliya",
                  "type": "WOS",
                  "indexing": "4354324",
                  "ISBN": "REedf##$S"
      }
        }));
    }
    else
    {
        return res.set(404).send(JSON.stringify({"msg":"File not found"}));
    }*/
});
module.exports = router;
