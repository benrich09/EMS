import User from '../models/User.js';
import bcrypt from 'bcrypt';

// Create new user
export const createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json({ message: 'User created', user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all users
export const getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

// Get single user
export const getUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
};

// Update user
export const updateUser = async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
};

// Delete user
export const deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
};
