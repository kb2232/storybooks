var express = require('express');

//home page
module.exports = (app) => 
{
  app.get('/',(req,res)=>{
    res.render('index/welcome');
  });

  app.get('/api/dashboard',(req,res)=>
  {
    res.render('index/dashboard');
  })
}