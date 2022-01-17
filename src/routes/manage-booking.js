const path = require('path');

const express = require('express');

const ManageBookingController = require('../app/controllers/ManageBookingController');

const router = express.Router();

router.get('/search/:phone', ManageBookingController.searchBooking);

router.get('/', ManageBookingController.getAll);

router.put('/:bookId/checkin', ManageBookingController.checkin);

router.put('/:bookId/checkout', ManageBookingController.checkout);

router.put('/:bookId/deposit', ManageBookingController.deposit);

router.patch('/:bookId/services', ManageBookingController.addServices);

router.get('/:bookId', ManageBookingController.getItem);

router.delete('/:bookId', ManageBookingController.deleteOne);

module.exports = router;
