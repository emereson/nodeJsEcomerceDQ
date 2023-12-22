import express from 'express';

import * as sectionProductMiddleware from '../../middlewares/productsMiddleware/sectionProduct.middleware.js';
import * as categoryProductMiddleware from '../../middlewares/productsMiddleware/categoryProduct.middleware.js';
import * as categoryProductController from '../../controllers/productControllers/categoryProduct.controllers.js';
import * as userAuthMiddleware from '../../middlewares/userAuth.middleware.js';

const router = express.Router();

router.get('/all-products/:id', categoryProductController.findAll);
router.get(
  '/:id',
  categoryProductMiddleware.validExistCategoryProduct,
  categoryProductController.findOne
);

router.use(userAuthMiddleware.protect);
router
  .route('/:id')

  .post(
    sectionProductMiddleware.validExistSectionProduct,
    categoryProductController.create
  )
  .patch(
    categoryProductMiddleware.validExistCategoryProduct,
    categoryProductController.update
  )
  .delete(
    categoryProductMiddleware.validExistCategoryProduct,
    categoryProductController.deleteElement
  );

const categoryProductRouter = router;

export { categoryProductRouter };
