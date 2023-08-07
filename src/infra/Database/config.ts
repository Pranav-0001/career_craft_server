import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()
const url=process.env.MONGODB_URL as string

// console.log(url);


export const db=()=>{
mongoose.connect(url)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.log(error.message);
  });
}