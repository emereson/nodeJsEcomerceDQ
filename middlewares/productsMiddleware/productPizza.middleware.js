import { ProductPizza } from '../../models/productModels/productPizza.model.js';
import { AppError } from '../../utils/AppError.js';
import { catchAsync } from '../../utils/catchAsync.js';

export const validExistProductPizza = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const productPizza = await ProductPizza.findOne({
    where: {
      id,
    },
  });

  if (!productPizza) {
    return next(new AppError(`productPizza with id: ${id} not found `, 404));
  }

  req.productPizza = productPizza;
  next();
});
