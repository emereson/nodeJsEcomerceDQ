import express from 'express';

import * as clientAuthMiddleware from '../../middlewares/clientMiddleware/clientAuth.middleware.js';
import * as clientOrderMiddleware from '../../middlewares/clientMiddleware/clientOrder.middleware.js';
import * as orderController from '../../controllers/clientControllers/order.controllers.js';
import * as orderMiddleware from '../../middlewares/clientMiddleware/order.middleware.js';

const router = express.Router();

router.get('/', orderController.findAll);
router.use(clientAuthMiddleware.protect);

router
  .route('/:id')
  .get(orderMiddleware.validExistOrder, orderController.findOne)
  .post(clientOrderMiddleware.validExistClientOrder, orderController.create)
  .delete(orderMiddleware.validExistOrder, orderController.deleteElement);

const orderRouter = router;

export { orderRouter };
