'use strict';
const express = require('express');

const AuthServices = require('../services/authService');

function AuthRouter(app) {
    const router = express.Router();
    const authServ = new AuthServices();

    app.use('/api/v1/auth', router);

    router.post('/signup', async (req, res) => {
        const { body } = req;
        const result = await authServ.signup(body);
        res.json(result);

    });
}

module.exports = AuthRouter;