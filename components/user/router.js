'use strict';

const user = require('./userController');

const express = require('express');
const router = express.Router();

router.del = router.delete;



router.post('/', user.create);

module.exports = router;