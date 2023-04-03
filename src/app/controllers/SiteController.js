import { multipleMongooseToObject } from '../../util/mongoose';
import Product from '../models/Product';

class NewController {
    //[GET] /home
    home(req, res, next) {
        Product.find({})
        .then((products) => {
            res.render('home', {
                products: multipleMongooseToObject(products),
            });
        })
        .catch(next);
        
    }
    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}
export default new NewController();
