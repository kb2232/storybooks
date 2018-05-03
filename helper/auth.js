module.exports = 
{
  ensureAuthenticated: function(req,res,next) {
    if(req.isAuthenticated()) {
      return next()
    }
    res.redirect('/');
  },
  ensureGuest: function(req,res,next) 
  {
    if(req.isAuthenticated()) 
    {
      res.redirect('/api/dashboard');
    } else {
      return next();
    }
  }
}