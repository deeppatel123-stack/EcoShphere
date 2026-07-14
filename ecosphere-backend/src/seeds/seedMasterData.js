import mongoose from 'mongoose';
import { Department } from '../models/Department.js';
import { Category } from '../models/Category.js';
import { EmissionFactor } from '../models/EmissionFactor.js';
import { config } from '../config/env.js';
import { connectDB } from '../config/db.js';

const seedMasterData = async () => {
    try {
        await connectDB();
        await Department.deleteMany();
        await Category.deleteMany();
        await EmissionFactor.deleteMany();

        console.log('Seeding Master Data...');

        await Department.insertMany([
            { name: 'Corporate', code: 'CORP', employeeCount: 15 },
            { name: 'Manufacturing', code: 'MFG', employeeCount: 150 },
            { name: 'Logistics', code: 'LOG', employeeCount: 45 },
        ]);

        await Category.insertMany([
            { name: 'Tree Planting', type: 'csr_activity' },
            { name: 'Cycle to Work', type: 'challenge' },
            { name: 'Beach Cleanup', type: 'csr_activity' },
        ]);

        await EmissionFactor.insertMany([
            { name: 'Electricity (Grid)', sourceType: 'expense', unit: 'kWh', factorValue: 0.82 },
            { name: 'Diesel Fuel', sourceType: 'fleet', unit: 'Liters', factorValue: 2.68 },
            { name: 'Raw Material Transport', sourceType: 'purchase', unit: 'Tonnes', factorValue: 1.15 }
        ]);

        console.log('Master data seeded successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding master data:', error);
        process.exit(1);
    }
};

seedMasterData();
