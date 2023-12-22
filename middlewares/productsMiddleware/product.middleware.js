import { Product } from '../../models/productModels/product.model.js';
import { AppError } from '../../utils/AppError.js';
import { catchAsync } from '../../utils/catchAsync.js';

export const validExistProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findOne({
    where: {
      id,
    },
  });

  if (!product) {
    return next(new AppError(`product with id: ${id} not found `, 404));
  }

  req.product = product;
  next();
});
