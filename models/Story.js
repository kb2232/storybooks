var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/*
mongoose wants to know all the properties of model instances - this is why we create a schema
*/

var storySchema = new Schema(
  {
    title:{
      type:String,
      required:true
  },
  body:{
    type:String,
    required:true
  },
  status:{
    type:String,
    default:'public'
  },
  allowComments:{
    type:Boolean,
    default:true
  },
  comments:[{
    commentBody:{
      type:String,
      required: true
    },
    commentDate:{
      type:Date,
      default:Date.now
    },
    commentUser:{
      type: Schema.Types.ObjectId,
      ref:'usersCollection'
    },
  }],
  user:{
    type: Schema.Types.ObjectId,
    ref:'usersCollection'
  },
  date:{
    type:Date,
    default:Date.now
  }
});

//we need to create a model class to create collection
/*
model(arg1,arg2);
arg1: is the name of the collections in the actual mongodb
arg2: userSchema
*/
//if you use one argument, it means you tryna to fetch out of mongoose
mongoose.model('storyCollection',storySchema);