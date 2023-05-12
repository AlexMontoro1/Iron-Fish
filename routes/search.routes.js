const express = require("express");
const router = express.Router();

const capitalize = require("../utils/capitalize.js")
const Fish = require("../models/Fish.model.js")

// GET "/" => renderiza la pagina principal INICIO

router.get("/", (req, res, next) => {

    res.render("search/home.hbs")

})

router.get("/catalog", async (req, res, next) => {

    try{
        const fishParams = await Fish.find()
        
        //.select({name: 1})
        
        fishParams.forEach((eachFish) => { 
        eachFish.name = capitalize(eachFish.name)
        }); 
        //console.log(fishParams) 
        res.render("search/catalog.hbs", {
            fishParams
        })
    }
    catch(error){
        next(error)
    }

})



module.exports = router