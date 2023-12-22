import express from 'express';
import { upload } from '../../utils/multer.js';

import * as sectionProductMiddleware from '../../middlewares/productsMiddleware/sectionProduct.middleware.js';
import * as sectionProductController from '../../controllers/productControllers/sectionProduct.controllers.js';
import * as userAuthMiddleware from '../../middlewares/userAuth.middleware.js';

const router = express.Router();

router.get('/', sectionProductController.findAll);
router.get(
  '/:id',
  sectionProductMiddleware.validExistSectionProduct,
  sectionProductController.findOne
);
router.use(userAuthMiddleware.protect);
router.patch(
  '/:id/updateImg',
  upload.single('sectionProductImg'),
  sectionProductMiddleware.validExistSectionProduct,
  sectionProductController.updateImg
);
router.post(
  '/',
  upload.fields([
    { name: 'sectionProductImg', maxCount: 1 },
    { name: 'sectionIcon', maxCount: 1 },
  ]),
  sectionProductController.create
);

router
  .route('/:id')
  .patch(
    upload.single('sectionIcon'),
    sectionProductMiddleware.validExistSectionProduct,
    sectionProductController.update
  )
  .delete(
    sectionProductMiddleware.validExistSectionProduct,
    sectionProductController.deleteElement
  );

const sectionProductRouter = router;

export { sectionProductRouter };
