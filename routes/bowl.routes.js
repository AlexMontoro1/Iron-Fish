const express = require("express");
const router = express.Router();
const MyFish = require("../models/MyFish.model.js");
const Bowl = require("../models/Bowl.model.js");

const { isLogged } = require("../middlewares/auth.middlewares.js");

router.get("/:userId/main", isLogged, async (req, res, next) => {
  const userId = req.session.activeUser._id;
  try {
    const allBowls = await Bowl.find({ owner: userId }).select({ name: 1 });
    res.render("bowl/main.hbs", {
      allBowls,
      userId,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:userId/create", isLogged, async (req, res, next) => {
  const userId = req.session.activeUser._id;
  try {
    res.render("bowl/create.hbs", {
      userId,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/:userId/create", isLogged, async (req, res, next) => {
  const userId = req.session.activeUser._id;
  const { name, capacity, water, isClosed } = req.body;
  try {
    await Bowl.create({
      name,
      capacity,
      water,
      isClosed,
      owner: userId,
    });
    res.redirect(`/bowl/${userId}/main`);
  } catch (error) {
    next(error);
  }
});

router.get("/:bowlId/details", isLogged, async (req, res, next) => {
  try {
    const bowlParams = await Bowl.findById(req.params.bowlId).populate(
      "owner",
      "username"
    );
    const allFishes = await MyFish.find({ bowl: req.params.bowlId }).populate(
      "fish",
      "name"
    );
    res.render("bowl/details.hbs", {
      bowlParams,
      allFishes,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:bowlId/edit", isLogged, async (req, res, next) => {
  try {
    const bowlParams = await Bowl.findById(req.params.bowlId);

    res.render("bowl/edit.hbs", {
      bowlParams,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/:bowlId/edit", isLogged, async (req, res, next) => {
  const userId = req.session.activeUser._id;
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
    res.redirect(`/bowl/${userId}/main`);
  } catch (error) {
    next(error);
  }
});

router.post("/:bowlId/delete", isLogged, async (req, res, next) => {
  const userId = req.session.activeUser._id;
  try {
    await Bowl.findByIdAndDelete(req.params.bowlId);
    res.redirect(`/bowl/${userId}/main`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
