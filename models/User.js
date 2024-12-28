const Joi = require('joi');
const { default: mongoose } = require('mongoose');
const jwt = require("jsonwebtoken");


// user schema 
const UserSchema = new mongoose.Schema({
    email:{
        type : String,
        required : true,
        trim : true,
        maxlength:100,
        minlength:5,
        unique:true,
    },
    username:{
        type : String,
        required : true,
        trim : true,
        maxlength:200,
        minlength:2,
    },
    password:{
        type : String,
        required : true,
        trim : true,
        minlength:8,
    },
    isAdmin:{
        type:Boolean,
        default : false
    }
},{timestamps:true})
//generate token

UserSchema.methods.generateToken = function(){
    return jwt.sign({id: this._id,isAdmin: this.isAdmin},process.env.JWT_SECRET)
}

// user model
const User = mongoose.model("User",UserSchema);

// validation user
function validationRegisterUser(obj){
    const schema = Joi.object({
        email : Joi.string().trim().max(100).min(5).required().email(),
        username : Joi.string().trim().max(200).min(2).required(),
        password : Joi.string().trim().min(8).required(),
    })
    return schema.validate(obj);
}
// validate login user
function validationLoginUser(obj){
    const schema = Joi.object({
        email : Joi.string().trim().max(100).min(5).required().email(),
        password : Joi.string().trim().min(8).required(),

    })
    return schema.validate(obj);
}
// validate update usre
function validationUpdateUser(obj){
    const schema = Joi.object({
        email : Joi.string().trim().max(100).min(5).email(),
        username : Joi.string().trim().max(200).min(2),
        password : Joi.string().trim().min(8),
    })
    return schema.validate(obj);
}



module.exports={
    User,validationUpdateUser,validationRegisterUser,validationLoginUser
}
