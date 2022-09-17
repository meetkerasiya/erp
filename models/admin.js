const mongoose=require("mongoose");
const adminSchema=new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type : String,
        required : true
    },
    token: {
        type: String
    }
    });
const Admin=mongoose.model("admin",adminSchema);
adminSchema.methods.generateAuthToken = function() { 
    const token= jwt.sign({username : this.username, password: this.password}, config.get("jwtPrivateKey"));
    return token;
    } 
module.exports = Admin;