import mongoose from 'mongoose';

const rewardSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    pointsRequired: { type: Number, required: true },
    stock: { type: Number, required: true },
    image: { type: String },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, { timestamps: true });

export const Reward = mongoose.model('Reward', rewardSchema);
