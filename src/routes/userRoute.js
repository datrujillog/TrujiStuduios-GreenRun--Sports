'use strict';

const express = require('express');


const UserServices = require('../services/userService');
const authMiddleware = require('../middlewares/authValidation');

function usersRouter(app) {
    const router = express.Router();
    const userServ = new UserServices();

    app.use('/api/v1/users', router);

    

    router.patch('/update/:id', authMiddleware('user'), async (req, res) => {
        const { id } = req.params;
        const data = req.body;
        const result = await userServ.userUpdate(id, data);
        res.status(200).json(result);
    });


    





    // ************************************************************

    

    router.get('/',authMiddleware('user'), async (req, res) => {
        const users =  await userServ.getAll();
        res.json(users);       
    });

    
    
}

module.exports = usersRouter;