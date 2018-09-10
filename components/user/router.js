'use strict';

const user = require('./userController');

const express = require('express');
const router = express.Router();

router.del = router.delete;



router.post('/', user.create);
router.get('/', user.retrieveAll);
router.get('/:id', user.retrieveById);
router.del('/:id', user.removeById);
router.put('/:id', user.updateById);


module.exports = router;