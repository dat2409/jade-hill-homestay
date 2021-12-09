const path = require('path');

const express = require('express');

const BookingController = require('../app/controllers/BookingController');

const router = express.Router();

router.post('/', BookingController.create);

module.exports = router;