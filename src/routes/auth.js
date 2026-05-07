// Validation helper functions
const validateEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length > 0;
};

const validatePassword = (password) => {
  return !!(password && password.length >= 6);
};

const validateUsername = (username) => {
  return !!(username && username.length >= 3);
};

// Simulated user database
const users = new Map();

// Default test user
users.set('testuser@test.com', {
  username: 'testuser',
  email: 'testuser@test.com',
  password: 'password123'
});

// Login route handler
const loginRoute = (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ success: false, message: 'Invalid email format' });
  }

  if (!validatePassword(password)) {
    return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
  }

  // Check user
  const user = users.get(email);
  if (!user) {
    return res.status(401).json({ success: false, message: 'User not found' });
  }

  if (user.password !== password) {
    return res.status(401).json({ success: false, message: 'Invalid password' });
  }

  res.status(200).json({ success: true, message: 'Login successful', username: user.username });
};

// Signup route handler
const signupRoute = (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  // Validation
  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  if (!validateUsername(username)) {
    return res.status(400).json({ success: false, message: 'Username must be at least 3 characters' });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ success: false, message: 'Invalid email format' });
  }

  if (!validatePassword(password)) {
    return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ success: false, message: 'Passwords do not match' });
  }

  // Check if user exists
  if (users.has(email)) {
    return res.status(409).json({ success: false, message: 'User already exists' });
  }

  // Create new user
  users.set(email, { username, email, password });

  res.status(201).json({ success: true, message: 'Signup successful' });
};

// Export functions for testing
module.exports = {
  loginRoute,
  signupRoute,
  validateEmail,
  validatePassword,
  validateUsername,
  users
};
