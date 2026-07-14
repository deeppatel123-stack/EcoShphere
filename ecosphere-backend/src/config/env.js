import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: process.env.PORT || 5000,
    mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/ecosphere',
    jwt: {
        accessSecret: process.env.JWT_ACCESS_SECRET || 'access_secret_123',
        refreshSecret: process.env.JWT_REFRESH_SECRET || 'refresh_secret_123',
        accessExpiry: process.env.JWT_ACCESS_EXPIRY || '15m',
        refreshExpiry: process.env.JWT_REFRESH_EXPIRY || '7d',
    },
    env: process.env.NODE_ENV || 'development'
};
