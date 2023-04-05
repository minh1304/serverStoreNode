import express, { application } from 'express';
import Account from '../app/models/Account';
import APIController from '../app/controllers/APIController';
const router = express.Router();
const jwt = require('jsonwebtoken');

//login
router.post('/auth/login', APIController.login);

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

//get current user
// router.get('/auth/me', checkToken, APIController.getCurrentUser);
router.get('/auth/me', checkToken, (req, res, next) => {
    res.json(req.data);
});

//all products
router.get('/products', APIController.getAllProducts);

//all category
router.get('/products/categories', APIController.getCategories);

//get product in specific category
router.get('/products/category/:category', APIController.getListOfCategory);

//single product
router.get('/products/:id', APIController.getSingleProduct);

export default router;
