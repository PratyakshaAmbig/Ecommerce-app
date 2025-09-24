const mongoose = require('mongoose');

const connectDB = async()=>{
    await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`)
}

module.exports=connectDB;