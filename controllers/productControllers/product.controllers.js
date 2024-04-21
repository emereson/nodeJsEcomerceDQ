import { ProductExtra } from '../../models/productModels/productExtra.model.js';
import { ProductOption } from '../../models/productModels/productOption.model.js';
import { catchAsync } from '../../utils/catchAsync.js';
import { storage } from '../../utils/firebase.js';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Product } from '../../models/productModels/product.model.js';
import { ProductPizza } from '../../models/productModels/productPizza.model.js';
import { ProductDrink } from '../../models/productModels/productDrink.model.js';

export const findAll = catchAsync(async (req, res) => {
  const products = await Product.findAll({
    include: [ProductExtra, ProductOption, ProductPizza, ProductDrink],
  });

  return res.status(200).json({
    status: 'success',
    results: products.length,
    products,
  });
});

export const findOne = catchAsync(async (req, res) => {
  const { product } = req;

  return res.status(200).json({
    status: 'success',
    product,
  });
});

export const create = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { name, description, label, labelColor } = req.body;

  const imgRef = ref(storage, `productImg/${Date.now()}-${req.file.originalname}`);

  await uploadBytes(imgRef, req.file.buffer);

  const imgUploaded = await getDownloadURL(imgRef);

  const product = await Product.create({
    categoryProductId: id,
    name,
    description,
    label,
    labelColor,
    productImg: imgUploaded,
  });

  return res.status(200).json({
    status: 'success',
    message: 'the product  has been create',
    product,
  });
});

export const update = catchAsync(async (req, res) => {
  const { product } = req;
  const { name, description, label, labelColor, viewText } = req.body;

  await product.update({
    name,
    description,
    label,
    labelColor,
    viewText,
  });

  return res.status(200).json({
    status: 'success',
    message: 'product information has been updated',
    product,
  });
});

export const updateImg = catchAsync(async (req, res) => {
  const { product } = req;

  const imgRef = ref(storage, `productImg/${Date.now()}-${req.file.originalname}`);

  await uploadBytes(imgRef, req.file.buffer);

  const imgUploaded = await getDownloadURL(imgRef);

  await product.update({
    productImg: imgUploaded,
  });

  return res.status(200).json({
    status: 'success',
    message: 'product img has been updated',
    product,
  });
});

export const deleteElement = catchAsync(async (req, res) => {
  const { product } = req;

  await product.destroy();

  return res.status(200).json({
    status: 'success',
    message: `The product with id: ${product.id} has been deleted`,
  });
});
