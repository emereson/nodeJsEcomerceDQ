import { ClientOrder } from '../../models/clientModels/clientOrder.model.js';
import { AppError } from '../../utils/AppError.js';
import { catchAsync } from '../../utils/catchAsync.js';

export const validExistClientOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const clientOrder = await ClientOrder.findOne({
    where: {
      status: 'active',
      id,
    },
  });

  if (!clientOrder) {
    return next(new AppError(`clientOrder with id: ${id} not found `, 404));
  }

  req.clientOrder = clientOrder;
  next();
});
