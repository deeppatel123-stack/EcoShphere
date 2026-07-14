import mongoose from 'mongoose';

const esgPolicySchema = new mongoose.Schema({
    title: { type: String, required: true },
    version: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String }, // e.g. HR, Data Privacy, Environmental
    effectiveDate: { type: Date, required: true },
    status: {
        type: String,
        enum: ['draft', 'active', 'archived'],
        default: 'draft'
    },
    requiresAcknowledgement: { type: Boolean, default: false }
}, { timestamps: true });

export const EsgPolicy = mongoose.model('EsgPolicy', esgPolicySchema);
