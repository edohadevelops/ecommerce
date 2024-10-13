const mongoose = require("mongoose");

module.exports = async() => {
    
    try{
        const conn = await mongoose.connect(process.env.DB);
        console.log("MongoDb connected at: ",conn.connection.host)
    } catch(error){
        console.log("Error connecting to database at: ",error)
    }
}