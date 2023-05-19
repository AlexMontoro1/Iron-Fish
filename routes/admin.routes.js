const express = require("express");
const router = express.Router();
const Fish = require("../models/Fish.model.js");

const { isLogged, isAdmin } = require("../middlewares/auth.middlewares.js");

router.get("/main", isLogged, isAdmin, async (req, res, next) => {
  try {
    const fishName = await Fish.find();

    res.render("admin/main.hbs", {
      fishName,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/createFish", isLogged, isAdmin, async (req, res, next) => {
  res.render("admin/createFish.hbs");
});

router.post("/createFish", isLogged, isAdmin, async (req, res, next) => {
  const { name, description, type, lifeExp, aggr, url } = req.body;
  try {
    await Fish.create({
      name,
      description,
      type,
      lifeExp,
      aggr,
      url,
    });
    res.redirect("/search/catalog");
  } catch (err) {
    next(err);
  }
});

router.post("/deleteFish", isLogged, isAdmin, async (req, res, next) => {
  try {
    await Fish.findByIdAndRemove(req.body.pezEliminado);
    res.redirect("back");
    console.log("PEZ ELIMINADO");
  } catch (err) {
    next(err);
  }
});

router.get("/editFish/:fishId", isLogged, isAdmin, async (req, res, next) => {
  try {
    const fishParams = await Fish.findById(req.params.fishId);

    res.render("admin/editFish.hbs", {
      fishParams,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/editFish/:fishId", isLogged, isAdmin, async (req, res, next) => {
  const { name, description, type, lifeExp, aggr, url } = req.body;
  try {
    await Fish.findByIdAndUpdate(req.params.fishId, {
      name,
      description,
      type,
      lifeExp,
      aggr,
      url,
    });
    res.redirect("/admin/main");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
