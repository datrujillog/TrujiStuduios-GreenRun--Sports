'use strict';

const express = require('express');

const transactionService = require('../services/transactionService');

const authMiddleware = require('../middlewares/authValidation');

const hasPermission = require('../helpers/hasPermission');

const { httpStatusCodes } = require('../helpers/httpStatusCodes');
const { errorResponse } = require('../helpers/authResponse');



function transactionRouter(app) {
    const router = express.Router();
    const transactionServ = new transactionService();

    app.use('/api/v1/transactions', router);

    router.get('/', async (req, res) => {
        const result = await transactionServ.getAll();
        res.status(200).json(result);
    });

    router.patch('/deposit', authMiddleware('adminUser'), async (req, res) => {
        try {
            const { amount, userId } = req.body;
            const { id } = req.user;
            const result = await transactionServ.deposit(userId, id, amount);
            return res.status(200).json({ message: 'Deposit successfully', result });
        } catch (error) {
            return errorResponse(res, error, 404);
        }
    });


    router.patch('/withdraw', authMiddleware('adminUser'), async (req, res) => {
        try {
            const { amount, userId } = req.body;
            const { id } = req.user;
            const result = await transactionServ.withdraw(userId, id, amount);
            return res.status(200).json({ result });
        } catch (error) {
            return errorResponse(res, error, 404);
        }
    });

    router.get('/balance/:id', authMiddleware('user'), async (req, res) => {
        try {
            const { id: userId } = req.user;
            const { id: requestedId } = req.params;
            const balance = await transactionServ.getBalanceUser(userId, requestedId);
            return res.status(200).json(balance);
        } catch (error) {
            return errorResponse(res, error, 404);
        }
    });

    



}

module.exports = transactionRouter;