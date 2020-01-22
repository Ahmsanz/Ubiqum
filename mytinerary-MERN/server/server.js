



const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const config = require('config');
const db = config.get("mongoURI");

const bodyParser = require("body-parser");
const cors = require("cors");

const passport = require('passport')

const mongoose = require('mongoose')

// const cookieSession = require ('cookie-session')

const key = require ('./config/keys_dev')

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors());




mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false})  // el segundo parámetro es el sugerido por mongo; el de confluence estará obsoleto pronto.
    .then(() => console.log('Connection to Mongo DB established'))
    .catch(err => console.log(err));

app.listen(port, () => {
  console.log("Server is running on " + port + "port");
});


// app.use(cookieSession({
//   maxAge: 1*60*60*1000,
//   keys: [key.session.cookieKey]
// }))

app.use(passport.initialize())
app.use(passport.session())
require('./routes/passport')
require('./routes/passportGoogle')


app.use('/comments', require ('./routes/comments'))
app.use('/cities', require('./routes/cities'))

app.use('/users', require('./routes/users'))


app.use('/itineraries', require('./routes/itineraries'))


app.use('/activities', require('./routes/plans'))

app.use('/auth', require('./routes/auth'))

app.use('/login', require('./routes/auth'))

app.use ('/google', require('./routes/auth'))
