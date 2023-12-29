import { Client } from '../models/clientModels/client.model.js';
import { ClientOrder } from '../models/clientModels/clientOrder.model.js';
import { Order } from '../models/clientModels/order.model.js';
import { catchAsync } from '../utils/catchAsync.js';

export const findAll = catchAsync(async (req, res) => {
  const { date, status } = req.query;

  const whereCondition = { status: 'active' };

  if (date) {
    whereCondition.date = date;
  }

  if (status && status !== 'todos') {
    whereCondition.statusOrder = status;
  }

  const clientOrders = await ClientOrder.findAll({
    where: whereCondition,
    include: {
      model: Order,
    },
  });

  return res.status(200).json({
    status: 'success',
    results: clientOrders.length,
    clientOrders,
  });
});

export const findAllClient = catchAsync(async (req, res) => {
  const { dni, name, phone, page } = req.query;
  const itemsPerPage = 20;

  const pageNumber = parseInt(page, 10);
  const offset = (pageNumber - 1) * itemsPerPage;

  const whereCondition = { status: 'active' };

  if (dni) {
    whereCondition.dni = dni;
  }

  if (name) {
    whereCondition.name = name;
  }

  if (phone) {
    whereCondition.phoneNumber = phone;
  }

  const totalCount = await Client.count({
    where: whereCondition,
  });

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const clients = await Client.findAll({
    where: whereCondition,
    order: [['createdAt', 'DESC']],
    offset,
    limit: itemsPerPage,
  });

  return res.status(200).json({
    status: 'success',
    results: clients.length,
    clients,
    totalPages,
    currentPage: pageNumber,
  });
});
