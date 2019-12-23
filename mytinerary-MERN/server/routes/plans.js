const express = require('express')

const router = express.Router()

const activityModel = require('../model/planModel')

// const itineraryModel = require('../model/itineraryModel')


router.post('/', (req, res) => {
    const newPlan = new activityModel({
        title: req.body.title,
        city: req.body.city,
        img: req.body.img,
        itinerary: req.body.itinerary
    })

    newPlan.save()
      .then(activity => {
      res.send(activity)
      })
      .catch(err => {
      res.status(500).send("Server error")}) 
});

router.get('/all',
(req, res) => {
    activityModel.find({})
        .then(files => {
            res.send(files)
        })
        .catch(err => console.log(err));
});

router.get('/:city',
(req, res) => {
   
      let plansRequested = req.params.city;
      console.log(plansRequested)
      activityModel.find({ city: plansRequested })
        .then(plans => {res.send(plans)})           
        
        .catch(err => console.log(err));
});

router.get('/plan/:itinerary',
(req, res) => {
      let detail = req.params.itinerary;
      console.log(detail)
      activityModel.find({ itinerary: detail })
        .then(plans => {res.send(plans)})           
        
        .catch(err => console.log('nope'));
});



module.exports = router;
