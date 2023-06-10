'use strict';
const express = require('express');

const UserServices = require('../services/userService');

function usersRouter(app) {
    const router = express.Router();
    const userServ = new UserServices();

    app.use('/api/v1/users', router);

    router.get('/',async (req, res) => {
        const users =  await userServ.getAll();
        // console.log('USER <> ',users);
        res.json(users);       
    });

    router.post('/', (req, res) => {
        res.json({message: "Hello World ROUTER POST"});
    });
}

module.exports = usersRouter;