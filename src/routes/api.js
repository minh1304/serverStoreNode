import express from 'express';
import APIController from '../app/controllers/APIController';
const router = express.Router();



//all products sort price
// router.get('/products?sort=desc', APIController.getAllProductsSort)

//all products
router.get('/products', APIController.getAllProducts);


//all category
router.get('/products/categories', APIController.getCategories)


//get product in specific category
router.get('/products/category/:category', APIController.getListOfCategory)


//single product
router.get('/products/:id', APIController.getSingleProduct);

export default router;
