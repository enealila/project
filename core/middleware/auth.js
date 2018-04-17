
var user        = {};
var is          = {};

var LOGGED = (req, res, next) => {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
};

var NOT_LOGGED = (req, res, next) => {
  if(req.isAuthenticated()){
    res.redirect('/');
    return;
  } else {
    next();
  }
}




is.LOGGED       = LOGGED;
is.NOT_LOGGED   = NOT_LOGGED;
user.is         = is;

module.exports = user;