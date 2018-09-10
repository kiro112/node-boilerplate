'use strict';

const userModel = require('./user_model');


/**
 * @api {post} /user Add
 * @apiDescription Add new user
 * @apiGroup User
 * @apiVersion 1.0.0
 * 
 * @apiParam {String} name      user's name
 *  
 * @apiSuccessExample {json} sample-response:
 * HTTP1.1/200 OK
 * {
 *     "data": {
 *         "created": "2018-09-06T05:29:01.628Z",
 *         "id": "69c5d5d3-5bdf-4279-b656-0b34e157ef69",
 *         "updated": "2018-09-06T05:29:01.630Z",
 *         "deleted": null,
 *         "name": "Jairo Malanay"
 *     },
 *     "success": true
 * }
 * 
 * @apiExample {curl} Sample-Request
 *   curl -X POST \
 *       http://localhost:3000/user \
 *       -H 'content-type: application/json' \
 *       -H 'postman-token: fb0d3301-7b6d-e417-e9f2-79ad22e9f3e7' \
 *       -d '{
 *           "name": "Jairo Malanay"
 *       }'
 */
const create = (req, res, next) => {
    
    // todo: add validation
    let data = req.body;

    userModel
        .create(data)
        .then(user => {
            res.status(200)
                .data(user)
                .send();
        })
        .catch(err => {
            return next(err);
        });
};


/**
 * @api {get} /user Retrieve List
 * @apiDescription Retrieve paginated list of users
 * @apiGroup User
 * @apiVersion 1.0.0
 * 
 * @apiParam {Number} [page=1]  current page
 * @apiParam {Number} [limit=10] limit per page
 * 
 * @apiExample {curl} Sample-Request:
 * curl -X GET \
 *   'http://localhost:3000/user?page=1' \
 *   -H 'content-type: application/json' \
 *   -H 'postman-token: d07411e3-fcd7-3c0f-b59e-e5743a974260' \
 *   -d '{
 *  	"name": "Jairo Malanay"
 * }'
 * 
 * @apiSuccessExample {json} Sample-Response:
 * HTTP1.1/200 OK
 * {
 *     "data": {
 *         "items": [
 *             {
 *                 "id": "7c99e4f5-6adc-4b81-aa75-f7eec7d03f3a",
 *                 "name": "Jairo Malanay",
 *                 "created": "2018-09-06T05:47:15.000Z",
 *                 "updated": "2018-09-06T05:47:15.000Z",
 *                 "deleted": null
 *             }
 *         ],
 *         "limit": 10,
 *         "total": 1
 *     },
 *     "success": true
 * }
 */
const retrieveAll = (req, res, next) => {
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 10;
    const offset = (page - 1) * limit;

    userModel
        .findAndCountAll({
            limit,
            offset,
        })
        .then(user => {
            res.items(user.rows)
                .limit(limit)
                .total(user.count)
                .send();
        })
        .catch(err => {
            return next(err);  
        });
};

/**
 * @api {get} /user/:id     Retrieve Details
 * @apiDescription Retrieve user details
 * @apiGroup User
 * @apiVersion 1.0.0
 * 
 * @apiParam {String} id    user's uniq id
 * 
 * @apiExample {curl} Sample-Request:
 * curl -X GET \
 *   http://localhost:3000/user/7c99e4f5-6adc-4b81-aa75-f7eec7d03f3a \
 *   -H 'cache-control: no-cache' \
 *   -H 'content-type: application/json' \
 *   -H 'postman-token: de93b513-06f3-f813-2c23-42180232d6c5' \
 *   -d '{
 *  	"name": "Jairo Malanay"
 *   }'
 * 
 * @apiSuccessExample {json} Sample-Response:
 * HTTP1.1/200 OK
 * {
 *    "data": {
 *        "id": "7c99e4f5-6adc-4b81-aa75-f7eec7d03f3a",
 *        "name": "Jairo Malanay",
 *        "created": "2018-09-06T05:47:15.000Z",
 *        "updated": "2018-09-06T05:47:15.000Z",
 *        "deleted": null
 *    },
 *    "success": true
 * }
 * 
 * @apiErrorExample {json} Sample-Error:
 * HTTP1.1/404 Not Found
 * {
 *   "error": {
 *       "message": "User not found."
 *    },
 *    "success": false
 * }
 */
const retrieveById = (req, res, next) => {
    const id = req.params.id;

    userModel.findById(id)
        .then(user => {
            if (!user) {
                return res.status(404)
                    .warn({ message: 'User not found.' });
            }

            res.status(200)
                .data(user)
                .send();
        })
        .catch(err => {
            return next(err);
        });
};


/**
 * @api {del} /user/:id     Remove user
 * @apiDescription delete user
 * @apiGroup User
 * @apiVersion 1.0.0
 * 
 * @apiParam {String} id    user's uniq id
 * 
 * @apiExample {curl} Sample-Request:
 * curl -X DELETE \
 *    http://localhost:3000/user/1dc5794e-555c-4f5b-9aff-d71b7035e7bf \
 *   -H 'cache-control: no-cache' \
 *   -H 'postman-token: 25c281f2-855f-dac9-7856-07ff6ec7742c'
 * 
 * @apiSuccessExample {json} Sample-Response:
 * HTTP1.1/200 OK
 * {
 *     "data": {
 *         "message": "User deleted successfuly."
 *     },
 *     "success": true
 * }
 * 
 * @apiErrorExample {json} Sample-Error:
 * HTTP1.1/400 Not Found
 * {
 *    "error": {
 *        "message": " Failed to delete user."
 *    },
 *    "success": false
 * }
 */
const removeById = (req, res, next) => {
    const id = req.params.id;

    userModel.destroyById({ id })
        .then(result => {
            
            if (!result) {
                return res.warn({ message: 'Failed to delete user.' });
            }

            return res.status(200)
                .data({ message: 'User deleted successfuly.' })
                .send();
        })
        .catch(err => {
            return next(err);
        });
};


/**
 * @api {put} /user/:id Update
 * @apiDescription Update user details
 * @apiGroup User
 * @apiVersion 1.0.0
 * 
 * @apiParam {String} name      user's name
 *  
 * @apiSuccessExample {json} sample-response:
 * HTTP1.1/200 OK
 * {
 *    "data": {
 *        "message": "User updated successfuly."
 *    },
 *    "success": true
 * }
 * 
 * @apiExample {curl} Sample-Request
 *   curl -X PUT \
 *    http://localhost:3000/user/7888b106-a969-4a26-82d7-a932d71c6dca \
 *    -H 'cache-control: no-cache' \
 *    -H 'content-type: application/json' \
 *    -H 'postman-token: 0d345706-8c1e-128a-5d50-9111c30b28a8' \
 *    -d '{
 *  	"name": "Jai Malanay"
 *  }'
 */
const updateById = (req, res, next) => {
    const id = req.params.id;

    // todo: add validation
    let data = req.body;

    userModel
        .updateById({ id, data })
        .then(result => {

            let [affectedRows] = result;

            if (result.affectedRows) {
                return res.warn({ message: 'Failed to update user.' });
            }

            return res.status(200)
                .data({ message: 'User updated successfuly.' })
                .send();
        })
        .catch(err => {
            return next(err);
        });
};

module.exports = { 
    create,
    retrieveAll,
    retrieveById,
    removeById,
    updateById,
};