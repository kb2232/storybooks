var express = require('express'),
  mongoose = require('mongoose'),
  authroutes = require('./routes/auth'),
  passport = require('passport'),
  passportConfig = require('./config/passport');

var app = express();

//home page
app.get('/',(req,res)=>{
  res.send('starting project: login');
})

authroutes(app);

var PORT = process.env.PORT || 5000;
  app.listen(PORT,()=>{
    console.log(`Server listen at door:${PORT}`);
  });