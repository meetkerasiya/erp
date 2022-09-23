const { number, date } = require("joi");
const mongoose = require("mongoose");
const profileSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phno: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  dateOfJoin: {
    type: String,
    require: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  is_deleted: {
    type: Boolean,
    required: false,
    default: false,
  },
});
const Profile = mongoose.model("profiles", profileSchema);

module.exports = Profile;
