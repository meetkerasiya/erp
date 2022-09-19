const express=require("express");
const router=express.Router();
const mongoose=require("mongoose");
router.use(express.json()); 
const config=require("config");
const Expert=require("../models/exprert_talk");
const jwt=require("jsonwebtoken");
const auth=require("../middleware/auth")
router.post("/",[auth],async(req,res)=>{
    Expert.find({},(err,result)=>
    {
        if (!err) {
            return res.send(result);
          }
    });
    
});
module.exports = router;