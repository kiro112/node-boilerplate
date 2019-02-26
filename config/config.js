'use strict';

const _ = require('lodash');

const config = {
    app: {
        name: 'Default Name',
        port: 3000,
    },
    database: {},
    cors: {
        allowedOrigin: '*',
        allowedMethods: 'GET, POST, PUT, DELETE',
        exposedHeaders: 'Content-Length',
        allowedHeaders: 'Content-Type, Accept, X-Requested-With, X-ACCESS-TOKEN',
        allowCredentials: true,
    }
};

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'development';
}

_.merge(config, require('./env/'+process.env.NODE_ENV));
console.log(`Starting ${config.app.name} on ${process.env.NODE_ENV} environment`);

module.exports = config;