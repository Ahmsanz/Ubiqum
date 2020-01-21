const express = require('express')

const router = express.Router()

const comment = require('../model/commentModel')


router.get('/all',
    (req, res) => {
        comment.find({})
            .then(files => {
                res.send(files)
            })
            .catch(err => console.log(err));
    });


router.get('/:itinerary',
(req, res) => {
      let itinerary = req.params.itinerary;

  comment.find({ itinerary: itinerary })
  .then( comment => {res.send(comment)})

  .catch(err => console.log(err));
});

router.post('/', (req, res) => {
    const newComment = new comment({
        user: req.body.user,
        itinerary: req.body.itinerary,
        date: req.body.date,
        description: req.body.description
    })

    newComment.save()
      .then(comment => {
      res.send(comment)
      })
      .catch(err => {
      res.status(500).send("Server error")})
});

module.exports = router;
