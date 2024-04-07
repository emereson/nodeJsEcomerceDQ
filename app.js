import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import http from 'http'; // Importa el módulo http
import { Server as SocketServer } from 'socket.io';

import rateLimit from 'express-rate-limit';
import xss from 'xss-clean';
import { AppError } from './utils/AppError.js';

import { usersRouter } from './routes/user.routes.js';
import { ordersRouter } from './routes/Orders.routes.js';
// client import
import { clientRouter } from './routes/clientRoutes/client.routes.js';
import { clientOrderRouter } from './routes/clientRoutes/clientOrder.routes.js';
import { orderRouter } from './routes/clientRoutes/order.routes.js';

// pizzas import
import { sectionProductRouter } from './routes/productRoutes/sectionProduct.routes.js';
import { categoryProductRouter } from './routes/productRoutes/categoryProduct.routes.js';
import { productRouter } from './routes/productRoutes/product.routes.js';
import { productOptionRouter } from './routes/productRoutes/productOption.routes.js';
import { productExtraRouter } from './routes/productRoutes/productExtra.routes.js';
import { productDrinkRouter } from './routes/productRoutes/productDrink.routes.js';
import { productPizzaRouter } from './routes/productRoutes/productPizza.routes.js';

//delivery
import { deliveryRouter } from './routes/delivery.routes.js';

//izipay
import { iziPayRouter } from './routes/iziPay.routes.js';
import { globalErrorHandler } from './controllers/error.controller.js';

const app = express();

app.set('trust proxy', 1);
const limiter = rateLimit({
  max: 10000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in one hour.',
});

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const server = http.createServer(app);

const io = new SocketServer(server, {
  path: '/socket.io',
  cors: {
    origin: 'https://admin.donquezo.com',
  },
});

app.use(express.json());
app.use(cors());
app.use(xss());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use(hpp());
app.set('io', io);
io.on('connection', (socket) => {
  console.log(`WebSocket connected: ${socket.id}`);
});
app.use('/api/v1', limiter);
app.use('/api/v1/user', usersRouter);
app.use('/api/v1/orders', ordersRouter);
// client rotues
app.use('/api/v1/client', clientRouter);
app.use('/api/v1/client-order', clientOrderRouter);
app.use('/api/v1/order', orderRouter);
// pizzas
app.use('/api/v1/section-product', sectionProductRouter);
app.use('/api/v1/category-product', categoryProductRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/product-option', productOptionRouter);
app.use('/api/v1/product-extra', productExtraRouter);
app.use('/api/v1/product-drink', productDrinkRouter);
app.use('/api/v1/product-pizza', productPizzaRouter);
//delivery
app.use('/api/v1/delivery', deliveryRouter);
//izipay
app.use('/api/v1/izipay', iziPayRouter);

app.all('*', (req, res, next) => {
  return next(new AppError(`Can't find ${req.originalUrl} on this server! 💀`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message });
  } else {
    next(err);
  }
});

app.use(globalErrorHandler);

export { app, server };
