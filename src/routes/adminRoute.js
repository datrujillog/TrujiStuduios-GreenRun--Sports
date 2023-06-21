'use strict';

const express = require('express');

const UserServices = require('../services/userService');
const transactionService = require('../services/transactionService');
const betsService = require('../services/betsService');

const { validateUpdateUser } = require('../middlewares/validateMiddleware');
const authMiddleware = require('../middlewares/authValidation');

const { authResponse, loginResponse, errorResponse } = require('../helpers/authResponse');


function adminRouter(app) {
    const router = express.Router();
    const userServ = new UserServices();
    const transactionServ = new transactionService();
    const betsServ = new betsService();


    app.use('/api/v1/admin', router);


    router.get('/transactios/filters/:id', authMiddleware('admin'), async (req, res) => {
        try {
            const { id } = req.user;
            const { id: idUser } = req.params;
            const { category, userId } = req.query;
            const result = await transactionServ.getTransactionsByAmin(idUser, id, category, userId);
            return res.status(200).json({ result });
        } catch (error) {
            return errorResponse(res, error, 404);
        }
    });

    router.get('/bets/filters/:id', authMiddleware('admin'), async (req, res) => {
        try {
            const { id: userId } = req.user;
            const { id: idUser } = req.params;
            const { sport, eventId } = req.query;
            const result = await betsServ.getBestByFilters(userId, idUser, sport, eventId);
            return result ? res.status(200).json(result) : res.status(400).json(result);
        } catch (error) {
            return errorResponse(res, error, 404);
        }
    });



    
    // ***********************************************************************************************

    router.post('/create', authMiddleware('admin'), async (req, res) => {
        try {
            // const { id: userId } = req.user;
            // const { id } = req.params;
            const body = req.body;
            const result = await betsServ.userBet(body);
            res.status(200).json({ data: result });

        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });
}

module.exports = adminRouter;