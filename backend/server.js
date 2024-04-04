// Import necessary modules and dependencies
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const Card = require('./models/Card'); // Import the Card model

const app = express();

// Middleware
app.use(bodyParser.json());

// Define a route handler to retrieve all cards
app.get('/cards', async (req, res) => {
  try {
    // Fetch all cards from the database
    const cards = await Card.findAll();
    res.json(cards);
  } catch (error) {
    console.error('Error fetching cards:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Sync models with the database
sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
  });

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
