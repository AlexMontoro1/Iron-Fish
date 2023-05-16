const express = require("express");
const router = express.Router();
const User = require("../models/User.model.js");
const Fish = require("../models/Fish.model.js");
const MyFish = require("../models/MyFish.model.js");
const Bowl = require("../models/Bowl.model.js");

const { isLogged } = require("../middlewares/auth.middlewares.js");

router.get("/:bowlId/create", isLogged, async (req, res, next) => {
   
  //console.log(req.params.bowlId)
  try {
    const bowl = await Bowl.findById(req.params.bowlId);   
    const allFish = await Fish.find();
    res.render("myfish/create.hbs", {
      allFish,
      bowl
    });
  } catch (error) {
    next(error);
  }
});

router.post("/:bowlId/create", isLogged, async (req, res, next) => {
  const { name, age, fish } = req.body;
  const userId = req.session.activeUser._id;
  console.log(req.body);
  try {
    const bowl = await Bowl.findById(req.params.bowlId);
    const fish = await Fish.findOne({
      name
    })
    await MyFish.create({
      name,
      age,
      fish, 
      bowl, 
      owner: userId
    }); res.redirect("/bowl/:bowlId/details")
  } catch (error) {
    next(error);
  }
});

module.exports = router;
