import { ProductPizza } from '../../models/productModels/productPizza.model.js';
import { catchAsync } from '../../utils/catchAsync.js';

export const findAll = catchAsync(async (req, res) => {
  const productPizzas = await ProductPizza.findAll();

  return res.status(200).json({
    status: 'success',
    results: productPizzas.length,
    productPizzas,
  });
});

export const findOne = catchAsync(async (req, res) => {
  const { productPizza } = req;

  return res.status(200).json({
    status: 'success',
    productPizza,
  });
});

export const create = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const productPizza = await ProductPizza.create({
    productId: id,
    name,
  });

  return res.status(200).json({
    status: 'success',
    message: 'the productPizza  has been create',
    productPizza,
  });
});

export const update = catchAsync(async (req, res) => {
  const { productPizza } = req;
  const { name } = req.body;

  await productPizza.update({
    name,
  });

  return res.status(200).json({
    status: 'success',
    message: 'productPizza information has been updated',
    productPizza,
  });
});

export const deleteElement = catchAsync(async (req, res) => {
  const { productPizza } = req;

  await productPizza.destroy();

  return res.status(200).json({
    status: 'success',
    message: `The productPizza with id: ${productPizza.id} has been deleted`,
  });
});
