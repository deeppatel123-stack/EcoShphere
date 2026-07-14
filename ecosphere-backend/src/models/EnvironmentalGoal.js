import mongoose from 'mongoose';

const environmentalGoalSchema = new mongoose.Schema({
    title: { type: String, required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    targetValue: { type: Number, required: true },
    currentValue: { type: Number, default: 0 },
    unit: { type: String, required: true },
    deadline: { type: Date, required: true },
    status: {
        type: String,
        enum: ['on_track', 'at_risk', 'achieved', 'missed'],
        default: 'on_track'
    }
}, { timestamps: true });

export const EnvironmentalGoal = mongoose.model('EnvironmentalGoal', environmentalGoalSchema);
