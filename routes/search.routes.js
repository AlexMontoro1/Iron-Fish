const express = require("express");
const router = express.Router();

const capitalize = require("../utils/capitalize.js");
const Fish = require("../models/Fish.model.js");
const User = require("../models/User.model.js");
const Comment = require("../models/Comment.model.js");

const { isOnline } = require("../middlewares/auth.middlewares.js");

// GET "/" => renderiza la pagina principal INICIO

router.get("/", (req, res, next) => {
  res.render("search/home.hbs");
});

router.get("/catalog", async (req, res, next) => {
  try {
    const fishParams = await Fish.find();

    fishParams.forEach((eachFish) => {
      eachFish.name = capitalize(eachFish.name);
    });
    //console.log(fishParams)
    res.render("search/catalog.hbs", {
      fishParams,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:fishId/details", isOnline, async (req, res, next) => {
  //console.log(req.params.fishId);

  try {
    
    let deleteButton = false;
    const fishParams = await Fish.findById(req.params.fishId);
    const allComments = await Comment.find({fish: fishParams._id}).populate("author", "username")
    if (req.session.activeUser !== undefined) {
      const userId = req.session.activeUser._id;
      const userParams = await User.findById(userId);

      userParams.wantedFish.forEach((eachWanted) => {
        if (fishParams._id.equals(eachWanted._id)) {
          deleteButton = true;
        }
      });
      res.render("search/details.hbs", {
        fishParams,
        deleteButton,
        allComments
      });
    } else {
      res.render("search/details.hbs", {
        fishParams,
      });
    }

    //console.log(fishParams);
  } catch (err) {
    next(err);
  }
});

router.post("/:fishId/comment", isOnline, async (req, res, next) => {
  const { content } = req.body
  const userId = req.session.activeUser._id;
  try {
    const fishParams = await Fish.findById(req.params.fishId)
    await Comment.create({
      content,
      fish: fishParams._id,
      author: userId
    })
    res.redirect("back")
    console.log("comentario creado")
  } catch (err) {
    next(err)
  }
})

router.post("/results", async (req, res, next) => {
  try {
    const { NameType, aggr, type } = req.body;
    const filter = req.body.filter;
    let query = {};

    switch (filter) {
      case "NameType":
        query.$or = [{ name: NameType }, { type: NameType }];
        break;
      case "aggr":
        if (aggr >= 0 && aggr <= 5) {
          query.aggr = aggr;
        }
        break;
      default:
        break;
    }

    const fishList = await Fish.find(query).exec();

    if (fishList.length > 0) {
      res.render("search/results.hbs", { fishList });
    } else {
      res.render("search/home.hbs", {
        errorMessage:
          "No se ha encontrado ningún pez con esas caracteristicas.",
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
