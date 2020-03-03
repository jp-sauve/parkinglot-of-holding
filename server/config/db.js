const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    console.log(`MongoDB Connected:  ${connection.connection.host}`);
    mongoose.connection.on(
      "error",
      console.error.bind(console, "MongoDB connection error:")
    );
  } catch (err) {
    console.log("Database connection error. Check config.env for validity ", err);
  }
};
module.exports = connectDB;
