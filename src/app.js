const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { loginRoute, signupRoute, validateLogin, validateSignup } = require('./routes/auth');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/login.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/signup.html'));
});

// API Routes
app.post('/api/login', loginRoute);
app.post('/api/signup', signupRoute);

// Export validation functions for testing
app.validateLogin = validateLogin;
app.validateSignup = validateSignup;

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = app;
