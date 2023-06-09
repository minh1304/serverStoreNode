import mongoose from 'mongoose';
// const slug = require('mongoose-slug-generator');
import slug from 'mongoose-slug-generator';
import mongooseDelete from 'mongoose-delete';

const Schema = mongoose.Schema;
const ProductSchema = new Schema(
    {
        title: { type: String },
        name: { type: String },
        category: { type: String },
        description: { type: String, minLength: 1 },
        image: { type: String },
        price: { type: Number },
        slug: {
            type: String,
            slug: 'name',
        },
    },
    {
        timestamps: true,
    },
);

//custom query
//query sort
ProductSchema.query.sortable = function (req) {
    if (req.query.hasOwnProperty('sort')) {
        const sort = req.query.sort === 'desc' ? -1 : 1;
        return this.sort({ price: sort });
    }
    return this;
};

//query pagination
ProductSchema.query.pageTable = function (req, PAGE_SIZE) {
    if (req.query.hasOwnProperty('page')) {
        var page = req.query.page; // "4"
        if (page) {
            page = parseInt(page);
            var skip = (page - 1) * PAGE_SIZE; // "12"
            return this.skip(skip).limit(PAGE_SIZE);
        }
    }
    return this;
};
// loại bỏ trường "deleted" mặc định của mongoose-delete
const options = { deletedAt: true, overrideMethods: 'all' };
delete ProductSchema.methods.delete;

ProductSchema.plugin(slug);
ProductSchema.plugin(mongooseDelete, options);

const Product = mongoose.model('Product', ProductSchema);
export default Product;
