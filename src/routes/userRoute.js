'use strict';

const express = require('express');


const UserServices = require('../services/userService');
const authMiddleware = require('../middlewares/authValidation');
const hasPermission = require('../helpers/hasPermission');

function usersRouter(app) {
    const router = express.Router();
    const userServ = new UserServices();

    app.use('/api/v1/users', router);


    router.get('/One/:id', authMiddleware('user'), async (req, res) => {
        try {
            const { id: userId } = req.user;
            const { id } = req.params;

            const user = await userServ.userOne(userId, id);
            res.json(user);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });


    router.patch('/update/:id', authMiddleware('user'), async (req, res) => {
        const { id } = req.params;
        const data = req.body;
        const result = await userServ.userUpdate(id, data);
        res.status(200).json(result);
    });







//Hacer una apuesta en un evento específico
router.post('/bet/:id', authMiddleware('user'), async (req, res) => {
    const { id } = req.params;
    const { id: userId } = req.user;
    const data = req.body;
    const result = await userServ.userBet(id, userId, data);
    res.status(200).json(result);
});

    
    










    // ************************************************************



    router.get('/', authMiddleware('user'), async (req, res) => {
        const users = await userServ.getAll();
        res.json(users);
    });



}

module.exports = usersRouter;