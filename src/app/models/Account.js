import mongoose from 'mongoose';
import slug from 'mongoose-slug-generator';
import mongooseDelete from 'mongoose-delete';

const Schema = mongoose.Schema;
const AccountSchema = new Schema(
    {
        email: { type: String, default: 'ahhihi@gmail.com' },
        name: { type: Object },
        phone: { type: Number},
        username: { type: String },
        password: { type: String },
        role: { type: String, default: 'client' },

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
