const path = require('path');

const express = require('express');

const homestayController = require('../app/controllers/HomestayController');

const router = express.Router();

router.get('/create', homestayController.getCreate);

router.post('/create', homestayController.postCreate);

router.get('/:homestayId', homestayController.getItem);

router.post('/:homestayId/update', homestayController.postUpdate);

router.delete('/:homestayId', homestayController.deleteOne);

router.delete('/delete', homestayController.deleteMany);

router.get('/', homestayController.getAll);

module.exports = router;
