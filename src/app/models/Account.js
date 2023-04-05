import mongoose from 'mongoose';
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;
const AccountSchema = new Schema(
    {
        email: { type: String },
        username: { type: String },
        password: { type: String },
        role: { type: String },

        slug: {
            type: String,
            slug: 'name',
        },
    },
    {
        timestamps: true,
    },
);

AccountSchema.plugin(slug);
AccountSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

const Account = mongoose.model('user', AccountSchema);
export default Account;
