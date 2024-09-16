// server/server.js
require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Use authentication routes
app.use('/api', authRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
