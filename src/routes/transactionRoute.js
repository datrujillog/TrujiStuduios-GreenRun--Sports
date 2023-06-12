'use strict';
const express = require('express');

const transactionService = require('../services/transactionService');

const authMiddleware = require('../middlewares/authValidation');

function transactionRouter(app) {
    const router = express.Router();
    const transactionServ = new transactionService();

    app.use('/api/v1/transactions', router);

    // Depositar dinero en su cuenta (crear la transacción correspondiente)
    router.patch('/deposit', authMiddleware('user'), async (req, res) => {
        const { amount, userId } = req.body;
        console.log(userId);
        const result = await transactionServ.deposit(userIdm, amount); 
    });
}

module.exports = transactionRouter;