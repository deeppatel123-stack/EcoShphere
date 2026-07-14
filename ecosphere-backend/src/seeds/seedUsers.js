import mongoose from 'mongoose';
import { User } from '../models/User.js';
import { config } from '../config/env.js';
import { connectDB } from '../config/db.js';

const seedUsers = async () => {
    try {
        await connectDB();
        await User.deleteMany(); // Clear existing

        console.log('Seeding 10 roles as requested...');

        const users = [
            { name: 'Super Admin', email: 'admin@ecosphere.com', password: 'password123', role: 'super_admin' },
            { name: 'ESG Manager', email: 'manager@ecosphere.com', password: 'password123', role: 'esg_manager' },
            { name: 'Dept Head', email: 'head@ecosphere.com', password: 'password123', role: 'department_head' },
            { name: 'Employee', email: 'employee@ecosphere.com', password: 'password123', role: 'employee' },
            { name: 'Auditor User', email: 'auditor@ecosphere.com', password: 'password123', role: 'auditor' },
            { name: 'Executive Chief', email: 'executive@ecosphere.com', password: 'password123', role: 'executive' },
            { name: 'CSR Manager', email: 'csr_manager@ecosphere.com', password: 'password123', role: 'csr_manager' },
            { name: 'Compliance Officer', email: 'compliance_officer@ecosphere.com', password: 'password123', role: 'compliance_officer' },
            { name: 'Gamification Specialist', email: 'gamification_manager@ecosphere.com', password: 'password123', role: 'gamification_manager' },
            { name: 'Viewer Account', email: 'viewer@ecosphere.com', password: 'password123', role: 'viewer' },
        ];

        await User.insertMany(users);
        console.log('Users seeded successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding users:', error);
        process.exit(1);
    }
};

seedUsers();
