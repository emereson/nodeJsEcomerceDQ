import { ProductOption } from '../../models/productModels/productOption.model.js';
import { AppError } from '../../utils/AppError.js';
import { catchAsync } from '../../utils/catchAsync.js';

export const validExistProductOption = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const productOption = await ProductOption.findOne({
    where: {
      id,
    },
  });

  if (!productOption) {
    return next(new AppError(`productOption with id: ${id} not found `, 404));
  }

  req.productOption = productOption;
  next();
});
