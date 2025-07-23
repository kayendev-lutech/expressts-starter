import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { globalLimiter, authLimiter } from './config/rateLimit.config.js';
import { corsOptions } from './config/cors.config.js';
import { helmetOptions,  } from './config/helmet.config.js';
// Middleware
import { errorHandler } from './middleware/errorHandler.js';
import { generateDeviceIdMiddleware } from './middleware/deviceId-generator.middleware.js';
import apiWatcher from './middleware/api-watcher.middleware.js';
import notFoundHandler from './middleware/notFoundHandler.js';
// Routes
import healthRoute from '@module/health/health.route.js';
import userRoute from '@module/user/user.route.js';
import authRoute from '@module/authentication/auth.route.js';
import productRoute from '@module/product/product.route.js';
import categoryRoute from '@module/category/category.route.js';


const app = express();
app.set('trust proxy', 1);

app.use(helmet(helmetOptions));
app.use(cors(corsOptions));

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

app.use(generateDeviceIdMiddleware());
app.use(apiWatcher);
app.use(globalLimiter);

app.get('/', (_req, res) => res.send('Welcome to the Express TypeScript App!'));

app.use('/api/v1/auth', authLimiter, authRoute);
app.use('/api/v1/user', userRoute);
app.use('/api/v1/product', productRoute);
app.use('/api/v1/category', categoryRoute);
app.use('/api/v1', healthRoute);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;