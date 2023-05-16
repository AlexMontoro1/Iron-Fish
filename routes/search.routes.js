const express = require("express");
const router = express.Router();

const capitalize = require("../utils/capitalize.js");
const Fish = require("../models/Fish.model.js");
const User = require("../models/User.model.js");

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

router.get("/:fishId/details", async (req,res,next)=> {
    console.log(req.params.fishId);
    try {
       const fishParams = await Fish.findById(req.params.fishId)
       res.render("search/details.hbs",{
        fishParams
       })
       //console.log(fishParams);
    } catch (err) {
        next(err)
    }
})

router.post("/results", async (req, res, next) => {
  try {
    const name = req.body.name;
    const fish = await Fish.findOne({name}).exec();

    if (fish !== null) {
      return res.redirect(`/search/${fish._id}/details`);
    } else {
      res.render("search/home.hbs", {
        errorMessage: "No se ha encontrado ningún pez.",
      });
    }
  } catch (error) {
    next(error);
  }
});


module.exports = router;
