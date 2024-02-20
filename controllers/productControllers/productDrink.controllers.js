import { ProductDrink } from '../../models/productModels/productDrink.model.js';
import { catchAsync } from '../../utils/catchAsync.js';

export const findAll = catchAsync(async (req, res) => {
  const productDrinks = await ProductDrink.findAll();

  return res.status(200).json({
    status: 'success',
    results: productDrinks.length,
    productDrinks,
  });
});

export const findOne = catchAsync(async (req, res) => {
  const { productDrink } = req;

  return res.status(200).json({
    status: 'success',
    productDrink,
  });
});

export const create = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const productDrink = await ProductDrink.create({
    productId: id,
    name,
  });

  return res.status(200).json({
    status: 'success',
    message: 'the productDrink  has been create',
    productDrink,
  });
});

export const update = catchAsync(async (req, res) => {
  const { productDrink } = req;
  const { name } = req.body;

  await productDrink.update({
    name,
  });

  return res.status(200).json({
    status: 'success',
    message: 'productDrink information has been updated',
    productDrink,
  });
});

export const deleteElement = catchAsync(async (req, res) => {
  const { productDrink } = req;

  await productDrink.destroy();

  return res.status(200).json({
    status: 'success',
    message: `The productDrink with id: ${productDrink.id} has been deleted`,
  });
});
