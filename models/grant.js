const { number } = require("joi");
const mongoose = require("mongoose");
const grantSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  cordinator: {
    type: String,
    required: true,
  },
  project_title: {
    type: String,
    required: true,
  },
  funding_agency: {
    type: [String],
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  is_deleted: {
    type: Boolean,
    required: false,
    default: false,
  },
});
const Grant = mongoose.model("grant", grantSchema);

module.exports = Grant;
