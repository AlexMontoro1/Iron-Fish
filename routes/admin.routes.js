const express = require("express");
const router = express.Router();
const User = require("../models/User.model.js");
const Fish = require("../models/Fish.model.js");

const { isLogged, isAdmin } = require("../middlewares/auth.middlewares.js");


router.get("/main", isLogged, isAdmin, async (req,res,next) => {
    try {
        const fishName = await Fish.find();
        //console.log(fishName);
        res.render("admin/main.hbs", {
            fishName
        })
    } catch (err) {
        next(err)
    }
    
  })

router.get("/createFish", isLogged, isAdmin, async (req,res,next) => {
    res.render("admin/createFish.hbs")
})

router.post("/createFish", isLogged, isAdmin, async (req,res,next)=> {
    const { name, description, type, lifeExp, aggr, url } = req.body
    try {
        await Fish.create({
            name,
            description,
            type,
            lifeExp,
            aggr,
            url
        })
        res.redirect("/search/catalog")
    } catch (err) {
        next(err)
    }
})

router.post("/deleteFish", isLogged, isAdmin, async (req,res,next)=> {
    console.log(req.body);
    try {
        await Fish.findByIdAndRemove(req.body.pezEliminado)
        res.redirect("back")
        console.log("PEZ ELIMINADO");
    } catch (err) {
        next(err)
    }
})

router.get("/:fishId/editFish", isLogged, isAdmin, async (req,res,next)=> {
    res.render("admin/editFish.hbs")
})


  module.exports = router;