import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import rateLimit from 'express-rate-limit';
import xss from 'xss-clean';

import { AppError } from './utils/AppError.js';

import { usersRouter } from './routes/user.routes.js';
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

const app = express();

app.set('trust proxy', 1);
const limiter = rateLimit({
  max: 3000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in one hour.',
});

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(cors());
app.use(xss());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(hpp());
app.use('/api/v1', limiter);
app.use('/api/v1/user', usersRouter);
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

app.all('*', (req, res, next) => {
  return next(
    new AppError(`Can't find ${req.originalUrl} on this server! 💀`, 404)
  );
});

export { app };
