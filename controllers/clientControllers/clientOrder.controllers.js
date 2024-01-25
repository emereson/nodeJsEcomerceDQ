import { catchAsync } from '../../utils/catchAsync.js';
import { ClientOrder } from '../../models/clientModels/clientOrder.model.js';
import { Order } from '../../models/clientModels/order.model.js';
import { Product } from '../../models/productModels/product.model.js';
import { sendConfirmationEmail } from '../../middlewares/nodemailer.middleware.js';

export const findAll = catchAsync(async (req, res) => {
  const clientOrders = await ClientOrder.findAll({
    where: { status: 'active' },
  });

  return res.status(200).json({
    status: 'success',
    results: clientOrders.length,
    clientOrders,
  });
});

export const findAllOneClient = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { page } = req.query;
  const itemsPerPage = 15;

  // Verificar si 'page' es un número válido
  const pageNumber = parseInt(page, 10);
  const offset = (pageNumber - 1) * itemsPerPage;

  const totalCount = await ClientOrder.count({
    where: { status: 'active', clientId: id },
  });

  const totalPages = await Math.ceil(totalCount / itemsPerPage);

  const clientOrders = await ClientOrder.findAll({
    where: { status: 'active', clientId: id },
    include: [Order],
    order: [['createdAt', 'DESC']],
    offset,
    limit: itemsPerPage,
  });

  return res.status(200).json({
    status: 'success',
    results: clientOrders.length,
    totalPages,
    currentPage: pageNumber,
    clientOrders,
  });
});

export const findOne = catchAsync(async (req, res) => {
  const { clientOrder } = req;

  return res.status(200).json({
    status: 'success',
    clientOrder,
  });
});

export const create = catchAsync(async (userId, dataPay) => {
  const { products, dataClient, delivery, totalPrice } = await dataPay;

  const peruTimeZone = 'America/Lima'; // Zona horaria de Perú

  const formattedDate = new Date().toLocaleDateString('es-PE', {
    timeZone: peruTimeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const formattedTime = new Date().toLocaleTimeString('es-PE', {
    timeZone: peruTimeZone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const clientOrder = await ClientOrder.create({
    clientId: userId,
    date: formattedDate,
    hour: formattedTime,
    name: dataClient?.name,
    phoneNumber: dataClient?.phoneNumber,
    email: dataClient?.email,
    address: dataClient?.address,
    reference: dataClient?.reference,
    message: dataClient?.message,
    deliveryName: `${delivery.name}:${delivery.description}`,
    deliveryPrice: delivery.price,
    total: Number(totalPrice),
  });

  // Crear pedidos individuales
  const orderPromises = products.map(async (product) => {
    await Order.create({
      clientOrderId: clientOrder.id,
      name: product.dataProduct.name,
      option: `${product.selectOption.name} ${product.selectOption.size}`,
      extras: product.selectExtra,
      numberOrder: product.counter,
      unitPrice: product.price,
      totalPrice: product.totalPrice,
    });

    const foundProduct = await Product.findOne({
      where: {
        id: product.dataProduct.id,
      },
    });

    await foundProduct.update({
      purchasedProduct: foundProduct.purchasedProduct + product.counter,
    });
  });

  await Promise.all(orderPromises);

  sendConfirmationEmail(products, dataClient, delivery, totalPrice);

  console.log('orden creada ');
});

export const update = catchAsync(async (req, res) => {
  const { clientOrder } = req;
  const { statusOrder } = req.body;

  await clientOrder.update({
    statusOrder,
  });

  return res.status(200).json({
    status: 'success',
    message: 'clientOrder information has been updated',
    clientOrder,
  });
});

export const deleteElement = catchAsync(async (req, res) => {
  const { clientOrder } = req;
  await clientOrder.update({
    status: 'disabled',
  });

  return res.status(200).json({
    status: 'success',
    message: `The clientOrder with id: ${clientOrder.id} has been deleted`,
  });
});
