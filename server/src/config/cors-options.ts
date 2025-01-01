import { CorsOptions } from 'cors';
import { allowedOrigins } from './allowed-origins';

export const corsOptions: CorsOptions = {
    origin: (origin: string | undefined, callback) => {
        if (allowedOrigins.includes(origin || '') || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    exposedHeaders: ['Content-Length', 'X-Knowledge-Base-Id'],
    credentials: true,
    maxAge: 86400, // 24 hours in seconds
    preflightContinue: false,
    optionsSuccessStatus: 204,
};
