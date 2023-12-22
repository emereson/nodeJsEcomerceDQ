import { Order } from '../../models/clientModels/order.model.js';
import { AppError } from '../../utils/AppError.js';
import { catchAsync } from '../../utils/catchAsync.js';

export const validExistOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findOne({
    where: {
      status: 'active',
      id,
    },
  });

  if (!order) {
    return next(new AppError(`order with id: ${id} not found `, 404));
  }

  req.order = order;
  next();
});
