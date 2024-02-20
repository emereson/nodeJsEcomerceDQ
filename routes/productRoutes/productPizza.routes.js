import express from 'express';

import * as productMiddleware from '../../middlewares/productsMiddleware/product.middleware.js';
import * as productPizzaMiddleware from '../../middlewares/productsMiddleware/productPizza.middleware.js';
import * as productPizzaController from '../../controllers/productControllers/productPizza.controllers.js';
import * as userAuthMiddleware from '../../middlewares/userAuth.middleware.js';

const router = express.Router();

router.get('/', productPizzaController.findAll);

router.use(userAuthMiddleware.protect);

router
  .route('/:id')
  .get(productPizzaMiddleware.validExistProductPizza, productPizzaController.findOne)
  .post(productMiddleware.validExistProduct, productPizzaController.create)
  .patch(productPizzaMiddleware.validExistProductPizza, productPizzaController.update)
  .delete(productPizzaMiddleware.validExistProductPizza, productPizzaController.deleteElement);

const productPizzaRouter = router;

export { productPizzaRouter };
