const path = require('path');

const express = require('express');

const homestayController = require('../app/controllers/HomestayController');

const router = express.Router();

/**
 * @swagger
 * /homestays/{homestayId}/roomTypes:
 *   get:
 *     description: get list room type of homestay
 *     tags: [Room]
 *     parameters:
 *       - in: path
 *         name: homestayId
 *         schema:
 *              type: string
 *         required: true
 *         description: homestay id
 *     responses:
 *       200:
 *         description: get successfully
 *       404:
 *         description: not found
 */
router.get('/:homestayId/roomTypes', homestayController.getListRoomTypes);

router.post('/create', homestayController.postCreate);

router.get('/:homestayId', homestayController.getItem);

router.post('/:homestayId/update', homestayController.postUpdate);

router.delete('/:homestayId', homestayController.deleteOne);

router.delete('/delete', homestayController.deleteMany);

router.get('/', homestayController.getAll);

module.exports = router;
