'use strict';

const express = require('express');

const transactionService = require('../services/transactionService');

const authMiddleware = require('../middlewares/authValidation');

const hasPermission = require('../helpers/hasPermission');

const { httpStatusCodes } = require('../helpers/httpStatusCodes');



function transactionRouter(app) {
    const router = express.Router();
    const transactionServ = new transactionService();

    app.use('/api/v1/transactions', router);

    router.get('/', async (req, res) => {
        const result = await transactionServ.getAll();
        res.status(200).json(result);
    });

    // Depositar dinero en su cuenta (crear la transacción correspondiente)
    router.patch('/deposit', authMiddleware('user'), async (req, res) => {
        const { amount, userId } = req.body;
        const result = await transactionServ.deposit(userId, amount);
        res.status(200).json(result);
    });

    // Retirar dinero (crear la transacción correspondiente)
    router.patch('/withdraw', authMiddleware('user'), async (req, res) => {
        const { amount, userId } = req.body;
        const result = await transactionServ.withdraw(userId, amount);
        res.status(200).json(result);
    });

    router.get('/balance/:id', authMiddleware('user'), async (req, res) => {
        try {
            const { id: userId } = req.user;
            const { id: requestedId } = req.params;

            const balance = await transactionServ.getBalance(userId, requestedId);
            return res.status(200).json(balance);
        } catch (error) {
            console.error(error);
            res.status(400).json({
                status: httpStatusCodes[400],
                message: error.message
            });

        }
    });


    router.get('/filtros/:id', authMiddleware('user'), async (req, res) => {
        try {
            const { id } = req.user;
            const { id: userId } = req.params;
            const { type } = req.query;

            const result = await transactionServ.getTransactions(userId, id, type);
            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(400).json({
                status: httpStatusCodes[400],
                message: error.message
            });
        }
    });


}

module.exports = transactionRouter;