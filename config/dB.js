const mongoose = require("mongoose");


const connectdB = async() => {
    try {
       await mongoose.connect(process.env.MONGO_URL)
       console.log("MongodB connected"); 
    } catch (error) {
      console.log(error);  
    }
}


module.exports = connectdB;