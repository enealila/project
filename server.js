var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/register');
var db = mongoose.connection;

var routes = require('./routes/index');
var users = require('./routes/users');

//init app 
var app = express();

//view engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

//bodyParser middleware 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());

//set static folder
app.use(express.static(path.join(__dirname,'public')));

//express session
app.use(session({
    secret:'secret',
    saveUninitialized:true,
    resave:true
}));

//passport init 
app.use(passport.initialize());
app.use(passport.session());

//express validator 
app.use(expressValidator({
    errorFormatter:function(param,msg,value){
        var namespace = param.split('.'),
        root = namespace.shift(),
        formParam = root;
        while(namespace.length){
            formParam+='['+namespace.shift()+']';
        }
        return{
            param: formParam,
            msg : msg,
            value:value
        };
    }
}));

//connect flash middleware
app.use(flash());


//global vars 
app.use(function(req,res,next){
 res.locals.success_msg=req.flash('success_msg');
 res.locals.error=req.flash('error_msg');
 res.locals.error=req.flash('error');
next();
});

app.use('/',routes);
app.use('/users',users);

//set port
app.set('port',(process.env.PORT || 3000));

app.listen(app.get('port'),function(){
    console.log('Server started on port '+app.get('port'));
});








// const express = require('express');
// const expressValidator = require('express-validator');
// const session = require('express-session');
// const fileUpload = require('express-fileupload');
// const cookeParser = require('cookie-parser');
// const bodyParser = require('body-parser');
// const ejs = require('ejs');
// const flash = require('connect-flash');
// const path = require('path');
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// var {mongoose} = require('./db/mongoose');

// var app = express();
// var port = process.env.PORT ||3000;

// var routes = require('./routes/index');
// var users = require('./routes/users');

// mongoose.connect('mongodb://localhost/passport');
// var db = mongoose.connection;

// db.once('open',function(){
// console.log('Connected to db');
// });


// app.set('view engine','ejs');
// app.set('views',path.join(__dirname,'views'));
// app.use(express.static(__dirname + '/public'));


// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(cookeParser());
// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
//  }));
 
//  app.use(passport.initialize());
//  app.use(passport.session());
 
//  app.use(expressValidator({
//     errorFormatter:function(param,msg,value){
//         var namespace = param.split('.'),
//         root = namespace.shift(),
//         formParam = root;
//         while(namespace.length){
//             formParam+='['+namespace.shift()+']';
//         }
//         return{
//             param: formParam,
//             msg : msg,
//             value:value
//         };
//     }
// }));
 
//  app.use(flash());
 
//  app.use(function(req, res, next){
//   res.locals.success_message = req.flash('success_message');
//   res.locals.error_message = req.flash('error_message');
//   res.locals.error = req.flash('error');
//   res.locals.user = req.user || null;
//   next();
//  });


// // app.get('/', function(req,res){
// // res.render('login.ejs');
// //   });

// //   app.get('/home', function(req,res){
// //     res.render('home.ejs');
// //       });

// // app.get('/login', function(req,res){
// //     res.render('login.ejs');
// //       });
// //       app.get('/register', function(req,res){
// //         res.render('register.ejs');
// //           });
// //       app.get('/profile', function(req,res){
// //         res.render('profile.ejs');
// //           });     
// // app.get('/about', function(req,res){
// //         res.render('about.ejs');
// //            });
               
// app.listen(port,function(){
//     console.log(`Server is on port ${port}`);
// });