const mongoose = require("mongoose");

const collegeData = new mongoose.Schema({
  collegeName: {
    type: String,
    required: true,
  },
  foundingYear: {
    type: Number,
    required: true,
  },
  City: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  numberOfStudents: {
    type: Number,
    required: true,
  },
  Courses: {
    type: Array,
    required: true,
  },
  collegeID: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("college", collegeData);
