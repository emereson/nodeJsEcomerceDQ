import { Client } from '../../models/clientModels/client.model.js';
import { AppError } from '../../utils/AppError.js';
import { catchAsync } from '../../utils/catchAsync.js';

export const validExistClient = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const client = await Client.findOne({
    where: {
      status: 'active',
      id,
    },
  });

  if (!client) {
    return next(new AppError(`client with id: ${id} not found `, 404));
  }

  req.client = client;
  next();
});
