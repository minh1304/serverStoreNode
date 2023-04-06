import Account from '../models/Account';
import Product from '../models/Product';
import {
    multipleMongooseToObject,
    mongooseToObject,
} from '../../util/mongoose';
const jwt = require('jsonwebtoken');

const PAGE_SIZE = 4;

class APIController {
    // [GET] /products
    //get all products
    async getAllProducts(req, res, next) {
        try {
            let productQuery = Product.find({}).sortable(req);
            productQuery.pageTable(req, PAGE_SIZE);
            //đem vô file models/Product
            // if (req.query.hasOwnProperty('sort')) {
            //     const sort = req.query.sort === 'desc' ? -1 : 1;
            //     productQuery = productQuery.sort({ price: sort });
            // }
            const products = await productQuery;
            if (products.length === 0) {
                res.status(404).json({
                    message: 'No products found',
                });
            } else {
                res.status(200).json({
                    message: 'OK',
                    products: multipleMongooseToObject(products),
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Internal Server Error',
            });
        }
    }

    //[GET] /products/:id
    //GET single product
    async getSingleProduct(req, res, next) {
        try {
            const product = await Product.findOne({
                _id: req.params.id,
            });
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
            }).sortable(req);
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

    //[POST] /auth/register
    async register(req, res, next) {
        try {
            const formData = req.body;
            const isAccount = await Account.findOne({
                username: formData.username,
            });
            let notFound = false;
            if (isAccount) {
                notFound = true;
            }
            if (!notFound) {
                const account = new Account(formData);
                account
                    .save()
                    .then(() => {
                        res.json('Đã đăng ký thành công');
                    })
                    .catch((err) => res.json(err));
            } else {
                res.json('đã có tài khoản, Không cho đăng ký');
            }

            // if (isAccount) {
            //     res.json('Có rồi không cho đăng ký');
            // } else {
            //     const account = new Account(formData);
            //     account
            //         .save()
            //         .then(() => {
            //             res.json('Đã đăng ký thành công');
            //         })
            //         .catch((err) => res.json(err));
            // }
        } catch (error) {
            next(error);
        }
    }

    //[POST] /auth/login
    async login(req, res, next) {
        try {
            var username = req.body.username;
            var password = req.body.password;
            const account = await Account.findOne({
                username: username,
                password: password,
            });
            if (account) {
                const token = jwt.sign({ _id: account._id }, 'mk');
                return res.status(200).json({
                    message: 'OK',
                    token: token,
                });
            } else {
                return res.status(401).json({
                    message: 'Invalid username or password',
                });
            }
        } catch (error) {
            next(error);
        }
    }

    //[GET] /auth/me
    async getCurrentUser(req, res, next) {
        try {
            res.json(req.data);
        } catch (error) {
            next(error);
        }
    }

    //[GET] /auth/admin/user
    //Get all users with role is ADMIN
    async getAllUsers(req, res, next) {
        try {
            const accounts = await Account.find({ role: 'client' });
            let notFound = false;
            if (accounts.length === 0) {
                notFound = true;
            }
            if (!notFound) {
                res.status(200).json({
                    message: 'OK',
                    accounts: multipleMongooseToObject(accounts),
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
