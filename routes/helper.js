//allows us to export to other files
module.exports = {
  ensureAuthenticated: function(req, res, next){
    if(req.isAuthenticated()){
      return next();
    }
    res.redirect('/');
  }
}