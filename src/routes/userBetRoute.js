'use strict';

const express = require('express');

const betsUserService = require('../services/userBetsServise');
const authMiddleware = require('../middlewares/authValidation');
const { errorResponse } = require('../helpers/authResponse');
function userBetRouter(app) {
    const router = express.Router();
    const betsUserServ = new betsUserService();
    

    app.use('/api/v1/userBets', router);


    router.post('/', authMiddleware('user'), async (req, res) => {
        try {
            const { id: userId } = req.user;
            const body = req.body;
            const result = await betsUserServ.createUserBet(userId, body);
            return res.status(201).json({data: result});
        } catch (error) {
            return errorResponse(res, error, 404);
        }
    });

}

module.exports = userBetRouter;