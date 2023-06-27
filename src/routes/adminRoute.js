'use strict';

const express = require('express');

const UserServices = require('../services/userService');
const transactionService = require('../services/transactionService');
const betsService = require('../services/betsService');
const AdminService = require('../services/adminService');

const authMiddleware = require('../middlewares/authValidation');

const { errorResponse } = require('../helpers/authResponse');


function adminRouter(app) {
    const router = express.Router();
    const userServ = new UserServices();
    const transactionServ = new transactionService();
    const betsServ = new betsService();
    const adminServ = new AdminService();


    app.use('/api/v1/admin', router);

    // filter por sport y event
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


    //filters user category
    router.get('/transactios/filters/:id', authMiddleware('admin'), async (req, res) => {
        try {
            const { id } = req.user;
            const { id: idUser } = req.params;
            const { category, userId, username } = req.query;
            const result = await transactionServ.getTransactionsByAmin(idUser, id, category, username, userId);
            return res.status(200).json({ result });
        } catch (error) {
            return errorResponse(res, error, 404);
        }
    });

    //Solicitar saldo de usuario
    router.post('/balance-user/:id', authMiddleware('admin'), async (req, res) => {
        try {
            const { id: idUser } = req.user;
            const { id: userId } = req.params;
            const { username } = req.body;
            const balance = await transactionServ.getBalanceUserAdmin(userId, idUser, username);
            return res.status(200).json(balance);
        } catch (error) {
            return errorResponse(res, error, 404);
        }
    });

    // D ). Cambiar el estado de una apuesta (activa/cancelada)
    router.put('/bets/status/:id', authMiddleware('admin'), async (req, res) => {
        try {
            const { id: idUser } = req.user;
            const { id: userId } = req.params;
            const body = req.body;
            const result = await betsServ.updateBetAdmin(idUser, userId, body);
            return res.status(200).json(result);
        } catch (error) {
            return errorResponse(res, error, 404);
        }
    });

    // E ). Bloquear a un usuario específico (estado de usuario => activo/bloqueado) (no se pueden bloquear otros administradores)
    router.put('/block-user/:id', authMiddleware('admin'), async (req, res) => {
        try {
            const { id: idUser } = req.user;
            const { id: userId } = req.params;
            const body = req.body;
            const result = await adminServ.blockUserAdmin(idUser, userId, body);
            return res.status(200).json(result);
        } catch (error) {
            return errorResponse(res, error, 404);
        }
    });

    // F ). Resultados de apuestas resueltas(ganadas / perdidas) Esta liquidación debería desencadenar pagos para los usuarios que hayan realizado una apuesta por la opción ganadora en caso de ganar
    router.patch('/bets/result/:id', authMiddleware('admin'), async (req, res) => {
        try {
            const { id: idUser } = req.user;
            const { id: userId } = req.params;
            const body = req.body;
            const result = await betsServ.patchBetResult(idUser, userId, body);
            return res.status(200).json(result);
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