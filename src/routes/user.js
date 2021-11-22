const express = require('express');
const userController = require('../app/controllers/UserController');

const router = express.Router();

router.get('/create', userController.create);
router.post('/store', userController.store);
router.get('/:id', userController.show);
router.get('/', userController.index);
router.get('/edit/:id', userController.edit);
router.patch('/:id', userController.update);
router.delete('/:id', userController.destroy);


module.exports = router;
