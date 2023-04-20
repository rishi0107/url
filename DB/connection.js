const mongoose = require('mongoose');
const URI ='mongodb+srv://admin:admin@cluster0.jddsec5.mongodb.net/test';

const connectDB = async() =>{
   await mongoose.connect(URI,{ useNewUrlParser: true, useUnifiedTopology: true });
   console.log('db connected...');
}
module.exports = connectDB;