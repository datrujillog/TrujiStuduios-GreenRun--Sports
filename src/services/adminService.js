'use strict'

const BaseService = require('./baseService');

const { User: UserModel } = require('../database/index');

const hasPermission = require('../helpers/hasPermission');
const UserService = require('./userService');

class AdminService extends BaseService {

    constructor() {
        super(UserModel);
        this.userServ = new UserService();
        this.baseServ = new BaseService(UserModel);
    }
    // ! Revisar el bloqueo de usuario y el active  
    // E ). Bloquear a un usuario específico (estado de usuario => activo/bloqueado) (no se
    // pueden bloquear otros administradores
    async blockUserAdmin(idUser, userId, body) {

        const { username } = body;
        await this.userServ.userOne(idUser, userId);
        const { results: userExist } = await this.userServ.getByUsername(userId, idUser, username);

        if (userExist.role === 'admin') throw new Error('You cannot block another admin');
        if (userExist.id === idUser) throw new Error('You cannot block yourself');

        const updatedUserState = userExist.userState === 'blocked' ? 'active' : 'blocked';
        const { data } = await this.baseServ.update(userExist.id, { userState: updatedUserState });

        return {
            successful: true,
            message: `User ${userExist.username} has been ${updatedUserState === 'blocked' ? 'unblocked' : 'blocked'}`,
            user: data
        };
    }


}


module.exports = AdminService;