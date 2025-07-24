import { CorsOptions } from 'cors';
import { frontEndUrls } from '../constants/env.constants.js';

const FRONTEND_URLS = frontEndUrls.split(',').map(url => url.trim());

export const corsOptions: CorsOptions = {
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'device-id'],
  exposedHeaders: ['RateLimit-Remaining', 'RateLimit-Reset'],
};
