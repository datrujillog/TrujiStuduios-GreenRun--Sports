'use strict';
const express = require('express');

function usersRouter(app) {
    const router = express.Router();

    app.use('/api/v1/users', router);

    router.get('/', (req, res) => {
        res.json({message: "Hello World ROUTER"});
    });
}

module.exports = usersRouter;