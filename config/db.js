//Connection file to mongo db
import mongoose from "mongoose";

const connectDB = async () => {

  const mongourl = "mongodb+srv://Boobalan:boobalan1234@cluster0.ixzoi.mongodb.net/Nodezipper-App";

  try {
    const conn = await mongoose.connect(mongourl, {    
      useUnifiedTopology: true, 
      useNewUrlParser: true,  
      useCreateIndex: true,   
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) { 
    console.error(`Error: ${error.message}`.red);
    process.exit();    
  }
};

export default connectDB;
