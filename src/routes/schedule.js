const path = require('path');

const express = require('express');

const ScheduleController = require('../app/controllers/ScheduleController');

const router = express.Router();

router.post('/deposit', ScheduleController.deposit);

module.exports = router;