import mongoose from 'mongoose';

const emissionFactorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    sourceType: {
        type: String,
        enum: ['purchase', 'manufacturing', 'expense', 'fleet'],
        required: true
    },
    unit: { type: String, required: true },
    factorValue: { type: Number, required: true },
    description: { type: String },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, { timestamps: true });

export const EmissionFactor = mongoose.model('EmissionFactor', emissionFactorSchema);
