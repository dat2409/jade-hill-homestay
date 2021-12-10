const path = require('path');

const express = require('express');

const ManageBookingController = require('../app/controllers/ManageBookingController');

const router = express.Router();

router.get('/', ManageBookingController.getAll);

router.get('/:bookId', ManageBookingController.getItem);

router.delete('/:bookId', ManageBookingController.deleteOne);

module.exports = router;