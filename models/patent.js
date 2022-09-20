const { number } = require("joi");
const mongoose = require("mongoose");
const patentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  faculty: {
    type: [String],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  application_no: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  status: {
    // published or registration or awarded
    type: String,
    required: true,
  },
});
const Patent = mongoose.model("patent", patentSchema);

module.exports = Patent;
