import Product from '../models/Product.js';
import { mongooseToObject } from '../../util/mongoose.js';

class ProductController {
    // [GET] /products/:id
    show(req, res, next) {
        Product.findOne({ id: req.params.id })
            .then((product) => {
                res.render('products/show', {
                    product: mongooseToObject(product),
                });
            })
            .catch(next);
        // res.render('products/show');
    }
    //[GET] /product/category/:category
    showList(req, res, next) {
        Product.find({ category: req.params.category })
            .then((products) => {
                res.json(products);
            })
            .catch(next);

        // res.json(req.params);
    }
    //[GET] /product/categories
    showCategory(req, res, next) {
        Product.distinct('category')
            .then((products) => {
                res.json(products);
            })
            .catch(next);
    }
}
export default new ProductController();
