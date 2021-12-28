const path = require('path');

const express = require('express');

const searchController = require('../app/controllers/SearchController');

const router = express.Router();

router.get('/cities', searchController.getAllCities);
router.get('/', searchController.search);

module.exports = router;
