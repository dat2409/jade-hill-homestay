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
router.get('/', userAuth.requireAuth, userController.index);
router.patch('/:id', userController.update);
router.delete('/:id', userController.destroy);

//input cua api la ch3i, khong, input cuar api bi loi ko co get thoi
// test@gmail.com
// 123456
module.exports = router;
