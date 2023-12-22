import { ProductExtra } from '../../models/productModels/productExtra.model.js';
import { AppError } from '../../utils/AppError.js';
import { catchAsync } from '../../utils/catchAsync.js';

export const validExistProductExtra = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const productExtra = await ProductExtra.findOne({
    where: {
      id,
    },
  });

  if (!productExtra) {
    return next(new AppError(`productExtra with id: ${id} not found `, 404));
  }

  req.productExtra = productExtra;
  next();
});
