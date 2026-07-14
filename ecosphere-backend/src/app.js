import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { errorHandler } from './middleware/errorHandler.js';
import authRoutes from './routes/authRoutes.js';
import masterDataRoutes from './routes/masterDataRoutes.js';

const app = express();

// Security Middleware
app.use(helmet());
app.use(cors({
    origin: [process.env.FRONTEND_URL || 'http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
}));
app.use(express.json());
app.use(morgan('dev'));

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 mins
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api', limiter);

// Core Routes
app.use('/api/auth', authRoutes);
app.use('/api/master-data', masterDataRoutes);

// Health Check
app.get('/api/health', (req, res) => {
    res.status(200).json({ success: true, message: 'Server is running normally' });
});

// Error handling middleware
app.use(errorHandler);

export default app;
