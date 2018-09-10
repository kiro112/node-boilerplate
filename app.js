'use strict';

const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const helmet = require('helmet');
const methodOverride = require('method-override');
const compression = require('compression');

const app = express();

require('./libraries/logger')(app);


app.use(helmet());
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));

// Custom Middlewares
app.use(require('./middlewares/cors'));
app.use(require('./libraries/res_extended')());
app.use(require('./router')(
    express.Router({
        caseSensitive: true,
        strict: true
    })
));


module.exports = app;