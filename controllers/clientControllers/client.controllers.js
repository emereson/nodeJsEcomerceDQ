import { Client } from '../../models/clientModels/client.model.js';
import { catchAsync } from '../../utils/catchAsync.js';
import bcrypt from 'bcryptjs';
import { generateJWT } from '../../utils/jwt.js';
import { AppError } from '../../utils/AppError.js'; // Asegúrate de importar AppError si no lo has hecho
import { storage } from '../../utils/firebase.js';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { sendEmailLinkRecoverPassword } from '../../middlewares/nodemailer.middleware.js';
import { v4 as uuidv4 } from 'uuid';

export const findAll = catchAsync(async (req, res) => {
  const clients = await Client.findAll({
    where: { status: 'active' },
  });

  return res.status(200).json({
    status: 'success',
    results: clients.length,
    clients,
  });
});

export const findOne = catchAsync(async (req, res) => {
  const { client } = req;

  return res.status(200).json({
    status: 'success',
    client,
  });
});

export const signup = catchAsync(async (req, res) => {
  const { name, lastName, dni, email, date, phoneNumber, address, password } = req.body;

  const salt = await bcrypt.genSalt(12);
  const encryptedPassword = await bcrypt.hash(password, salt);

  const client = await Client.create({
    name,
    lastName,
    dni,
    email,
    phoneNumber,
    date,
    address,
    codeRecoverPassword: '0',
    password: encryptedPassword,
  });

  const token = await generateJWT(client.id);

  res.status(201).json({
    status: 'success',
    message: 'The client has been created successfully!',
    token,
    client,
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const client = await Client.findOne({
    where: {
      email,
      status: 'active',
    },
  });

  if (!client) {
    return next(new AppError('Email no found', 404));
  }

  const passwordMatch = await bcrypt.compare(password, client.password);
  if (!passwordMatch) {
    return next(new AppError('Password incorrect', 401));
  }

  const token = await generateJWT(client.id);

  res.status(201).json({
    status: 'success',
    token,
    client,
  });
});

export const update = catchAsync(async (req, res) => {
  const { client } = req;
  const { name, lastName, phoneNumber, address } = req.body;

  await client.update({
    name,
    lastName,
    phoneNumber: Number(phoneNumber),
    address,
  });

  return res.status(200).json({
    status: 'success',
    message: 'client information has been updated',
    client,
  });
});

export const linkRecoverPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const code = uuidv4();

  const client = await Client.findOne({ where: { email } });

  if (!client) {
    return next(new AppError(`El correo es no se encuentra registrado`, 404));
  }

  await client.update({ codeRecoverPassword: code }, { where: { clientId: client.id } });

  const link = `https://shop.donquezo.com/#/update-password/client/${client.id}/codeRecoverPassword/${code}`;

  sendEmailLinkRecoverPassword(client.email, link);

  // Responde con el estado 200 y un mensaje de éxito junto con los datos del cliente
  return res.status(200).json({
    status: 'success',
    message: 'link Password send email successfully.',
    client,
  });
});

export const updatePassword = catchAsync(async (req, res, next) => {
  const { id, code } = req.params;
  const { newPassword } = req.body;

  const client = await Client.findOne({ where: { id, codeRecoverPassword: code } });
  const salt = await bcrypt.genSalt(12);
  const encryptedPassword = await bcrypt.hash(newPassword, salt);

  if (!client) {
    return next(new AppError(`El Link es invalido`, 404));
  }
  await client.update({
    password: encryptedPassword,
  });

  return res.status(200).json({
    status: 'success',
    message: 'client password update has been updated',
  });
});

export const updateImg = catchAsync(async (req, res) => {
  const { client } = req;

  const imgRef = ref(storage, `clientImg/${Date.now()}-${req.file.originalname}`);

  await uploadBytes(imgRef, req.file.buffer);

  const imgUploaded = await getDownloadURL(imgRef);

  await client.update({
    clientImg: imgUploaded,
  });

  return res.status(200).json({
    status: 'success',
    message: 'client img has been updated',
    client,
  });
});

export const deleteClient = catchAsync(async (req, res) => {
  const { client } = req;

  await client.update({
    status: 'disabled',
  });

  return res.status(200).json({
    status: 'success',
    message: `The client with id: ${client.id} has been deleted`,
  });
});
