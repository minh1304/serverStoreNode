import mongoose from 'mongoose';
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;
const CourseSchema = new Schema(
    {
        name: { type: String },
        description: { type: String, minLength: 1 },
        video_id: { type: String, required: true },
        image: { type: String },
        price: { type: Number, minLength: 1 },
        slug: {
            type: String,
            slug: 'name',
        },
    },
    {
        timestamps: true,
    },
);

CourseSchema.plugin(slug);
CourseSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

const Course = mongoose.model('Course', CourseSchema);
export default Course;
