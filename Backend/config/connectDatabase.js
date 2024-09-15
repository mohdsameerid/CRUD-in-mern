import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const connectDatabase = async () => {
    try {
        const res = await mongoose.connect(process.env.MONGO_URl);
        console.log(`Database connected: ${res.connection.host}`);
    }
    catch (err) {
        console.log(`Database not connected: ${err}`);
        process.exit(1);
    }
}
export default connectDatabase;
