const path = require('path');
const auth = require('../app/middleware/auth');
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

/**
 * @swagger
 * /homestays/{homestayId}/roomTypes/filter:
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
 *       - in: query
 *         name: start
 *         schema:
 *           type: string
 *         required: true
 *         description: Time start
 *       - in: query
 *         name: end
 *         schema:
 *           type: string
 *         required: true
 *         description: Time return
 *     responses:
 *       200:
 *         description: get successfully
 *       404:
 *         description: not found
 */
router.get(
  '/:homestayId/roomTypes/filter',
  homestayController.getListRoomTypesFilter
);

router.post('/create', auth.requireAuth, homestayController.postCreate);

router.get('/:homestayId', auth.requireAuth, homestayController.getItem);

router.post(
  '/:homestayId/update',
  auth.requireAuth,
  homestayController.postUpdate
);

router.delete('/:homestayId', auth.requireAuth, homestayController.deleteOne);

router.delete('/delete', auth.requireAuth, homestayController.deleteMany);

router.get('/', auth.requireAuth, homestayController.getAll);
router.get('/:id/statistics', auth.requireAuth, homestayController.getOneStatistic);

module.exports = router;
