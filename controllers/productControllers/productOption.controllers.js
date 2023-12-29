import { ProductOption } from '../../models/productModels/productOption.model.js';
import { catchAsync } from '../../utils/catchAsync.js';

export const findAll = catchAsync(async (req, res) => {
  const productOptions = await ProductOption.findAll();

  return res.status(200).json({
    status: 'success',
    results: productOptions.length,
    productOptions,
  });
});

export const findOne = catchAsync(async (req, res) => {
  const { productOption } = req;

  return res.status(200).json({
    status: 'success',
    productOption,
  });
});

export const create = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { name, size, price, discount } = req.body;

  const productOption = await ProductOption.create({
    productId: id,
    name,
    size,
    price,
    discount,
  });

  return res.status(200).json({
    status: 'success',
    message: 'the productOption  has been create',
    productOption,
  });
});

export const update = catchAsync(async (req, res) => {
  const { productOption } = req;
  const { name, size, price, discount } = req.body;

  await productOption.update({
    name,
    size,
    price,
    discount,
  });

  return res.status(200).json({
    status: 'success',
    message: 'productOption information has been updated',
    productOption,
  });
});

export const deleteElement = catchAsync(async (req, res) => {
  const { productOption } = req;

  await productOption.destroy();

  return res.status(200).json({
    status: 'success',
    message: `The productOption with id: ${productOption.id} has been deleted`,
  });
});
