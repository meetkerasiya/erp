const express=require("express");
const router=express.Router();
const mongoose=require("mongoose");
router.use(express.json()); 
const config=require("config");
const Book=require("../models/book_publish");
const jwt=require("jsonwebtoken");
const auth=require("../middleware/auth")
router.post("/",[auth],async(req,res)=>{
    Book.find({},(err,result)=>
    {
        if (!err) {
            return res.send(result);
          }
    });
    
});
module.exports = router;