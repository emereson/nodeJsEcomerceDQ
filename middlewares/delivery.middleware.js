import { Delivery } from '../models/delivery.model.js';
import { AppError } from '../utils/AppError.js';
import { catchAsync } from '../utils/catchAsync.js';

export const validExistDelivery = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const delivery = await Delivery.findOne({
    where: {
      id,
    },
  });

  if (!delivery) {
    return next(new AppError(`delivery with id: ${id} not found `, 404));
  }

  req.delivery = delivery;
  next();
});
