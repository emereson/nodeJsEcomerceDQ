import { ProductExtra } from '../../models/productModels/productExtra.model.js';
import { catchAsync } from '../../utils/catchAsync.js';

export const findAll = catchAsync(async (req, res) => {
  const productExtras = await ProductExtra.findAll();

  return res.status(200).json({
    status: 'success',
    results: productExtras.length,
    productExtras,
  });
});

export const findOne = catchAsync(async (req, res) => {
  const { productExtra } = req;

  return res.status(200).json({
    status: 'success',
    productExtra,
  });
});

export const create = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;

  const productExtra = await ProductExtra.create({
    productId: id,
    name,
    price,
  });

  return res.status(200).json({
    status: 'success',
    message: 'the productExtra  has been create',
    productExtra,
  });
});

export const update = catchAsync(async (req, res) => {
  const { productExtra } = req;
  const { name, price } = req.body;

  await productExtra.update({
    name,
    price,
  });

  return res.status(200).json({
    status: 'success',
    message: 'productExtra information has been updated',
    productExtra,
  });
});

export const deleteElement = catchAsync(async (req, res) => {
  const { productExtra } = req;

  await productExtra.destroy();

  return res.status(200).json({
    status: 'success',
    message: `The productExtra with id: ${productExtra.id} has been deleted`,
  });
});
