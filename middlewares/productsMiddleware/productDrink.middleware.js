import { ProductDrink } from '../../models/productModels/productDrink.model.js';
import { AppError } from '../../utils/AppError.js';
import { catchAsync } from '../../utils/catchAsync.js';

export const validExistProductDrink = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const productDrink = await ProductDrink.findOne({
    where: {
      id,
    },
  });

  if (!productDrink) {
    return next(new AppError(`productDrink with id: ${id} not found `, 404));
  }

  req.productDrink = productDrink;
  next();
});
