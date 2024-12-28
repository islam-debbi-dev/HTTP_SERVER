const { required } = require("joi");
const mongoose =   require("mongoose");
const Joi = require('joi');

const AuthorSchema = new mongoose.Schema({
    firstname :{
        type : String ,
        required : true,
        trim : true,
        minlenght : 3,
        maxlenght :200,
    },
    lastname :{
        type : String ,
        required : true,
        trim : true,
        minlenght : 3,
        maxlenght :200,
    },
    nationality :{
        type : String ,
        required : true,
        trim : true,
        minlenght : 3,
        maxlenght :100,
    },
    image :{
        type : String ,
        default : "default-avatar.png",    
    }
},{
    timestamps:true // for 
}
);


const Author = mongoose.model("Author",AuthorSchema);

// Validate create author
function validateAuthor(obj) {
    const schema = Joi.object({
      firstname: Joi.string().trim().min(3).max(200).required(),
      lastname: Joi.string().trim().min(3).max(200).required(),
      nationality: Joi.string().trim().min(3).max(100).required(),
      image: Joi.string().uri()
    });
    return schema.validate(obj);
  }
  
  // Validate update author
  function validateUpdateAuthor(obj) {
    const schema = Joi.object({
      firstname: Joi.string().trim().min(3).max(200),
      lastname: Joi.string().trim().min(3).max(200),
      nationality: Joi.string().trim().min(2).max(100),
      image: Joi.string().uri()
    });
    return schema.validate(obj);
  }
module.exports = { 
    Author ,validateAuthor,validateUpdateAuthor

};