import express from 'express';

import * as clientMiddleware from '../../middlewares/clientMiddleware/client.middleware.js';
import * as clientAuthMiddleware from '../../middlewares/clientMiddleware/clientAuth.middleware.js';
import * as clientOrderController from '../../controllers/clientControllers/clientOrder.controllers.js';
import * as clientOrderMiddleware from '../../middlewares/clientMiddleware/clientOrder.middleware.js';

const router = express.Router();

router.get('/', clientOrderController.findAll);
router.use(clientAuthMiddleware.protect);

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

const clientOrderRouter = router;

export { clientOrderRouter };
