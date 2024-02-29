const mongoose = require("mongoose");
const validator = require("validator");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: [true, "email is already present"],
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("invalide email");
      }
    },
  },
  phone: {
    type: Number,
    require: true,
    unique: [true, "phone number is already present"],
    min: 10,
  },
  address: {
    type: String,
  },
});

// we create a new connetion
const Student = new mongoose.model("Student", studentSchema);

// export models
module.exports = Student;
