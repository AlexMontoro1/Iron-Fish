const express = require("express");
const router = express.Router();
const User = require("../models/User.model.js");
const Fish = require("../models/Fish.model.js");
const MyFish = require("../models/MyFish.model.js");
const Bowl = require("../models/Bowl.model.js");

const { isLogged } = require("../middlewares/auth.middlewares.js");

router.get("/:bowlId/create", isLogged, async (req, res, next) => {
  console.log(req.params.bowlId)
  try {
    const allFish = await Fish.find();
    res.render("myfish/create.hbs", {
      allFish,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/:bowlId/create", isLogged, async (req, res, next) => {
  const { name, age, fish } = req.body;
  console.log(req.body);
  try {
    await MyFish.create({
      name,
      age,
      fish,      
    }
    );
  } catch (error) {
    next(error);
  }
});

module.exports = router;
