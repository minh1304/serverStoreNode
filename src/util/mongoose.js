const multipleMongooseToObject = (mongooses) => {
    return mongooses.map((mongoose) => mongoose.toObject());
};
const mongooseToObject = (mongoose) => {
    return mongoose ? mongoose.toObject() : mongoose;
};
export {multipleMongooseToObject, mongooseToObject}
