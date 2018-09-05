'use strict';

module.exports = (router) => {
    router.del = router.delete;


    router.all('*', (req, res) => {
        res.status(404)
            .send({ message: 'Nothing to do here.' });
    });

    return router;
};