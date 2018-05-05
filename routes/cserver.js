var express = require('express'),
   mongoose = require('mongoose'),
   Story = mongoose.model('storyCollection'),
  {ensureAuthenticated, ensureGuest} = require('../helper/auth');


module.exports = (app) => 
{
  app.get('/',ensureGuest,(req,res)=>{
    res.render('index/welcome');
  });
  
  app.get('/api/home',(req,res)=>{
    res.render('index/welcome');
  });

  app.get('/api/dashboard', ensureAuthenticated, async (req, res) => 
  {
        var stories = await Story.find({user:req.user.id});
        res.render('index/dashboard', {stories: stories});
  });

  app.get('/api/about',ensureAuthenticated,(req,res)=>
  {
    res.render('index/about');
  });

}