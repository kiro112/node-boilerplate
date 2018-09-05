'use strict';

const userModel = require('./userModel');

const create = (req, res, next) => {
    
    let user = {
        name: 'John Doe'
    };

    userModel
        .create(user)
        .then(user => {
            res.status(200)
                .data(user.toJSON())
                .send();
        })
        .catch(err => {
            return next(err);
        });
};



module.exports = { create };