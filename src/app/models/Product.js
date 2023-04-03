import mongoose from 'mongoose';
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;
const ProductSchema = new Schema(
    {
        name: { type: String },
        category: { type: String },
        description: { type: String, minLength: 1 },
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
ProductSchema.plugin(slug);
ProductSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

const Product = mongoose.model('Product', ProductSchema);
export default Product;
