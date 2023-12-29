import express from 'express';

import * as iziPayController from '../controllers/izipay.controllers.js';

const router = express.Router();

router.post('/createPayment', iziPayController.createPayment);
router.post('/validatePayment', iziPayController.validatePayment);
router.post('/ipn', iziPayController.notificationIPN);

const iziPayRouter = router;

export { iziPayRouter };
