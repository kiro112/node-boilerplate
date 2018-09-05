'use strict';

const userModel = require('./../../database').defaultConn.user;

const create = (data) => {
    return userModel.create(data);
};


module.exports = {
    create
};