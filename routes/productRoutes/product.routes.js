import express from 'express';
import { upload } from '../../utils/multer.js';

import * as categoryProductMiddleware from '../../middlewares/productsMiddleware/categoryProduct.middleware.js';
import * as productController from '../../controllers/productControllers/product.controllers.js';
import * as productMiddleware from '../../middlewares/productsMiddleware/product.middleware.js';
import * as userAuthMiddleware from '../../middlewares/userAuth.middleware.js';

const router = express.Router();

router.get('/', productController.findAll);
router.use(userAuthMiddleware.protect);
router.patch(
  '/:id/updateImg',
  upload.single('productImg'),
  productMiddleware.validExistProduct,
  productController.updateImg
);

router
  .route('/:id')
  .get(productMiddleware.validExistProduct, productController.findOne)
  .post(
    upload.single('productImg'),
    categoryProductMiddleware.validExistCategoryProduct,
    productController.create
  )
  .patch(productMiddleware.validExistProduct, productController.update)
  .delete(productMiddleware.validExistProduct, productController.deleteElement);

const productRouter = router;

export { productRouter };
