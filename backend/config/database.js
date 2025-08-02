import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(
            `Connected to MongoDB database ${mongoose.connection.host}`
        );
    } catch (error) {
        console.error(`❌ MongoDB connection error: ${error.message}`);
    process.exit(1); 
    }
};
export default connectDB;
