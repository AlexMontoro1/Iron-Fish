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
  //console.log(req.body);
  try {
    const bowl = await Bowl.findById(req.params.bowlId);
    const foundFish = await Fish.findOne({name:fish})
    console.log(foundFish);
    await MyFish.create({
      name,
      age,
      fish: foundFish,
      bowl,
      owner: userId
    }); res.redirect(`/bowl/${req.params.bowlId}/details`)
  } catch (error) {
    next(error);
  }
});

router.post("/:myfishId/delete", isLogged, async (req,res,next)=> {
  try {
    await MyFish.findByIdAndRemove(req.params.myfishId)
    res.redirect("back")
  } catch (err) {
    next(err)
  }
})

router.get("/:myfishId/edit", isLogged, async (req,res,next)=> {
  try {
    const myFishParams = await MyFish.findById(req.params.myfishId).populate("fish")
   
    const allFish = await Fish.find();
    const allFishClone = JSON.parse(JSON.stringify(allFish))
    allFishClone.forEach((eachFish)=> {
      if(myFishParams.fish.name === eachFish.name){
        eachFish.newProperty = true
      }else{
        eachFish.newProperty = false
      }
    })
    //console.log(myFishParams);
    console.log(allFishClone);
    //console.log(allFish);
    res.render("myfish/edit.hbs", {
      myFishParams,
      allFish,
      allFishClone
    })
  } catch (err) {
    next(err)
  }
})

router.post("/:myfishId/edit", isLogged, async (req,res,next)=> {
  const { name, age, fish } = req.body;
  try {
    const myFishParams = await MyFish.findByIdAndUpdate(req.params.myfishId,{
      name,
      age,
      fish
    }, { new:true })
    res.redirect(`/bowl/${myFishParams.bowl}/details`);
  } catch (err) {
    next(err)
  }
})

module.exports = router;
