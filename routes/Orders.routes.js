import express from 'express';

import * as clientMiddleware from '../middlewares/clientMiddleware/client.middleware.js';
import * as clientOrderController from '../controllers/clientControllers/clientOrder.controllers.js';
import * as OrderController from '../controllers/orders.controller.js';
import * as clientOrderMiddleware from '../middlewares/clientMiddleware/clientOrder.middleware.js';
import * as userAuthMiddleware from '../middlewares/userAuth.middleware.js';

const router = express.Router();

router.use(userAuthMiddleware.protect);

router.get('/', OrderController.findAll);
router.get('/clients', OrderController.findAllClient);

router
  .route('/:id')
  .get(
    clientOrderMiddleware.validExistClientOrder,
    clientOrderController.findOne
  )
  .post(clientMiddleware.validExistClient, clientOrderController.create)
  .patch(
    clientOrderMiddleware.validExistClientOrder,
    clientOrderController.update
  )
  .delete(
    clientOrderMiddleware.validExistClientOrder,
    clientOrderController.deleteElement
  );

const ordersRouter = router;

export { ordersRouter };
