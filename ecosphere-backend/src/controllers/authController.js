import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

const generateTokens = (id) => {
    const accessToken = jwt.sign({ id }, config.jwt.accessSecret, { expiresIn: config.jwt.accessExpiry });
    const refreshToken = jwt.sign({ id }, config.jwt.refreshSecret, { expiresIn: config.jwt.refreshExpiry });
    return { accessToken, refreshToken };
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            const { accessToken, refreshToken } = generateTokens(user._id);
            user.refreshToken = refreshToken;
            await user.save();

            res.json({
                success: true,
                data: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    accessToken,
                    refreshToken
                }
            });
        } else {
            res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
    } catch (error) {
        next(error);
    }
};

export const register = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const user = await User.create({ name, email, password, role });
        if (user) {
            const { accessToken, refreshToken } = generateTokens(user._id);
            user.refreshToken = refreshToken;
            await user.save();

            res.status(201).json({
                success: true,
                data: { _id: user._id, name: user.name, email: user.email, role: user.role, accessToken, refreshToken }
            });
        }
    } catch (error) {
        next(error);
    }
};

export const getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        res.json({ success: true, data: user });
    } catch (error) {
        next(error);
    }
};
