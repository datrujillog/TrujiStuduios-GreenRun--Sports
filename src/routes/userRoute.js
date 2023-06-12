'use strict';
const express = require('express');


const UserServices = require('../services/userService');

function usersRouter(app) {
    const router = express.Router();
    const userServ = new UserServices();

    app.use('/api/v1/users', router);

    // Depositar dinero en su cuenta (crear la transacción correspondiente)
    router.post('/deposit', async (req, res) => {
        const {amount, userId} = req.body;
        const result = await userServ.deposit(amount, userId); // {success: true, message: 'Deposito realizado con exito'}
        res.json(result);
    });
    // Retirar dinero de su cuenta (crear la transacción correspondiente)






    // ************************************************************

    

    router.get('/',async (req, res) => {
        const users =  await userServ.getAll();
        res.json(users);       
    });

    
    router.put('/:id', (req, res) => {
        const {id} = req.params;
        const result = userServ.delete(id);
        res.json(result);
    });
    
}

module.exports = usersRouter;