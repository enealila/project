const express = require('express');
const fileUpload = require('express-fileupload');
const {ObjectID} = require('mongodb');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
var {mongoose} = require('./db/mongoose');
var {User}= require('./models/users');
var app = express();
var port = process.env.PORT ||3000;
var path = require('path');

mongoose.connect('mongodb://localhost:27017');
let db = mongoose.connection;

db.once('open',function(){
console.log('Connected to db');
});
// Set the default templating engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
 //app.set('view engine','ejs');
// app.use(express.static(__dirname +''));

app.get('/', function(req,res){
res.render('login.ejs');
  });

  app.get('/home', function(req,res){
    res.render('home.ejs');
      });

app.get('/login', function(req,res){
    res.render('login.ejs');
      });
      app.get('/signup', function(req,res){
        res.render('signup.ejs');
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

app.post('/users',(req,res)=>{
  var name = _.pick(req.body,['name']); 
  var email = _.pick(req.body,['email']); 
  var username = _.pick(req.body,['username']); 
  var password = _.pick(req.body,['password1']); 
  var password2 = _.pick(req.body,['password2']); 
  
  req.checkBody('name','Name is required').notEmpty();
  req.checkBody('email','Email is required').notEmpty();
  req.checkBody('email','Email is not required').isMail();
  req.checkBody('username','Name is required').notEmpty();
  req.checkBody('password','Name is required').notEmpty();
  req.checkBody('password2','Name is required').equals(req.body.password);
if(errors){
  res.render('/users',{
    errors:errors
  });
}
  var newUser =  new User({
    name:name,
    email:email,
    username:username,
    password:password
  });
  bcrypt.genSalt(10,function(){
  bcrypt.hash(newUser.password,salt,function(err,hash){
  if(error){
    console.log(err);
  }
  newUser.password =hash;
  newUser.save(function(err){
    if(error){
      console.log(err);
    }else{
      // console.log('success');
      req.flash('success');
      res.redirect('./../views/login');
    }
  });
  });
   });
          });
               
app.listen(port,function(){
    console.log(`Server is on port ${port}`);
});