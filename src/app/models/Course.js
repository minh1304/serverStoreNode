import mongoose from 'mongoose';
import slug from 'mongoose-slug-generator';
import mongooseDelete from 'mongoose-delete';

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
