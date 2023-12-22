import { catchAsync } from '../../utils/catchAsync.js';
import { Order } from '../../models/clientModels/order.model.js';

export const findAll = catchAsync(async (req, res) => {
  const orders = await Order.findAll();

  return res.status(200).json({
    status: 'success',
    results: orders.length,
    orders,
  });
});

export const findOne = catchAsync(async (req, res) => {
  const { order } = req;

  return res.status(200).json({
    status: 'success',
    order,
  });
});

export const create = catchAsync(async (req, res) => {
  const { name, option, extras, numberOrder, unitPrice, totalPrice } = req.body;

  const order = await Order.create({
    name,
    option,
    extras,
    numberOrder,
    unitPrice,
    totalPrice,
  });

  res.status(201).json({
    status: 'success',
    message: 'The order has been created successfully!',
    order,
  });
});

export const deleteElement = catchAsync(async (req, res) => {
  const { order } = req;

  await order.destroy();

  return res.status(200).json({
    status: 'success',
    message: `The order with id: ${order.id} has been deleted`,
  });
});
