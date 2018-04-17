var express = require('express');
var router = express.Router();
var passport = require('passport');
var bcrypt = require('bcryptjs');
var LocalStrategy = require('passport-local').Strategy;
var auth = require('../core/middleware/auth');
// var upload = require('../core/middleware/upload');
var User = require('../models/user');
var path =require('path');
// var formidable = require('formidable'),
//  http = require('http'),
//  util = require('util'),
//  fs   = require('fs-extra');

router.get('/',  function(req, res){
    res.render('login');
});
router.get('/login', auth.is.NOT_LOGGED  , function(req, res){
    res.render('login');
});
router.get('/register', auth.is.NOT_LOGGED ,function(req, res){
  	res.render('register');
});
router.get('/home', auth.is.LOGGED , function(req, res){
        res.render('home');
});
router.get('/profile', auth.is.LOGGED , function(req, res){
    res.render('profile');
});
router.get('/about', auth.is.LOGGED , function(req, res){
    res.render('about');
});


router.post('/register', function(req, res){
  	var name = req.body.name; 
    var email = req.body.email;
    var username = req.body.username;            
    var password = req.body.password;
    var password2 = req.body.password2;
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Please enter a valid email').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Confirm Password is required').notEmpty();
    req.checkBody('password2', 'Confirm Password Must Matches With Password').equals(password);

    var errors = req.validationErrors();
    if(errors)
    {
        res.render('register',{errors: errors});
    }
    else
    {
        var newUser = new User({
        name: name,
        email: email,
        username:username,
        password: password
        });
        User.createUser(newUser, function(err, user){
            if(err) throw err;
            else console.log(user);
        });
        req.session.success = true;
        req.flash('success_message','You have registered, Now please login');
        res.redirect('/login');
    }
});


passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log(username,password);
   User.getUserByUsername(username, function(err, user){
    if(err) throw err;
    if(!user){
       return done(null, false, {message: 'Unknown User'});
    }
    User.comparePassword(password, user.password, function(err, isMatch){
       console.log(password);
       console.log(user.password);
      if(err) throw err;
      if(isMatch){
         console.log(isMatch);
        return done(null, user);
      } else {
         console.log('invalid pass');
        return done(null, false, {message: 'Invalid password'});
      }
    });
   });
  }));


passport.serializeUser(function(user, done) {
  	done(null,user.id);
});

passport.deserializeUser(function(id, done) {
  	User.getUserById(id,function(err, user) {
        done(err, user);
  	});
});

router.post('/login', passport.authenticate('local', {
  successRedirect:'/home', failureRedirect: '/register', failureFlash: true
    }), 
    function(req, res){
        req.flash('success_message', 'You are now Logged in!!');
  		res.redirect('/home');
    }
);

router.get('/logout', function(req, res){
    req.logout();
    req.flash('success_message', 'You are logged out');
    res.redirect('/login');
});

const multer =  require('multer');

const storage = multer.diskStorage({
    destination:'./public/uploads',
    filename: function(req,file,callback){
        callback(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname));
    }
});

//init upload

const upload = multer({
    storage:storage
}).single('myphoto');

router.post('/upload',function(req,res){
	upload(req,res,function(err){
		if(err){
			res.render('profile',{
				msg:err
			});
		}else{
			console.log(req.file);
			res.send('test');
		}
	});

	});







// router.post('upload',function(req,res,next){
// 	var formidable = require('formidable');
// 	var form = new formidable.IncomingForm();
// 	form.uploadDir='../public/uploads';
// 	form.keepExtensions=true;
// 	form.maxFieldsSize=10*1024*1024;
// 	form.multiples=true;
// 	form.parse(request,function(err,fields,file){
// 		if(err){
// 			response.json({
// 				result:"failed",
// 				data:{},
// 				message:`Cannor upload ${err}`
// 			})
// 		}
// 		var arrayOfFiles = files[""];
// 		if(arrayOfFiles.length>0){
// 			var fileNames = [];
// 			arrayOfFiles.forEach(function(eachFile){
// 				fileNames.push(eachFile.path)
// 			});
// 			response.json({
// 				result:"ok",
// 				data:fileNames,
// 				numberOfImages:filenames.length,
// 				message:"Upload successfully"
// 			});
// 		}
// 			else{
// 				response.json({
// 					result:"failed",
// 					data:{},
// 					message:`no foto tu upload `
// 			});
// 		}
	
// });});

module.exports=router;