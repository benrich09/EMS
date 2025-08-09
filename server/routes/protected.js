// routes/protected.js
import express from 'express';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/dashboard', authMiddleware, (req, res) => {
    res.json({ message: `Welcome, user ${req.user.id}` });
});

export default router;
