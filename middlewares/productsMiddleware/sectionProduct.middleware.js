import { CategoryProduct } from '../../models/productModels/categoryProduct.model.js';
import { SectionProduct } from '../../models/productModels/sectionProduct.model.js';
import { AppError } from '../../utils/AppError.js';
import { catchAsync } from '../../utils/catchAsync.js';

export const validExistSectionProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const sectionProduct = await SectionProduct.findOne({
    where: {
      id,
    },
    include: [
      {
        model: CategoryProduct,
      },
    ],
  });

  if (!sectionProduct) {
    return next(new AppError(`sectionProduct with id: ${id} not found `, 404));
  }

  req.sectionProduct = sectionProduct;
  req.CategoryProduct = sectionProduct.CategoryProduct;
  next();
});
