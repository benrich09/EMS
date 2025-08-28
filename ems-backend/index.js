const express = require('express');
const cors = require('cors');
const app = express();
const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

app.use(cors());
app.use(express.json());

// Mock data; replace with database queries
const stats = {
    employees: 150,
    departments: 12,
    monthlyPay: 450000,
    leavesApplied: 25,
    leavesApproved: 15,
    leavesPending: 7,
    leavesRejected: 3,
};

app.get('/api/admin-stats', (req, res) => {
    res.json(stats);
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    // Mock auth; replace with DB check
    if (email && password) {
        res.json({ success: true, role: email === 'admin@example.com' ? 'admin' : 'user' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

app.post('/api/register', (req, res) => {
    // Mock register; save to DB
    res.json({ success: true });
});

app.listen(3000, () => console.log('Server running on port 3000'));