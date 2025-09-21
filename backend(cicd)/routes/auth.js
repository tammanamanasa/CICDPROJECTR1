// backend(cicd)/routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

/* Register */
router.post('/register', async (req, res) => {
  try {
    const db = req.app.locals.db; // get MySQL connection
    const { username, password } = req.body;

    // Check if user exists
    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length > 0) return res.status(400).json({ error: 'User already exists' });

      // Hash password
      const passwordHash = await bcrypt.hash(password, 10);

      // Insert new user
      db.query(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        [username, passwordHash],
        (err, result) => {
          if (err) return res.status(500).json({ error: err.message });
          res.status(201).json({ message: 'User registered successfully' });
        }
      );
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* Login */
router.post('/login', (req, res) => {
  try {
    const db = req.app.locals.db; // get MySQL connection
    const { username, password } = req.body;

    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) return res.status(400).json({ error: 'Invalid credentials' });

      const user = results[0];

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

      // Generate JWT
      const accessToken = jwt.sign(
        { id: user.id, username: user.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
      );

      res.json({ accessToken });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
