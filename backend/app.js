const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sql = require('./db'); // Import the SQL Server connection
const app = express();

const PORT = 3000;

app.use(bodyParser.json());

// Secret key for JWT
const JWT_SECRET = 'your_jwt_secret';

// Middleware for checking authentication
function authenticateJWT(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) return res.sendStatus(403);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// 1. User registration
app.post('/register', async (req, res) => {
  const { first_name, last_name, email, password, user_type, phone_number, location } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await sql.query`INSERT INTO users (first_name, last_name, email, password_hash, user_type, phone_number, location) 
      VALUES (${first_name}, ${last_name}, ${email}, ${hashedPassword}, ${user_type}, ${phone_number}, ${location})`;

    res.status(201).send('User registered successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error registering user.');
  }
});

// 2. User login (for token generation)
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await sql.query`SELECT * FROM users WHERE email = ${email}`;
    if (result.recordset.length === 0) {
      return res.status(401).send('Invalid credentials');
    }

    const user = result.recordset[0];
    const match = await bcrypt.compare(password, user.password_hash);

    if (!match) return res.status(401).send('Invalid credentials');

    const token = jwt.sign({ user_id: user.user_id, email: user.email, user_type: user.user_type }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// 3. Get user profile (only for logged-in users)
app.get('/profile', authenticateJWT, async (req, res) => {
  try {
    const result = await sql.query`SELECT * FROM users WHERE user_id = ${req.user.user_id}`;
    if (result.recordset.length === 0) {
      return res.status(404).send('User not found');
    }
    res.json(result.recordset[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// 4. Create a ride
app.post('/rides', authenticateJWT, async (req, res) => {
  const { origin_location, destination_location, available, price } = req.body;

  try {
    const result = await sql.query`INSERT INTO rides (driver_id, origin_location, destination_location, available, price) 
      VALUES (${req.user.user_id}, ${origin_location}, ${destination_location}, ${available}, ${price})`;

    res.status(201).send('Ride created successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating ride');
  }
});

// 5. Book a ride
app.post('/bookings', authenticateJWT, async (req, res) => {
  const { ride_id } = req.body;

  try {
    const result = await sql.query`INSERT INTO bookings (ride_id, passenger_id, status) 
      VALUES (${ride_id}, ${req.user.user_id}, 'booked')`;

    res.status(201).send('Ride booked successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error booking ride');
  }
});

// 6. Add a review
app.post('/reviews', authenticateJWT, async (req, res) => {
  const { ride_id, reviewee_id, comment } = req.body;

  try {
    const result = await sql.query`INSERT INTO reviews (ride_id, reviewer_id, reviewee_id, comment) 
      VALUES (${ride_id}, ${req.user.user_id}, ${reviewee_id}, ${comment})`;

    res.status(201).send('Review added successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding review');
  }
});

// 7. Add payment
app.post('/payments', authenticateJWT, async (req, res) => {
  const { booking_id, amount, transaction_id, Payment } = req.body;

  try {
    const result = await sql.query`INSERT INTO payments (booking_id, amount, transaction_id, Payment) 
      VALUES (${booking_id}, ${amount}, ${transaction_id}, ${Payment})`;

    res.status(201).send('Payment added successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding payment');
  }
});

// 8. Send a message
app.post('/messages', authenticateJWT, async (req, res) => {
  const { receiver_id, ride_id, message_text } = req.body;

  try {
    const result = await sql.query`INSERT INTO messages (sender_id, receiver_id, ride_id, message_text) 
      VALUES (${req.user.user_id}, ${receiver_id}, ${ride_id}, ${message_text})`;

    res.status(201).send('Message sent successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error sending message');
  }
});

// 9. Rate a user
app.post('/ratings', authenticateJWT, async (req, res) => {
  const { rating, rated_user_id } = req.body;

  try {
    const result = await sql.query`INSERT INTO user_ratings (user_id, rating) 
      VALUES (${rated_user_id}, ${rating})`;

    res.status(201).send('User rated successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error rating user');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
