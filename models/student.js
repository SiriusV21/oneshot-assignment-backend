const mongoose = require('mongoose');

const studentData = new mongoose.Schema({
  studentName : {
    type : String,
    required : true
  },
  year : {
    type : Number,
    required : true
  },
  collegeId : {
    type : String,
    required : true
  },
  Skills : {
    type : Array,
    required : true
  }
});

module.exports = mongoose.model('student', studentData);