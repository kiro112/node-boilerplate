'use strict';

const cors = require('../config/config').cors;

module.exports = (req, res, next) => {
    res.set('Access-Control-Allow-Origin', cors.allowedOrigin);
    res.set('Access-Control-Allow-Methods', cors.allowedMethods);
    res.set('Access-Control-Expose-Headers', cors.exposedHeaders);
    res.set('Access-Control-Allow-Credentials', cors.allowCredentials);
    res.set('Access-Control-Allow-Headers', cors.allowedHeaders);

    next();
};