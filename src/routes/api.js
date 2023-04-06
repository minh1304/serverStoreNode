import express, { application } from 'express';
import Account from '../app/models/Account';
import APIController from '../app/controllers/APIController';
const router = express.Router();
const jwt = require('jsonwebtoken');


//MiddleWare check token
const checkToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (token) {
        try {
            const decodedToken = jwt.verify(token, 'mk');
            Account.findOne({
                _id: decodedToken,
            })
                // res.json(decodedToken);
                .then((data) => {
                    if (data) {
                        req.data = data;
                        next();
                        // res.json(data)
                    } else {
                        res.json('NOT PERMISSION');
                    }
                })
                .catch();
        } catch (err) {
            res.status(401).json('Invalid token');
        }
    } else {
        res.status(401).json('Token not found');
    }
};


//MiddleWare check isAdmin
const checkAdmin = (req, res, next) => {
    if (req.data.role === 'admin') {
        next();
    } else {
        res.json('NOT PERMISSION');
    }
};

//middleware check username exists or not

// const checkUsername = (req, res, next) => {
//     // const account = await Account.find({username})
// }


//register
router.post('/auth/register', APIController.register)

//login
router.post('/auth/login', APIController.login);


//get current user
// router.get('/auth/me', checkToken, APIController.getCurrentUser);
router.get('/auth/me', checkToken, APIController.getCurrentUser);

//get all users with admin
router.get(
    '/auth/admin/users',
    checkToken,
    checkAdmin,
    APIController.getAllUsers,
);


//get all products with admin 
router.get('/auth/admin/products', checkToken, checkAdmin, APIController.getAllProductsAdmin)

//post product with admin
router.post(
    '/auth/admin/product/add',
    checkToken,
    checkAdmin,
    APIController.addProductsAdmin,
);


//all category
router.get('/products/categories', APIController.getCategories);

//single product
router.get('/products/:id', APIController.getSingleProduct);

//get product in specific category
router.get('/products/category/:category', APIController.getListOfCategory);

//all products
router.get('/products', APIController.getAllProducts);

export default router;
