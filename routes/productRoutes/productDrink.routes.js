import express from 'express';

import * as productMiddleware from '../../middlewares/productsMiddleware/product.middleware.js';
import * as productDrinkMiddleware from '../../middlewares/productsMiddleware/productDrink.middleware.js';
import * as productDrinkController from '../../controllers/productControllers/productDrink.controllers.js';
import * as userAuthMiddleware from '../../middlewares/userAuth.middleware.js';

const router = express.Router();

router.get('/', productDrinkController.findAll);

router.use(userAuthMiddleware.protect);

router
  .route('/:id')
  .get(productDrinkMiddleware.validExistProductDrink, productDrinkController.findOne)
  .post(productMiddleware.validExistProduct, productDrinkController.create)
  .patch(productDrinkMiddleware.validExistProductDrink, productDrinkController.update)
  .delete(productDrinkMiddleware.validExistProductDrink, productDrinkController.deleteElement);

const productDrinkRouter = router;

export { productDrinkRouter };
