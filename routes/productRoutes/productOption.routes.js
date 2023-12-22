import express from 'express';

import * as productMiddleware from '../../middlewares/productsMiddleware/product.middleware.js';
import * as productOptionMiddleware from '../../middlewares/productsMiddleware/productOption.middleware.js';
import * as productOptionController from '../../controllers/productControllers/productOption.controllers.js';
import * as userAuthMiddleware from '../../middlewares/userAuth.middleware.js';

const router = express.Router();

router.get('/', productOptionController.findAll);
router.use(userAuthMiddleware.protect);

router
  .route('/:id')
  .get(
    productOptionMiddleware.validExistProductOption,
    productOptionController.findOne
  )
  .post(productMiddleware.validExistProduct, productOptionController.create)
  .patch(
    productOptionMiddleware.validExistProductOption,
    productOptionController.update
  )
  .delete(
    productOptionMiddleware.validExistProductOption,
    productOptionController.deleteElement
  );

const productOptionRouter = router;

export { productOptionRouter };
