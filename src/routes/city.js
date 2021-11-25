const path = require('path');

const express = require('express');

const cityController = require('../app/controllers/CityController');

const router = express.Router();

router.post('/create', cityController.postCreate);

router.delete('/:id/delete', cityController.delete);

router.get('/:id/update', cityController.getUpdate);

router.post('/:id/update', cityController.postUpdate);

router.get('/:id', cityController.getCity);

router.get('/', cityController.all);

module.exports = router;