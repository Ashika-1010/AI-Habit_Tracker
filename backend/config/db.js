import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log("✅ Connected to MongoDB Server");
  } catch (err) {
    console.log("❌ MongoDB connection error:", err.message);
    throw err; 
  }
};

export default connectDB;