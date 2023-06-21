'use strict';

const express = require('express');


const UserServices = require('../services/userService');
const authMiddleware = require('../middlewares/authValidation');
const { authResponse, loginResponse, errorResponse } = require('../helpers/authResponse');
const { validateUpdateUser } = require('../middlewares/validateMiddleware');
const transactionService = require('../services/transactionService');

function usersRouter(app) {
    const router = express.Router();
    const userServ = new UserServices();
    const transactionServ = new transactionService();

    app.use('/api/v1/users', router);


    router.get('/One/:id', authMiddleware('adminUser'), async (req, res) => {
        try {
            const { id: userId } = req.user;
            const { id } = req.params;
            const { results } = await userServ.userOne(userId, id);
            return results ? res.status(200).json(results) : res.status(400).json(results);
        } catch (error) {
            return errorResponse(res, error, 404);
        }
    });


    router.patch('/update/:id', [
        authMiddleware('user'),
        validateUpdateUser()
    ], async (req, res) => {
        try {
            const { id: userId } = req.user;
            const { id } = req.params;
            const data = req.body;
            const result = await userServ.userUpdate(userId, id, data);
            return result ? res.status(200).json(result) : res.status(400).json(result);
        } catch (error) {
            return errorResponse(res, error, 404);
        }
    });



    //user
    router.get('/transactios/filters/:id', authMiddleware('adminUser'), async (req, res) => {
        try {
            const { id } = req.user;
            const { id: idUser } = req.params;
            const { category, userId } = req.query;
            const result = await transactionServ.getTransactionsByUser(idUser, id, category, userId);
            return res.status(200).json({ result });
        } catch (error) {
            return errorResponse(res, error, 404);
        }
    });

}

module.exports = usersRouter;