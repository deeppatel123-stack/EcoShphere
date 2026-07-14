import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: [
            'super_admin',
            'esg_manager',
            'department_head',
            'employee',
            'auditor',
            'executive',
            'csr_manager',
            'compliance_officer',
            'gamification_manager',
            'viewer'
        ],
        default: 'employee'
    },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    xp: { type: Number, default: 0 },
    points: { type: Number, default: 0 },
    completedChallenges: { type: Number, default: 0 },
    avatar: { type: String },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    refreshToken: { type: String }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model('User', userSchema);
