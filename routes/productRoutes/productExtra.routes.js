import express from 'express';

import * as productMiddleware from '../../middlewares/productsMiddleware/product.middleware.js';
import * as productExtraMiddleware from '../../middlewares/productsMiddleware/productExtra.middleware.js';
import * as productExtraController from '../../controllers/productControllers/productExtra.controllers.js';
import * as userAuthMiddleware from '../../middlewares/userAuth.middleware.js';

const router = express.Router();

router.get('/', productExtraController.findAll);

router.use(userAuthMiddleware.protect);

router
  .route('/:id')
  .get(
    productExtraMiddleware.validExistProductExtra,
    productExtraController.findOne
  )
  .post(productMiddleware.validExistProduct, productExtraController.create)
  .patch(
    productExtraMiddleware.validExistProductExtra,
    productExtraController.update
  )
  .delete(
    productExtraMiddleware.validExistProductExtra,
    productExtraController.deleteElement
  );

const productExtraRouter = router;

export { productExtraRouter };
