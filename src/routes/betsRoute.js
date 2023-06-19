'use strict';

const express = require('express');

const betsService = require('../services/betsService');
const authMiddleware = require('../middlewares/authValidation');
const hasPermission = require('../helpers/hasPermission');

function betsRouter(app) {
    const router = express.Router();
    const betsServ = new betsService();

    app.use('/api/v1/bets', router);


    
    router.post('/', authMiddleware('user'), async (req, res) => {
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


module.exports = betsRouter;