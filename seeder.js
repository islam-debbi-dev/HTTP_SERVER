const {Book} = require("./models/Books.js");
const {books,authors} = require('./data.js');
const {connectToDB} = require("./config/db.js");
const { Author } = require("./models/Author.js");
require("dotenv").config();
// connection to db
connectToDB();

// import books
           
const importBokes = async ()=>{
    try{
        await Book.insertMany(books);
        console.log("books imported");
    }catch(error){
        console.log(error);
        process.exit(1); // if was error will exit 
    }
}
// import authors
           
const importauthors = async ()=>{
    try{
        await Author.insertMany(authors);
        console.log("Authors imported");
    }catch(error){
        console.log(error);
        process.exit(1); // if was error will exit 
    }
}
// remove books
const removeBokes = async ()=>{
    try{
        await Book.deleteMany();
        console.log("books removed");
    }catch(error){
        console.log(error);
        process.exit(1); // if was error will exit 
    }
}

if(process.argv[2] === "-i"){
    importBokes();
}else if(process.argv[2] === "-r"){
    removeBokes();
}else if (process.argv[2] === "-a"){
    importauthors();
}

