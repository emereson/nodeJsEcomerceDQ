import { Client } from '../../models/clientModels/client.model.js';
import { ClientOrder } from '../../models/clientModels/clientOrder.model.js';
import { Order } from '../../models/clientModels/order.model.js';
import { AppError } from '../../utils/AppError.js';
import { catchAsync } from '../../utils/catchAsync.js';

export const validExistClient = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const client = await Client.findOne({
    where: {
      status: 'active',
      id,
    },
    include: [
      {
        model: ClientOrder,
        include: [Order],
      },
    ],
    order: [[ClientOrder, 'createdAt', 'DESC']],
  });

  if (!client) {
    return next(new AppError(`client with id: ${id} not found `, 404));
  }

  req.client = client;
  req.ClientOrder = client.ClientOrder;
  req.Order = ClientOrder.Order;
  next();
});
