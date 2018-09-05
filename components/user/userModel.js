'use strict';

const userModel = require('./../../database').sequelize.user;

const create = (data) => {
    return userModel.create(data);
};


module.exports = {
    create
};