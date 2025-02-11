const mongoose = require('mongoose');
const connectDB = async () => {

    try {
        const mognoUri = process.env.MONGO_URI
      const conn = await mongoose.connect(mognoUri);
      console.log(`MongoDB Connected`);
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  }
  module.exports = connectDB;