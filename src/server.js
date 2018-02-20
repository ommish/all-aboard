const path = require('path');
require('dotenv').config({path: path.join(__dirname, '.env')});

const express = require('express');
const app = express();

const webpack = require('webpack');
const config = require('./webpack.config.dev');
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}));

require('./services/passport');
require('./routes/auth_routes')(app);

app.get('/', (req, res) => {
  // if (currentUser) res.cookie("user", JSON.stringify(currentUser));
  res.sendFile(path.resolve(__dirname + '/frontend/index.html'));
});

app.listen(3000, () => {
  console.log("listening");
});

// const mongoose = require('mongoose');
// mongoose.connect(`${process.env.DATABASE}`);
// const db = mongoose.connection;
// let userSchema, User;
// db.on('error', (err) => {console.error(err)});
// db.once('open', () => {
//   userSchema = new mongoose.Schema({
//     googleUsername: String,
//     googleId: Number,
//   });
//   User = mongoose.model('User', userSchema);
// });
//
//
// const bodyParser = require('body-parser');
// const session = require('express-session');
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(session({secret: "train"}));
// app.use(passport.initialize());
// app.use(passport.session());
// let currentUser, currentUserAccessToken, currentUserRefreshToken;
// passport.use(new GoogleStrategy({
//   clientID: process.env.CLIENT_ID,
//   clientSecret: process.env.CLIENT_SECRET,
//   callbackURL: "http://localhost:3000/auth/google/callback"
//   },
//   (accessToken, refreshToken, profile, cb) => {
//     currentUserAccessToken, currentUserRefreshToken = accessToken, refreshToken;
//     currentUser = User.find({username: profile.username});
//     if (!currentUser) {
//       currentUser = new User({googleId: profile.id, googleUsername: profile.username});
//       currentUser.save((err, user) => {
//         return cb(err, user);
//       });
//     } else {
//       return cb(err, user);
//     }
//   }
// ));
//
//
// app.get('/auth/google',
//   passport.authenticate('google',
//     {scope: ['profile']}
//   )
// );
// app.get('/auth/google/callback',
//   passport.authenticate('google',
//     {failureRedirect: '/auth/google'}
//   ),
//   (req, res) => {
//     res.redirect('/');
//   }
// );
//
//
