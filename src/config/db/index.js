import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

async function connect() {
    try {
        // await mongoose.connect('mongodb://localhost:27017/store_dev', {});
        // await mongoose.connect('mongodb+srv://vtm1304:IPMRPli2KcJIMCG8@cluster0.i5ziru3.mongodb.net/test', {});
        await mongoose.connect(process.env.MONGODB_URI, {});
        console.log('Connect successfully!!!');
    } catch (error) {
        console.log('Connect failure!!!');
    }
}

export default connect;
