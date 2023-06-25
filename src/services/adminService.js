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

    // ! En desarrollo
    // E ). Bloquear a un usuario específico (estado de usuario => activo/bloqueado) (no se
    // pueden bloquear otros administradores
    async blockUserAdmin(idUser, userId, body) {
        const { username } = body;

        const { results: user } = await this.userServ.userOne(idUser, userId);

        const {results:userExist} = await this.userServ.getByUsername(userId, idUser, username);

        // console.log(userExist.role)

        if (userExist.role === 'admin') throw new Error('You cannot block another admin');

        if (userExist.id === idUser) throw new Error('You cannot block yourself'); // es para que no se bloquee a si mismo

        const updateBlock = await this.baseServ.update(userExist.id, { userState: userExist.userState === 'blocked' ? 'active' : 'blocked' });

        return {
            message: `User ${userExist.username} has been ${userExist.userState === 'blocked' ? 'unblocked' : 'blocked'}`,
            user: updateBlock
        }


        // return await this.baseServ.update(userExist.id, { state: userExist.state === 'blocked' ? 'active' : 'blocked' });

        // if (userExist.state === 'blocked') {
        //     userExist.state = 'active';
        //     await userExist.update({ state: 'active' });
        //     return userExist;
        // } else {
        //     userExist.state = 'blocked';
        //     await userExist.update({ state: 'blocked' });
        //     return userExist;
        // }

    }

}


module.exports = AdminService;