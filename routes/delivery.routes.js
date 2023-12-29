import express from 'express';

import * as deliveryController from '../controllers/delivery.controllers.js';
import * as deliveryMiddleware from '../middlewares/delivery.middleware.js';
import * as userAuthMiddleware from '../middlewares/userAuth.middleware.js';

const router = express.Router();

router.get('/', deliveryController.findAll);
router.use(userAuthMiddleware.protect);

router.post('/', deliveryController.create);

router
  .route('/:id')
  .get(deliveryMiddleware.validExistDelivery, deliveryController.findOne)
  .patch(deliveryMiddleware.validExistDelivery, deliveryController.update)
  .delete(
    deliveryMiddleware.validExistDelivery,
    deliveryController.deleteElement
  );

const deliveryRouter = router;

export { deliveryRouter };
