const express = require('express')

const router = express.Router()
const config = require("config")
const jwt = require('jsonwebtoken')
const passport = require('passport')
const key = require("../config/keys_dev");
// const key = 'secret'
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const userModel = require('../model/userModel')
const planModel = require ('../model/itineraryModel')
const decoder = require('jwt-decode');

router.get('/all',
(req, res) => {
    userModel.find({})
        .then(files => {
            res.send(files)
        })
        .catch(err => console.log(err));
});


router.get ('/', passport.authenticate("jwt", { session: false }), (req,res) => {
    userModel.findOne({_id: req.user._id})
    .then(user => res.json(user))
    .catch(err => res.status(404).json({error: 'I do not know you'}))
});


router.get('/:_id',
	(req, res) => {

       let userRequested = req.params._id;
  		userModel.findOne({ _id: userRequested })
			.then(user => {
				res.send(user)
			})
			.catch(err => console.log(err));
});


router.put ('/:userID/itineraries/:itinerary', (req, res) => {
    let itinerary = req.params.itinerary
    let userID = req.params.userID
    console.log(req.params);
    userModel.findByIdAndUpdate(
        userID,
        {$push: {'favourites': itinerary}}, 
        {new: true},    
        (err,user)=>{
            if(err){
                res.json({error :err}) ; 
            } else{
                res.send(user); console.log(user) 
            }
        });
});



router.get ('/favourites/all', (req, res) => {
    userModel.find ({
        favourites: req.user.favourites
    })
    .then ((favourites)=> res.send(favourites))
    .catch (err => console.log (err))
})


router.post('/', [
        // username must be an email
        check('mail').isEmail(),
        // password must be at least 5 chars long
        check('password').isLength({ min: 5 })
      ],

(req, res) => {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
        }
    const newUser = new userModel({
                            first_name: req.body.first_name,
                            last_name: req.body.last_name,
                            age: req.body.age,
                            picture: req.body.picture,
                            mail: req.body.mail,
                            password: req.body.password
                        })


    bcrypt.genSalt(10, (err,salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;

            newUser.password = hash;

    newUser.save()
      .then(user => {
        const payload = {
            _id: user._id,
            first_name: user.first_name,
            mail: user.mail
    };
        const options = {expiresIn: 2592000};

        jwt.sign(
        payload,
        key.secretOrKey,
        options,
        (err, token) => {
            if(err){
            res.json({
                success: false,
                token: "There was an error"
            });
            }else {
            res.json({
                success: true,
                token: token
            });
            }
  });
});
        })
    })
})



router.delete( '/:_id',
(req, res) => {

    let userRequested = req.params._id;

    console.log(userRequested)
    userModel.findByIdAndRemove({
        _id: userRequested
    })
    .then(function (user){
        res.send(user)
    })
});

module.exports = router;

