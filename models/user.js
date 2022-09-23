const { boolean } = require("joi");
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  admin_approval: {
    type: Boolean,
    default: false,
  },
  token: {
    type: String,
  },
  is_deleted: {
    type: Boolean,
    required: false,
    default: false,
  },
});
const User = mongoose.model("users", userSchema);
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { username: this.username, password: this.password },
    config.get("jwtPrivateKey")
  );
  return token;
};
module.exports = User;
