import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    head: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    parentDepartment: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    employeeCount: { type: Number, default: 0 },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, { timestamps: true });

export const Department = mongoose.model('Department', departmentSchema);
