import { OpeningHours } from '../models/openingHours.model.js';
import { catchAsync } from '../utils/catchAsync.js';

export const findAll = catchAsync(async (req, res) => {
  const openingHours = await OpeningHours.findAll({
    order: [['id', 'ASC']],
  });

  return res.status(200).json({
    status: 'success',
    results: openingHours.length,
    openingHours,
  });
});

export const findOne = catchAsync(async (req, res) => {
  const { openingHoure } = req;

  return res.status(200).json({
    status: 'success',
    openingHoure,
  });
});

export const create = catchAsync(async (req, res) => {
  const { startTime, endTime } = req.body;

  const openingHoure = await OpeningHours.create({
    startTime,
    endTime,
  });

  return res.status(200).json({
    status: 'success',
    message: 'The opening Houre has been created',
    openingHoure,
  });
});

export const update = catchAsync(async (req, res) => {
  const { openingHoure } = req;
  const { startTime, endTime } = req.body;

  await openingHoure.update({
    startTime,
    endTime,
  });

  return res.status(200).json({
    status: 'success',
    message: 'openingHoure information has been updated',
    openingHoure,
  });
});

export const deleteElement = catchAsync(async (req, res) => {
  const { openingHoure } = req;

  await openingHoure.destroy();

  return res.status(200).json({
    status: 'success',
    message: `The openingHoure with id: ${openingHoure.id} has been deleted`,
  });
});
