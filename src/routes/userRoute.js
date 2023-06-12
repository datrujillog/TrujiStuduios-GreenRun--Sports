'use strict';
const express = require('express');


const UserServices = require('../services/userService');

function usersRouter(app) {
    const router = express.Router();
    const userServ = new UserServices();

    app.use('/api/v1/users', router);

    app.put('/:id', async (req, res) => {
        const { id } = req.params;
        const { data,userId } = req.body;
        console.log('data',data);
        console.log('userId',userId);
        // const result = await userServ.update(id, data);
        res.json(result);
    });







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