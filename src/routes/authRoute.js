'use strict';

const express = require('express');

const AuthServices = require('../services/authService');

const authMiddleware = require('../middlewares/authValidation');

const { httpStatusCodes } = require('../helpers/httpStatusCodes');
const { validarRegistro } = require('../middlewares/validateMiddleware');

const { body } = require('express-validator');


function AuthRouter(app) {
    const router = express.Router();
    const authServ = new AuthServices();

    app.use('/api/v1/auth', router);

    router.get("/validate", (req, res) => {
        return res.json({
            success: true,
            user: req.user
        })
    })

    router.post('/login', async (req, res) => {
        const result = await authServ.login(req.body);
        if (result.success) {
            return res.status(200).json({
                error: false,
                message: httpStatusCodes[200],
                data: result
            });
        }
        return res.status(401).json({
            error: true,
            message: httpStatusCodes[401],
            data: result

        });

    });



    router.post('/signup', async (req, res) => {

        const { body } = req;

        const result = await authServ.signup(body);
        if (result) {
            return res.status(201).json({
                error: false,
                message: httpStatusCodes[201],
                data: result
            });
        }
        return res.status(400).json({
            error: true,
            message: httpStatusCodes[400],
            data: result
        });


    });
}

module.exports = AuthRouter;



