const { number } = require("joi");
const mongoose=require("mongoose");
const RDSchema=new mongoose.Schema({
    
    username: {
        type: String,
        required: true
    },
    cordinator:{
        type: String,
        required:true
    },
    title:{
        type: String,
        required:true
    },
    funding_agency:{
        type: [String],
        required:true
    },
    amount:
    {
        typr: String,
        required: true
    },
    date:{
        type: Date,
        required:true
    }
});
const RD=mongoose.model("research_and_dev",RDSchema);

module.exports = RD;