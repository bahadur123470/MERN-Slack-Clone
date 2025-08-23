import mongoose from "mongoose"
import { ENV } from "./env.js"

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(ENV.MONGO_URI)
        console.log(`MongoDB Connected:`, conn.connection.host)
    } catch (error) {
        console.log(`Error Connecting to MongoDB:`, error);
        process.exit(1); // Exit process with failure code 1 , success code is 0
    }
}