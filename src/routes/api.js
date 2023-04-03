import express from 'express';
import APIController from '../app/controllers/APIController';
const router = express.Router();


//all products
router.get('/products', APIController.getAllProducts);

//all category
router.get('/products/categories', APIController.getCategories)

//single product
router.get('/products/:id', APIController.getSingleProduct);

export default router;
