import { catchAsync } from '../../utils/catchAsync.js';
import { ClientOrder } from '../../models/clientModels/clientOrder.model.js';

export const findAll = catchAsync(async (req, res) => {
  const clientOrders = await ClientOrder.findAll({
    where: { status: 'active' },
  });

  return res.status(200).json({
    status: 'success',
    results: clientOrders.length,
    clientOrders,
  });
});

export const findOne = catchAsync(async (req, res) => {
  const { clientOrder } = req;

  return res.status(200).json({
    status: 'success',
    clientOrder,
  });
});

export const create = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { address, reference, message, delivery, total } = req.body;

  const currentDate = new Date();
  const timezoneOffset = -5 * 60;
  const timezoneOffsetMilliseconds = timezoneOffset * 60 * 1000;

  const currentDateTimeInPeruTimeZone = new Date(
    currentDate.getTime() - timezoneOffsetMilliseconds
  );

  const day = currentDateTimeInPeruTimeZone.getDate();
  const month = currentDateTimeInPeruTimeZone.getMonth() + 1;
  const year = currentDateTimeInPeruTimeZone.getFullYear();
  const hours = currentDateTimeInPeruTimeZone.getHours();
  const minutes = currentDateTimeInPeruTimeZone.getMinutes();

  const formattedDate = `${day}-${month}-${year}`;
  const formattedTime = `${hours}:${minutes}`;

  const clientOrder = await ClientOrder.create({
    clientId: id,
    date: formattedDate,
    hour: formattedTime,
    address,
    reference,
    message,
    delivery,
    total,
  });

  return res.status(200).json({
    status: 'success',
    message: 'The clientOrder has been created',
    clientOrder,
  });
});

export const update = catchAsync(async (req, res) => {
  const { clientOrder } = req;

  await clientOrder.update({
    statusOrder: 'delivered',
  });

  return res.status(200).json({
    status: 'success',
    message: 'clientOrder information has been updated',
    clientOrder,
  });
});

export const deleteElement = catchAsync(async (req, res) => {
  const { clientOrder } = req;
  await clientOrder.update({
    status: 'disabled',
  });

  return res.status(200).json({
    status: 'success',
    message: `The clientOrder with id: ${clientOrder.id} has been deleted`,
  });
});
