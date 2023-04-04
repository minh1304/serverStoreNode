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
            let notFound = false;
            if (products.length === 0) {
                notFound = true;
            }
            if (!notFound) {
                res.status(200).json({
                    message: 'OK',
                    products: multipleMongooseToObject(products),
                });
            } else {
                res.status(404).json({
                    message: 'Not found',
                });
            }
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

    //[GET] /products/category/:category
    //get product in a specific category

    async getListOfCategory(req, res, next) {
        try {
            const products = await Product.find({
                category: req.params.category,
            });
            let notFound = false;
            if (products.length === 0) {
                notFound = true;
            }
            if (!notFound) {
                res.status(200).json({
                    message: 'OK',
                    products: multipleMongooseToObject(products),
                });
            } else {
                res.status(404).json({
                    message: 'Not found',
                });
            }
        } catch (error) {
            next(error);
        }
    }
}
export default new APIController();
