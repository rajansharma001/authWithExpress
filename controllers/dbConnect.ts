import mongoose from "mongoose";

export const dbConnet = async () => {
  const mongo_uri = process.env.MONGO_URI!;
  try {
    await mongoose.connect(mongo_uri);
    console.log("dbConnected");
  } catch (error) {
    console.log("DB connection error");
    process.exit(1);
  }
};
