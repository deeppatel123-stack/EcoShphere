import mongoose from 'mongoose';

const badgeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    unlockRule: {
        type: {
            type: String,
            enum: ['xp_threshold', 'challenges_completed', 'csr_count'],
            required: true
        },
        value: { type: Number, required: true }
    },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, { timestamps: true });

export const Badge = mongoose.model('Badge', badgeSchema);
