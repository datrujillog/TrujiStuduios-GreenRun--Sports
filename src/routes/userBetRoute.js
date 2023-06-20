'use strict';

const express = require('express');

const betsUserService = require('../services/userBetsServise');
const authMiddleware = require('../middlewares/authValidation');
const hasPermission = require('../helpers/hasPermission');

function userBetRouter(app) {
    const router = express.Router();
    const betsUserServ = new betsUserService();
    

    app.use('/api/v1/userBets', router);


    // Hacer una apuesta en un evento específico
    router.post('/', authMiddleware('user'), async (req, res) => {
        try {
            const { id: userId } = req.user;
            // const { id } = req.params;
            const body = req.body;


        


            const result = await betsUserServ.createUserBet(userId, body);
            res.status(200).json({ data: result });
            // res.status(200).json({ data: 'hola mundo' });

        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });

}

module.exports = userBetRouter;