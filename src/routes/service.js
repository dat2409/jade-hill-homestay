const path = require('path');

const express = require('express');

const serviceController = require('../app/controllers/ServiceController');

const router = express.Router();

router.post('/create', serviceController.postCreate);

router.delete('/:id/delete', serviceController.delete);

router.get('/:id/update', serviceController.getUpdate);

router.post('/:id/update', serviceController.postUpdate);

router.get('/:id', serviceController.getService);

module.exports = router;