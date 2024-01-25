import axios from 'axios';
import hmacSHA256 from 'crypto-js/hmac-sha256.js';
import Hex from 'crypto-js/enc-hex.js';
import { catchAsync } from '../utils/catchAsync.js';
import { create } from './clientControllers/clientOrder.controllers.js';

export const createFormToken = catchAsync(async (req, res) => {
  const dataPay = req.body;

  const username = '14730041';

  // format: testprivatekey_XXXXXXX
  const password = 'testpassword_8tPpklmw0jRjT6p8xwZZhQrzJIcuCVrMwVVlMJWnejdHD';

  // format: api.my.psp.domain.name without https
  const endpoint = 'api.micuentaweb.pe';

  const options = {
    method: 'POST',
    url: `https://${username}:${password}@${endpoint}/api-payment/V4/Charge/CreatePayment`,
    headers: {
      Authorization:
        '78651207:testpublickey_CzixtA11eW23woh0DYE9f2CnfloSyBL0B6sGLU7aaAYyv',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    data: {
      amount: Number(dataPay.totalPrice) * 100,
      currency: 'PEN',
      orderId: 'myOrderId-999999',
      customer: {
        email: 'sample@example.com',
      },
    },
  };

  try {
    const { data } = await axios.request(options);
    return res.status(200).json(data.answer.formToken); // Devuelve la respuesta como JSON
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
    // Puedes elegir manejar el error de manera específica según tus necesidades
  }
});

export const validPayments = catchAsync(async (req, res) => {
  const dataPay = req.body.dataPay;
  const userData = req.body.userData;
  const answer = req.body.paymentData.clientAnswer;
  const hash = req.body.paymentData.hash;
  const answerHash = Hex.stringify(
    hmacSHA256(
      JSON.stringify(answer),
      'JRXKliEcXvbfksOOVZexX5DsIPDfwCpmiFJHtz8dvojBX'
    )
  );

  if (hash === answerHash) {
    create(userData.id, dataPay);
    res.status(200).send('Valid payment');
  } else {
    res.status(500).send('Payment hash mismatch');
  }
});
