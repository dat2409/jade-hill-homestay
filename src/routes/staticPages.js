const express = require('express');
const staticPagesController = require('../app/controllers/StaticPagesController');

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - first_name
 *         - last_name
 *       properties:
 *         email:
 *           type: string
 *           description: User email
 *         first_name:
 *           type: string
 *           description: User firstname
 *         last_name:
 *           type: string
 *           description: User lastname
 *         phone_num:
 *           type: string
 *           description: User phone number
 *         role:
 *           type: string
 *           description: User role
 *       example:
 *         email: a@gmail.com
 *         first_name: Nguyen
 *         last_name: An
 *         phone_num: 0929099285
 *         role: admin
 */

/**
 * @swagger
 * /login:
 *   post:
 *     description: Login admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *                - email
 *                - password
 *             properties:
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *     responses:
 *       200:
 *         description: Login successfully
 *       401:
 *         description: wrong password
 *       404:
 *         description: Account not found
 */
router.post('/login', staticPagesController.handleLogin);
router.get('/', staticPagesController.home);

module.exports = router;
