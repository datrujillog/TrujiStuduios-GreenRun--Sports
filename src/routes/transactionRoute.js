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

            // return res.status(500).json({ error: 'Error en el servidor' });
        }
    });








    // Obtener sus transacciones (se pueden filtrar por tipo de depósito, retiro, apuesta,
    // ganador) y por fechas (desde y hasta).
    router.get('/getOne/:id', authMiddleware('user'), async (req, res) => {
        const { id: userId } = req.params;
        const { type, from, to } = req.query;

        const result = await transactionServ.getTransactions(userid, type, from, to);
        res.status(200).json(result);
    });


}

module.exports = transactionRouter;