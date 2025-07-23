import { CorsOptions } from 'cors';
import { frontEndUrls } from '../constants/env.constants.js';

const FRONTEND_URLS = frontEndUrls.split(',').map(url => url.trim());

export const corsOptions: CorsOptions = {
  origin(origin, cb) {
    if (!origin) return cb(null, true);
    if (FRONTEND_URLS.includes(origin)) return cb(null, true);
    return cb(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'device-id'],
  exposedHeaders: ['RateLimit-Remaining', 'RateLimit-Reset'],
};