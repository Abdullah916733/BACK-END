const express = require("express");
const MensRanking = require("../models/mens");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("working");
});

// add data in database
router.post("/mens", async (req, res) => {
  try {
    const mensRankingRecord = new MensRanking(req.body);
    const mensRankingRecordSaveData = await mensRankingRecord.save();
    res.send(mensRankingRecordSaveData);
  } catch (err) {
    res.send(err);
  }
});

// read data from database
router.get("/mens", async (req, res) => {
  try {
    const showMensAllData = await MensRanking.find({}).sort({ ranking: 1 });
    res.send(showMensAllData);
  } catch (err) {
    res.send(err);
  }
});

// read data from database individual
router.get("/mens/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const menDataIndividual = await MensRanking.findById(_id);
    res.status(200).send(menDataIndividual);
  } catch (err) {
    res.status(500).send(err);
  }
});

// updata data from database for individual
router.patch("/mens/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updataMenData = await MensRanking.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).send(updataMenData);
  } catch (err) {
    res.status(500).send(err);
  }
});

// datele data from database for individual
router.delete("/mens/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteMenData = await MensRanking.findByIdAndDelete(id);
    res.status(200).send(deleteMenData);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
