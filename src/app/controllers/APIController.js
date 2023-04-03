// import Course from '../models/Course';
import Product from '../models/Product';
import {
    multipleMongooseToObject,
    mongooseToObject,
} from '../../util/mongoose';

class APIController {
    // [GET] /products
    //get all products
    async getAllProducts(req, res, next) {
        try {
            const products = await Product.find({});
            res.status(200).json({
                message: 'OK',
                products: multipleMongooseToObject(products),
            });
        } catch (error) {
            next(error);
        }
    }

    //[GET] /products/:id
    //GET single product
    async getSingleProduct(req, res, next) {
        try {
            const product = await Product.findOne({ id: req.params.id });
            res.status(200).json({
                message: 'OK',
                product: mongooseToObject(product),
            });
        } catch (error) {
            next(error);
        }
    }

    //[GET] /products/categories
    //Get all categories

    async getCategories(req, res, next) {
        try {
            const category = await Product.distinct('category');
            res.status(200).json({
                message: 'OK',
                data: category,
            });
        } catch (error) {
            next(error);
        }
    }
}
export default new APIController();
