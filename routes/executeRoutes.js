const express = require('express');
const router = express.Router();
const executionController = require('../controllers/executionController');

// POST route to execute code
router.post('/', executionController.executeCode);

module.exports = router;