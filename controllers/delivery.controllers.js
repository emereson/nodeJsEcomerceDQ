import { Delivery } from '../models/delivery.model.js';
import { catchAsync } from '../utils/catchAsync.js';

export const findAll = catchAsync(async (req, res) => {
  const deliveries = await Delivery.findAll({
    order: [['id', 'ASC']],
  });

  return res.status(200).json({
    status: 'success',
    results: deliveries.length,
    deliveries,
  });
});

export const findOne = catchAsync(async (req, res) => {
  const { delivery } = req;

  return res.status(200).json({
    status: 'success',
    delivery,
  });
});

export const create = catchAsync(async (req, res) => {
  const { name, description, price, linkMap } = req.body;

  const delivery = await Delivery.create({
    name,
    description,
    price,
    linkMap,
  });

  return res.status(200).json({
    status: 'success',
    message: 'The delivery has been created',
    delivery,
  });
});

export const update = catchAsync(async (req, res) => {
  const { delivery } = req;
  const { name, description, linkMap, price } = req.body;

  await delivery.update({
    name,
    description,
    price,
    linkMap,
  });

  return res.status(200).json({
    status: 'success',
    message: 'delivery information has been updated',
    delivery,
  });
});

export const deleteElement = catchAsync(async (req, res) => {
  const { delivery } = req;

  await delivery.destroy();

  return res.status(200).json({
    status: 'success',
    message: `The delivery with id: ${delivery.id} has been deleted`,
  });
});
