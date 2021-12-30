const path = require('path');

const express = require('express');

const searchController = require('../app/controllers/SearchController');

const router = express.Router();

router.get('/cities', searchController.getAllCities);
router.get('/', searchController.search);
//get homestay info and service
router.get('/homestays/:id', searchController.getOneHomestay);

module.exports = router;
