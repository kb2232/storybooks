var express = require('express'),
  mongoose = require('mongoose');

var app = express();

//home page
app.get('/',(req,res)=>{
  res.send('starting project');
})

var PORT = process.env.PORT || 5000;
  app.listen(PORT,()=>{
    console.log(`Server listen at door:${PORT}`);
  });