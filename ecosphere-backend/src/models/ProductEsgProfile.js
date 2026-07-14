import mongoose from 'mongoose';

const productEsgProfileSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    sku: { type: String, required: true, unique: true },
    category: { type: String },
    carbonFootprint: { type: Number, required: true }, // value in kg CO2e
    sustainabilityRating: { type: String, enum: ['A', 'B', 'C', 'D', 'E'] },
    lifecycleData: { type: mongoose.Schema.Types.Mixed }, // flexible JSON for detailed footprint data
    status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, { timestamps: true });

export const ProductEsgProfile = mongoose.model('ProductEsgProfile', productEsgProfileSchema);
