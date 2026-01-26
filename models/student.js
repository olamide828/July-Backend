const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    course: { type: String, required: true },
    age: { type: Number, required: true },
    profilePic: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Students", studentSchema);

//Schema
