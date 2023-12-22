import { CategoryProduct } from '../../models/productModels/categoryProduct.model.js';
import { ProductExtra } from '../../models/productModels/productExtra.model.js';
import { ProductOption } from '../../models/productModels/productOption.model.js';
import { AppError } from '../../utils/AppError.js';
import { catchAsync } from '../../utils/catchAsync.js';
import { Product } from '../../models/productModels/product.model.js';

export const validExistCategoryProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const categoryProduct = await CategoryProduct.findOne({
    where: {
      id,
    },
    include: [
      {
        model: Product,
        include: [ProductExtra, ProductOption],
      },
    ],
  });

  if (!categoryProduct) {
    return next(new AppError(`categoryProduct with id: ${id} not found `, 404));
  }

  req.categoryProduct = categoryProduct;
  req.Product = categoryProduct.Product;
  req.ProductExtra = Product.ProductExtra;
  req.ProductOption = Product.ProductOption;
  next();
});
