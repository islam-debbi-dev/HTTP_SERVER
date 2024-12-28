const mongoose = require("mongoose");

async function connectToDB(){
    try{
      await  mongoose.connect(process.env.MONGO_URL);
        console.log("connected to MongoDB.")
    }catch(error){
        console.log("connection failed to MongoDB.", error);
    }
    }
    module.exports = {connectToDB};
  

