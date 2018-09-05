'use strict';

const sequelize = require('./sequelize');


module.exports = {
    // set a default connection
    defaultConn: sequelize,

    // expose other connection options
    sequelize
};