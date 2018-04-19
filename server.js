var express = require('express'),
  exphps = require('express-handlebars'),
  mongoose = require('mongoose'),
  cookieSession = require('cookie-session'), //enables cookie
  authroutes = require('./routes/auth'),
  cserverRoutes = require('./routes/cserver'),
  userModel = require('./models/User'),
  passport = require('passport'),
  keys = require('./config/keys'),
  passportConfig = require('./config/passport');

var app = express();

//connect to mongoose
mongoose.connect(keys.mongoURI);
var db_obj = mongoose.connection;
db_obj.on('error', console.error.bind(console, 'connection error:'));
db_obj.once('open', function() {
  console.log('MongoDB Connected...');
});


//cookie middleware
//used to set parameters for cookie
app.use(
  cookieSession({
    //maximum time cookie stays in browser in ms - 30 days
    maxAge: 30*24*60*60*1000,
    //keys is used to encrpyt the cookie
    keys:[keys.cookieKey]
  })
);
//tell passport to make use of cookies
app.use(passport.initialize());
//the above starts serializeUser
app.use(passport.session());
//the above is used to preprocess the token sent from the browser

//settings for middleware
/*
we need to define the engine were the app will display
app.engine(extension, callback).
When a request is made to fetch a page, the server looks for a file main with extension .handlebars inside directory ->views/layouts/
*/
app.engine('handlebars',exphps({defaultLayout:'main'}));

/*
we need to set the above engine;
app.set(name,value);
Assigns setting name to value
*/
app.set('view engine','handlebars');


//global variables to have access to user
//this allows us to use
//{{# if user}} ...
app.use((req,res,next)=>{
  res.locals.user = req.user || null;
  next()
});

authroutes(app);
cserverRoutes(app);


var PORT = process.env.PORT || 5000;
  app.listen(PORT,()=>{
    console.log(`Server listen at door:${PORT}`);
  });