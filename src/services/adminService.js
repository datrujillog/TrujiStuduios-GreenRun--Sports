'use strict'

const BaseService = require('./baseService');
const UserService = require('./userService');

const { User: UserModel } = require('../database/index');


class AdminService extends BaseService {

    constructor() {
        super(UserModel);
        this.userServ = new UserService();
        this.baseServ = new BaseService(UserModel);
    }

    // E ). Bloquear a un usuario específico (estado de usuario => activo/bloqueado) (no se
    // pueden bloquear otros administradores
    async blockUserAdmin(idUser, userId, body) {

        const { username } = body;
        await this.userServ.userOne(idUser, userId);
        const { results: userExist } = await this.userServ.getByUsername(userId, idUser, username);

        if (userExist.role === 'admin') throw new Error('You cannot block another admin');
        if (userExist.id === idUser) throw new Error('You cannot block yourself');

        const { data } = await this.baseServ.update(userExist.id, { userState: body.userState });

        return {
            successful: true,
            message: `User ${userExist.username} has been ${body.userState === 'blocked' ? 'blocked' : 'active'}`,
            user: data
        };
    }


}


module.exports = AdminService;