const express = require("express");
const router = new express.Router();
const Student = require("../models/students");

// create data for database
router.post("/students", async (req, res) => {
  try {
    console.log(req.body);
    const user = new Student(req.body);
    const createUser = await user.save();
    res.send(createUser);
  } catch (e) {
    res.status(400).send(e);
    console.log(e);
  }
});

// read data from database

router.get("/students", async (req, res) => {
  try {
    const showData = await Student.find();
    res.send(showData);
  } catch (e) {
    res.send(e);
  }
});

// find data from database

router.get("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const showDataFind = await Student.findById(_id);
    res.send(showDataFind);
  } catch (e) {
    res.status(500).send(e);
  }
});

// find data from database using name

// router.get("/students/:name", async (req, res) => {
//   try {
//     const name = req.params.name;
//     const showDataFind = await Student.findOne(name);
//     res.send(showDataFind);
//   } catch (e) {
//     res.status(500).send(e);
//   }
// });


//  update date from database using id

router.patch("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const updateStudent = await Student.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.status(200).send(updateStudent);
  } catch (r) {
    res.status(400).send(e);
  }
});

// delete data from database using id

router.delete("/students/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deteleStudent = await Student.findByIdAndDelete(id);

    if (!id) {
      res.status(400).send();
    } else {
      res.status(200).send(deteleStudent);
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
