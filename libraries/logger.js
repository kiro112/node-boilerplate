'use strict';

const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const rfs = require('rotating-file-stream');
const moment = require('moment');

module.exports = app => {
    const logDirectory = path.join(__dirname, '/../logs');

    // ensure log directory exists
    fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)


    // create a rotating write stream
    const accessLogStream = rfs(`${moment().format('YYYY-MM-DD')}.log`, {
        interval: '1d', // rotate daily
        path: logDirectory
    });


    // set morgan variables
    // todo: save x-access-token and userId
    morgan.token('headers', function getHeaders (req) {
        return JSON.stringify(req.headers);
    });

    morgan.token('query', function getQuery (req) {
        return JSON.stringify(req.query);
    });

    morgan.token('body', function getBody (req) {
        return JSON.stringify(req.body);
    });

    app.use(
        morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" || Body: ":body"', { stream: accessLogStream })
    );
};