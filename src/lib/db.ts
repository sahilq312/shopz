import mongoose from "mongoose";


const MONGO = process.env.MONGO_URI as string
console.log(MONGO);


export default async function connect() {
    try {
        await mongoose.connect(MONGO)
        console.log("connected");
        
    } catch (error) {
        console.log(error);
        
    }
}