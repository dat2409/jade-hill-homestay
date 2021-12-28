const path = require('path');

const express = require('express');

const roomController = require('../app/controllers/RoomController');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Room:
 *       type: object
 *       required:
 *         - name
 *         - single_bed
 *         - multi_bed
 *         - min_people
 *         - max_people
 *         - homestayId
 *         - room_nums
 *         - price
 *         - description
 *       properties:
 *         name:
 *           type: string
 *           description: Name of room type
 *         single_bed:
 *           type: integer
 *           description: Quantity of single bed
 *         multi_bed:
 *           type: integer
 *           description: Quantity of multi bed
 *         min_people:
 *           type: integer
 *           description: Quantity of min people
 *         max_people:
 *           type: integer
 *           description: Quantity of max people
 *         homestayId:
 *           type: string
 *           description: Homestay id of room type
 *         room_nums:
 *           type: array
 *           items:
 *              type: integer
 *           description: List room number
 *         price:
 *           type: number
 *           description: Room type price
 *         description:
 *           type: string
 *           description: Description about room type
 *       example:
 *         name: phong vip giuong don 1 nguoi
 *         single_bed: 1
 *         multi_bed: 1
 *         min_people: 1
 *         max_people: 1
 *         homestayId: abc
 *         room_nums: [101,102]
 *         price: 210000
 *         description: room for ....
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     RoomInfo:
 *       type: object
 *       required:
 *         - name
 *         - single_bed
 *         - multi_bed
 *         - min_people
 *         - max_people
 *         - room_nums
 *         - price
 *         - description
 *       properties:
 *         name:
 *           type: string
 *           description: Name of room type
 *         single_bed:
 *           type: integer
 *           description: Quantity of single bed
 *         multi_bed:
 *           type: integer
 *           description: Quantity of multi bed
 *         min_people:
 *           type: integer
 *           description: Quantity of min people
 *         max_people:
 *           type: integer
 *           description: Quantity of max people
 *         room_nums:
 *           type: array
 *           items:
 *              type: integer
 *           description: List room number
 *         price:
 *           type: number
 *           description: Room type price
 *         description:
 *           type: string
 *           description: Description about room type
 *       example:
 *         name: phong vip giuong don 1 nguoi
 *         bed_quantity: 1
 *         people_quantity: 1
 *         homestayId: abc
 *         room_nums: [101,102]
 *         price: 210000
 *         description: room for ....
 */

/**
 * @swagger
 * /roomTypes:
 *   post:
 *     description: Create room type for homestay
 *     tags: [Room]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Room'
 *     responses:
 *       201:
 *         description: Create successfully
 *         content:
 *             application/json:
 *                 schema:
 *                      $ref: '#/components/schemas/Room'
 *       409:
 *         description: Conflig
 */
router.post('/', roomController.createRoom);

/**
 * @swagger
 * /roomTypes/{id}:
 *   put:
 *     description: Update room type for homestay
 *     tags: [Room]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *              type: string
 *         required: true
 *         description: Room id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Room'
 *     responses:
 *       201:
 *         description: Update successfully
 *         content:
 *             application/json:
 *                 schema:
 *                      $ref: '#/components/schemas/Room'
 *       409:
 *         description: Conflig
 */
router.put('/:id', roomController.updateRoomType);

/**
 * @swagger
 * /roomTypes/{id}:
 *   delete:
 *     description: delete room type for homestay
 *     tags: [Room]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *              type: string
 *         required: true
 *         description: Room id
 *     responses:
 *       201:
 *         description: delete successfully
 *       404:
 *         description: not found
 */
router.delete('/:id', roomController.deleteRoomType);

/**
 * @swagger
 * /roomTypes/{id}:
 *   get:
 *     description: get room type for homestay
 *     tags: [Room]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *              type: string
 *         required: true
 *         description: Room id
 *     responses:
 *       201:
 *         description: get successfully
 *       404:
 *         description: not found
 */
router.get('/:id', roomController.getRoomType);

module.exports = router;
