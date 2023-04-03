import express from 'express';
const router = express.Router();
import productController from '../app/controllers/ProductController';

// router.get('/create', productController.create);
// router.post('/store', productController.store);
// router.get('/:id/edit', productController.edit);
// router.post('/handle-form-actions', productController.handleFormActions)
// router.put('/:id', productController.update);
// router.patch('/:id/restore', productController.restore)
// router.delete('/:id', productController.delete);
// router.delete('/:id/force', productController.forceDelete);


router.get('/categories', productController.showCategory)
router.get('/category/:category', productController.showList)
router.get('/:id', productController.show);

export default router;
