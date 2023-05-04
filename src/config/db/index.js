import mongoose from 'mongoose';
async function connect() {
    try {
        // await mongoose.connect('mongodb://localhost:27017/store_dev', {});
        await mongoose.connect('mongodb+srv://tuanminhvo:a0858251139@cluster0.790t6qi.mongodb.net/test', {});
        console.log('Connect successfully!!!');
    } catch (error) {
        console.log('Connect failure!!!');
    }
}

export default connect;
