'use strict';

const userModel = require('../../database').defaultConn.user;

// Insert new user
// Parameters
//     Object  data    user data
//
// Response:  User object
const create = (data) => {
    return userModel.create(data)
            .then(res => res.toJSON());
};


// Retrieve list of users
// Parameters:
//      Object  where   query where
//      Number  offset  query offset
//      Number  limit  query limit
//
// Response: Objext
// {
//      "rows": [{ user... }, { user... }],
//      "count": 2
// }
// 
const findAndCountAll = ({ where = {}, offset = 0, limit = 10 }) => {
    return userModel.findAndCountAll({
        where,
        offset,
        limit
    });
};


const destroyById = ({ id = null }) => {
    return userModel.destroy({ where: { id } });
};


const findById = id => {
    return userModel.findById(id)
        .then(res => res ? res.toJSON() : res);
};

const updateById = ({ id = null, data = {} }) => {
    return userModel.update(data, {
        where: { id }
    });
};


module.exports = {
    create,
    findAndCountAll,
    findById,
    destroyById,
    updateById,
};