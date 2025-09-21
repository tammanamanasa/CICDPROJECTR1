// server.js
const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth'); // make sure your auth routes are using MySQL
const mysql = require('mysql2');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

// --- MySQL connection ---
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Root@123',
  database: process.env.DB_NAME || 'shopping_hub',
  port: process.env.DB_PORT || 3307
});

db.connect(err => {
  if (err) {
    console.error('MySQL connection error:', err.message || err);
  } else {
    console.log('Connected to MySQL');
  }
});

// Export db for routes to use
app.locals.db = db;  // you can use this in your routes as req.app.locals.db

// --- Routes ---
app.use('/api/auth', authRouter);

// Example protected route using middleware
const authenticate = require('./middleware/authenticate');
app.get('/api/protected', authenticate, (req, res) => {
  res.json({ message: 'Protected data', user: req.user });
});

// --- Start server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
