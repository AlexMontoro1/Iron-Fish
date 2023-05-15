const express = require("express");
const router = express.Router();
const User = require("../models/User.model.js");
const Fish = require("../models/Fish.model.js");
const MyFish = require("../models/MyFish.model.js");
const Bowl = require("../models/Bowl.model.js");

const { isLogged } = require("../middlewares/auth.middlewares.js");

router.get("/main", isLogged, async (req, res, next) => {
  try {
    const allBowls = await Bowl.find().select({ name: 1 });
    console.log(allBowls);
    res.render("bowl/main.hbs", {
      allBowls,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/create", isLogged, (req, res, next) => {
  res.render("bowl/create.hbs");
});

router.post("/create", isLogged, async (req, res, next) => {
  const { name, capacity, water, isClosed } = req.body;
  try {
    await Bowl.create({
      name,
      capacity,
      water,
      isClosed,
    });
    //console.log(req.body)
    res.redirect("/bowl/main");
  } catch (error) {
    next(error);
  }
});

router.get("/:bowlId/details", isLogged, async (req, res, next) => {
  try {
    const bowlParams = await Bowl.findById(req.params.bowlId);
    //console.log(bowlParams)
    res.render("bowl/details.hbs", {
      bowlParams,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:bowlId/edit", isLogged, async (req, res, next) => {
  try {
    const bowlParams = await Bowl.findById(req.params.bowlId);
    //console.log(bowlParams)
    res.render("bowl/edit.hbs", {
      bowlParams,
    }); //console.log(bowlParams)
  } catch (error) {
    next(error);
  }
});

router.post("/:bowlId/edit", isLogged, async (req, res, next) => {
  const { name, capacity, water, isClosed } = req.body;
  try {
    await Bowl.findByIdAndUpdate(
      req.params.bowlId,
      {
        name,
        capacity,
        water,
        isClosed,
      },
      { new: true }
    );
    //console.log("Bowl actualizado")
    res.redirect("/bowl/main");
  } catch (error) {
    next(error);
  }
});

router.post("/:bowlId/delete", isLogged, async (req, res, next) => {
  try {
    await Bowl.findByIdAndDelete(req.params.bowlId);
    res.redirect("/bowl/main");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
