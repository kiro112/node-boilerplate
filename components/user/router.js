'use strict';

const user = require('./userController');

const express = require('express');
const router = express.Router();

router.del = router.delete;



router.post('/', user.create);
router.get('/', user.retrieveAll);
router.get('/:id', user.retrieveById);


module.exports = router;