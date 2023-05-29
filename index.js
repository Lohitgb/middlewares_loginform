// Import required dependencies
const express = require('express');
const bodyParser = require('body-parser');

// Create Express app
const app = express();

// Configure body-parser middleware to handle form data
app.use(bodyParser.urlencoded({ extended: true }));

// Custom middleware for handling student login
app.use('/login', (req, res, next) => {
  // Retrieve form data from the request body
  const { username, password } = req.body;
 
  // Perform validation
  if (!username || !password) {
    return res.status(400).send('Username and password are required.');
  }

  // Perform authentication (dummy logic for demonstration purposes)
  if (username === 'student' && password === 'password') {
    // Store the authenticated student in the request object
    req.student = {
      username,
      role: 'student'
    };
    // Continue to the next middleware
    next();
  } else {
    return res.status(401).send('Invalid username or password.');
  }
});

// Protected route that requires student login
app.get('/dashboard', (req, res) => {
  // Access the authenticated student from the request object
  const student = req.student;
  res.send(`Welcome, ${student.username}! This is your student dashboard.`);
});

// Login form route
app.get('/login5', (req, res) => {
  res.send(`
    <h1>Student Login</h1>
    <form action="/login" method="POST">
      <label for="username">Username:</label>
      <input type="text" id="username" name="username" required><br><br>
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required><br><br>
      <button type="submit">Login</button>
    </form>
  `);
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
