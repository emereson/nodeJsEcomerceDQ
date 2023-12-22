import { catchAsync } from '../../utils/catchAsync.js';
import { CategoryProduct } from '../../models/productModels/categoryProduct.model.js';
import { Product } from '../../models/productModels/product.model.js';
import { ProductExtra } from '../../models/productModels/productExtra.model.js';
import { ProductOption } from '../../models/productModels/productOption.model.js';

export const findAll = catchAsync(async (req, res) => {
  const { id } = req.params;

  const categoryProducts = await CategoryProduct.findAll({
    where: { sectionProductId: id },
    include: [
      {
        model: Product,
        include: [ProductExtra, ProductOption],
      },
    ],
  });

  return res.status(200).json({
    status: 'success',
    results: categoryProducts.length,
    categoryProducts,
  });
});

export const findOne = catchAsync(async (req, res) => {
  const { categoryProduct } = req;

  return res.status(200).json({
    status: 'success',
    categoryProduct,
  });
});

export const create = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const categoryProduct = await CategoryProduct.create({
    sectionProductId: id,
    name,
  });

  return res.status(200).json({
    status: 'success',
    message: 'categoryProduct  has been create',
    categoryProduct,
  });
});

export const update = catchAsync(async (req, res) => {
  const { categoryProduct } = req;
  const { name } = req.body;

  await categoryProduct.update({
    name,
  });

  return res.status(200).json({
    status: 'success',
    message: 'categoryProduct information has been updated',
    categoryProduct,
  });
});

export const deleteElement = catchAsync(async (req, res) => {
  const { categoryProduct } = req;

  await categoryProduct.destroy();

  return res.status(200).json({
    status: 'success',
    message: `The categoryProduct with id: ${categoryProduct.id} has been deleted`,
  });
});
