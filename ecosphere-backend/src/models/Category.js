import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ['csr_activity', 'challenge'], required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, { timestamps: true });

export const Category = mongoose.model('Category', categorySchema);
