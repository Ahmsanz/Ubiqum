const express = require('express')

const router = express.Router()

const itineraryModel = require('../model/itineraryModel')


router.get('/all',
    (req, res) => {
        itineraryModel.find({})
            .then(files => {
                res.send(files)
            })
            .catch(err => console.log(err));
    });

    router.get('/:city',
	(req, res) => {
          let itinerariesRequested = req.params.city;
          console.log(itinerariesRequested)
  		itineraryModel.find({ city: itinerariesRequested })
			.then(itinerary => {res.send(itinerary)})           
			
			.catch(err => console.log(err));
});

router.get('/go/:_id',
	(req, res) => {
          let itinerariesRequested = req.params._id;
          
  		itineraryModel.findOne({ _id: itinerariesRequested })
			.then(itinerary => {res.send(itinerary)})           
			
			.catch(err => console.log('nope',err));
});


   
    router.put('/go/:_id', (req, res) => {
        let itinerariesRequested = req.params._id;
        itineraryModel.findByIdAndUpdate(itinerariesRequested, 
            {$set: {favourite: req.body.favourite}})
        const newPlan = new itineraryModel({
            favourite: req.body.favourite
            
        })
        newPlan.save()
          .then(itinerary => {
          res.send(itinerary)
          })
          .catch(err => {
          res.status(500).send("Server error")}) 
    })
    



    router.post('/', (req, res) => {
        const newItinerary = new itineraryModel({
            name: req.body.name,
            city: req.body.city,
            rating: req.body.rating,
            image: req.body.image,
            duration: req.body.duration, 
            price: req.body.price,
            nest: req.body.nest, 
            hashtags: req.body.hashtags
        })

        newItinerary.save()
          .then(itinerary => {
          res.send(itinerary)
          })
          .catch(err => {
          res.status(500).send("Server error")}) 
    });

    router.put('/:city', (req, res) => {
        let itinerariesRequested = req.params.city;
        itineraryModel.find({ city: itinerariesRequested })
        const newPlan = new itineraryModel({
            activities: [
                {
                    title: req.body.title,
                    img: req.body.img
                }
            ]
        })
        newPlan.save()
          .then(plan => {
          res.send(plan)
          })
          .catch(err => {
          res.status(500).send("Server error")}) 
    })

    


module.exports = router;
