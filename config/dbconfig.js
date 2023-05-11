import mongoose from "mongoose";

export const connectDB=async()=>{
    try {
        const con=await mongoose.connect("mongodb+srv://hnp:abcd@cluster0.m8zxpgg.mongodb.net/ecommerce");
        console.log(`Connected to ${con}`.bgWhite.cyan);
    } catch (error) {
        console.log(error);
    }
}

