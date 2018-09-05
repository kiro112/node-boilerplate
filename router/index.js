'use strict';

const user = require('../components/user/router');

module.exports = (router) => {
    router.del = router.delete;

    router.use('/user', user);

    router.all('*', (req, res) => {
        res.status(404)
            .send({ message: 'Nothing to do here.' });
    });

    return router;
};