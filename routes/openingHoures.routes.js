import express from 'express';

import * as openingHoursController from '../controllers/openingHours.controllers.js';
import * as openingHoursMiddleware from '../middlewares/openingHours.middleware.js';
import * as userAuthMiddleware from '../middlewares/userAuth.middleware.js';

const router = express.Router();

router.get('/', openingHoursController.findAll);
router.get('/:id', openingHoursMiddleware.validExistOpeningHours, openingHoursController.findOne);
router.use(userAuthMiddleware.protect);
router.post('/', openingHoursController.create);

router
  .route('/:id')
  .patch(openingHoursMiddleware.validExistOpeningHours, openingHoursController.update)
  .delete(openingHoursMiddleware.validExistOpeningHours, openingHoursController.deleteElement);

const openingHoursRouter = router;

export { openingHoursRouter };
