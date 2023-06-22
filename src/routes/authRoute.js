'use strict';

const express = require('express');

const AuthServices = require('../services/authService');

const { validarRegistro } = require('../middlewares/validateMiddleware');

const { body } = require('express-validator');
const { authResponse, loginResponse,errorResponse } = require('../helpers/authResponse');



function AuthRouter(app) {
    const router = express.Router();
    const authServ = new AuthServices();

    app.use('/api/v1/auth', router);


    router.post('/login', async (req, res) => {
        try {
            const result = await authServ.login(req.body);
            return result.success ? loginResponse(res, result, 200) : errorResponse(res, result, 400);
        } catch (error) {
            return errorResponse(res, error, 404);           
        }
    });

    router.post('/signup', validarRegistro(), async (req, res) => {
        const { body } = req;
        const result = await authServ.signup(body);
        return result ? authResponse(res, result, 201) : authResponse(res, result, 400);
    });
}

module.exports = AuthRouter;



