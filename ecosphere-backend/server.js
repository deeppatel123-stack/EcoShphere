import app from './src/app.js';
import { connectDB } from './src/config/db.js';
import { config } from './src/config/env.js';

// Connect to MongoDB
connectDB();

const PORT = config.port;

app.listen(PORT, () => {
    console.log(`Server running in ${config.env} mode on port ${PORT}`);
});
