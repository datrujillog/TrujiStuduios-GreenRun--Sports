'use strict';
const express = require('express');

const transactionService = require('../services/transactionService');

const authMiddleware = require('../middlewares/authValidation');

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
}

module.exports = transactionRouter;