import mongoose from "mongoose";


export const db=()=>{
mongoose.connect("mongodb://127.0.0.1:27017/career")
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.log(error.message);
  });
}