import mongoose from 'mongoose';
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;
const OrderSchema = new Schema(
    {
        address: { type: String },
        status: { type: String, default: "Processing"},
        name: { type: String },
        note: { type: String },
        phoneNumber: { type: String },
        purchased: {type: Object},
        total: { type: Number },
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
OrderSchema.query.sortable = function (req) {
    if (req.query.hasOwnProperty('sort')) {
        const sort = req.query.sort === 'desc' ? -1 : 1;
        return this.sort({ price: sort });
    }
    return this;
};

//query pagination
OrderSchema.query.pageTable = function (req, PAGE_SIZE) {
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
delete OrderSchema.methods.delete;

OrderSchema.plugin(slug);
OrderSchema.plugin(mongooseDelete, options);

const Order = mongoose.model('Order', OrderSchema);
export default Order;
