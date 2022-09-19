const { number } = require("joi");
const mongoose=require("mongoose");
const paperSchema=new mongoose.Schema({
    
    username: {
        type: String,
        required: true
    },
    type1:{ //national or international
        type:String,
        required:true
    },

    title:{
        type: String,
        required:true
    },
    volume:{ 
        type:String,
        required:true
    },
     
    issue:{
        type: String,
        required:true
    },
    year:
    {
        type: String,
        required: true
    }
    ,
    author:{
        type: [String],
        required:true
    },
    type:
    { //conference or jornoul
        type: String,
        required: true
    },
    indexing:{ // scopus / ugc / wos(web of science) / other
        type: String,
        required:true
    },
    ISBN:
    {
        type: String,
        required:true
    }
});
const Paper=mongoose.model("paper_published",paperSchema);

module.exports = Paper;