const express = require('express');
const userController = require('../app/controllers/UserController');
const userAuth = require('../app/middleware/auth');

const router = express.Router();

router.get('/create', userController.create);
router.post('/store', userController.store);
router.get('/:id', userController.show);
router.get('/edit/:id', userController.edit);
/**
 * @swagger
 * /users:
 *   get:
 *     description: test
 *     responses:
 *       200:
 *         description: successfully
 *       401:
 */
router.get('/', userController.index);
router.patch('/:id', userController.update);
router.delete('/:id', userController.destroy);

module.exports = router;
