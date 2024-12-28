const { string } = require("joi");
const  mongoose  = require("mongoose");
const Joi = require('joi');

const BookSchema = new mongoose.Schema ({
    title :{
        type : String ,
        required : true,
        trim : true,
        minlenght : 3,
        maxlenght :200,
    },
    author:{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "Author"
    },
    description:{
        type:String,
        required : true,
        trim : true,
        minlenght : 5,
    

    },
    price :{
        type :String,
        required : true,
        min : 0
    },
    cover:{
        type :String,
        required : true,
        enum : [
            "soft",
            "hard"
        ]
    }
},{timestamps:true})
// validate craete book
function validateBook(obj){
    const schema = Joi.object({
        title: Joi.string().trim().min(3).max(200).required(), // trim() remove the white space
        author: Joi.string().required(),
        description: Joi.string().min(5).required(),
        price: Joi.number().min(0).required(),
        cover: Joi.string().valid("soft", "hard").required()
    });
    return schema.validate(obj);
}
// validate update book
function validateUpdateBook(obj){
    const schema = Joi.object({
        title: Joi.string().trim().min(3).max(200), // trim() remove the white space
        author: Joi.string(),
        description: Joi.string().min(10).trim(),
        price: Joi.number().min(0),
        cover: Joi.string().valid("soft", "hard")
    });
    return schema.validate(obj);
}




const Book = mongoose.model("Book",BookSchema);

module.exports = {
    Book,
    validateBook,
    validateUpdateBook
};

