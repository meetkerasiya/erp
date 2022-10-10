//following faculty members were deputed for participating in various short term training program (STTP) / Workshop / Seminar & Conferences
const { number, date } = require("joi");
const mongoose = require("mongoose");
const facultyWorkshopSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  //event attended
  /*faculty:{
        type: String,
        required:true
    },*/
  start_date: {
    type: String,
    required: true,
  },
  end_date: {
    type: String,
    required: true,
  },
  expert: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },

  type: {
    //Type(STTP/ Seminar /Workshop / Conference / Webinar/ FDP/ expert talk)

    type: String,
    required: true,
  },
  funding_agency: {
    type: [String],
    //require:true
  },
  certificate: {
    type: String,
    required: false,
  },
  report: {
    type: String,
    required: false,
  },
  is_deleted: {
    type: Boolean,
    required: false,
    default: false,
  },
});
const Faculty_workshop = mongoose.model(
  "faculty_workshop",
  facultyWorkshopSchema
);

module.exports = Faculty_workshop;
