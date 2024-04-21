import { OpeningHours } from '../models/openingHours.model.js';
import { AppError } from '../utils/AppError.js';
import { catchAsync } from '../utils/catchAsync.js';

export const validExistOpeningHours = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const openingHoure = await OpeningHours.findOne({
    where: {
      id,
    },
  });

  if (!openingHoure) {
    return next(new AppError(`openingHoure with id: ${id} not found `, 404));
  }

  req.openingHoure = openingHoure;
  next();
});
