import express from 'express';
import { upload } from '../../utils/multer.js';

import * as clientMiddleware from '../../middlewares/clientMiddleware/client.middleware.js';
import * as clientAuthMiddleware from '../../middlewares/clientMiddleware/clientAuth.middleware.js';
import * as clientController from '../../controllers/clientControllers/client.controllers.js';

const router = express.Router();

router.post('/login', clientController.login);
router.post('/signup', clientController.signup);
router.get('/:id', clientMiddleware.validExistClient, clientController.findOne);
router.use(clientAuthMiddleware.protect);

router.patch(
  '/update-password',
  clientMiddleware.validExistClient,
  clientController.updatePassword
);
router.patch(
  '/update-img/:id',
  upload.single('clientImg'),
  clientMiddleware.validExistClient,
  clientController.updateImg
);

router
  .route('/:id')
  .delete(clientMiddleware.validExistClient, clientController.deleteClient)
  .patch(clientMiddleware.validExistClient, clientController.update);

const clientRouter = router;

export { clientRouter };
