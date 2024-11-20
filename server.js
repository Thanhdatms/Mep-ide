const express = require('express');
const app = express();
const executeRoutes = require('./routes/executeRoutes');

// Middleware to parse JSON requests
app.use(express.json());

// Use the routes defined in the executeRoutes
app.use('/execute', executeRoutes);

// Start the server
app.listen(3000, () => console.log('Server running on port 3000'));