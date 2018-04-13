const express = require('express');
const expressValidator = require('express-validator');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const cookeParser = require('cookie-parser');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const flash = require('connect-flash');
const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var {mongoose} = require('./db/mongoose');

var app = express();
var port = process.env.PORT ||3000;


mongoose.connect('mongodb://localhost/passport');
let db = mongoose.connection;

db.once('open',function(){
console.log('Connected to db');
});

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookeParser());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
 }));
 
 app.use(passport.initialize());
 app.use(passport.session());
 
 app.use(expressValidator());
 
 app.use(flash());
 
 app.use(function(req, res, next){
  res.locals.success_message = req.flash('success_message');
  res.locals.error_message = req.flash('error_message');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
 });

app.get('/', function(req,res){
res.render('login.ejs');
  });

  app.get('/home', function(req,res){
    res.render('home.ejs');
      });

app.get('/login', function(req,res){
    res.render('login.ejs');
      });
      app.get('/register', function(req,res){
        res.render('register.ejs');
          });
      app.get('/profile', function(req,res){
        res.render('profile.ejs');
          });     
app.get('/about', function(req,res){
        res.render('about.ejs');
           });

           app.get('/users', function(req,res){
            console.log('aaa');
               });

               
app.listen(port,function(){
    console.log(`Server is on port ${port}`);
});