import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/`);
        console.log('Connected to Database...');
    } catch (error) {
        console.log(`${error}`); 
    }
};

export default connectDB;
