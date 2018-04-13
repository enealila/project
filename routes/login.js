import express from 'express';
let router =  express.Router();

router.get('/', function(req, res){
  res.render('login');
});
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        next();
    }
    else{
        res.redirect("/users/login");
    }
}
export default router;