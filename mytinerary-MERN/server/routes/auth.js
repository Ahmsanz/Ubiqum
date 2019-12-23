const express = require('express')

const router = express.Router()
const config = require("config")
const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt');

const passport = require('passport')



const key = require("../config/keys_dev");

const userModel = require('../model/userModel');



//normal authentication

router.get ('/auth', passport.authenticate("jwt", { session: false }), (req,res) => {
    userModel.findOne({_id: req.user._id})
    .then(user => res.json(user))
    .catch(err => res.status(404).json({error: 'I do not know you'}))
});

router.post('/', (req,res) => {
    const { mail, password } = req.body;

    if (!mail || !password) {
        return (res.status(400).json({msg: 'Who is this?'}), console.log('identify yourself!'))

    }

    userModel.findOne({mail})
    .then (user => {
        if (!user) return (res.status(400).json({msg: 'Does not ring a bell'}))


    //validation of password

    bcrypt.compare(password, user.password)
    .then(isMatch => {
        if (!isMatch) {return res.status(404).send('You shall not pass!');}

        jwt.sign (
            {_id: user._id,
            first_name: user.first_name},
            key.secretOrKey,
            {expiresIn: 3600},
            (err, token) => {
                if (err) throw err;
                res.json({
                    token,
                    user: {

                        first_name: user.first_name,
                        last_name: user.last_name,
                        picture: user.picture,
                        mail: user.mail, 
                        token: token
                    },
                    msg: 'Welcome home, sire'
                }); 
            }
        )
    }); console.log (user);


})
})

router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
    console.log('loggin', res.data)
});

// auth logout
router.get('/logout', (req, res) => {
    // handle with passport
    console.log('logging out.... See you again soon, friend');
});


// auth with google+
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));


//callback route for google strategy
router.get('/google/redirect', passport.authenticate ('google'), (req, res) => 

{
     
    userModel.findOne({_id: req.user._id})
         .then(user => {
            jwt.sign (
                {_id: user._id,
                first_name: user.first_name},
                key.secretOrKey,
                {expiresIn: 3600},
                (err, token) => {
                    if (err) throw err;
                    
                    
                    res.redirect('http://localhost:3000/home/redirect/' + token)
                    
                }
            )
        })
        
        
        // console.log(token)

    }
    // }




)
//   passport.authenticate('google', {failureRedirect: '/login'},
//   (req, res) => {
    
//     jwt.sign (        
//         (err, token) => {
//             if (err) throw err;
//             res.send(token)

        
    
      
    
//         // Successful authentication, redirect home.
//         console.log(res)
//          res.redirect('http://localhost:3000/Redirect' + token, () => {
//             console.log ('redirection',res)
//             window.localStorage(res.json);
//         });
//         })
//   }))






// callback route for google to redirect to


// hand control to passport to use code to grab profile info
// router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
//     res.send('you reached the redirect URI');
// });




module.exports = router;
