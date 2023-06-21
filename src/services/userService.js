'use strict'

const BaseService = require('./baseService');

const { User: UserModel } = require('../database/index');

const hasPermission = require('../helpers/hasPermission');

class UserService extends BaseService {

    constructor() {
        super(UserModel);
    }

    async userOne(userId, id) {
        try {
            await hasPermission(userId, id);
            const results = await UserModel.findOne({ where: { id } });
            if (!results) return { message: `User with Id ${id} does not exist....` };
            return { results };
        } catch (error) {
            console.log(error);
            throw new Error(`${error.message}`);
        }
    }

    async userUpdate(userId, id, body) {
        try {
            await this.userOne(userId, id);

            const { firstName, lastName, password, phone, email, username, balance, address, gender, birthDate, city, category } = body;

            const userUpdate = await this.model.update(
                { firstName, lastName, password, phone, email, username, balance, address, gender, birthDate, city, category },
                { where: { id } }
            );

            return {
                update: true,
                message: `User with user ${firstName} ${lastName} was successfully updated`,
                userUpdate
            };
        } catch (error) {
            throw error;
        }
    }

    async getByEmail(email = "") {
        try {
            const entity = await this.model.findOne({ where: { email } });
            if (!entity) {
                throw new Error(`El email ${email} no existe`);
            }
            return {
                entity
            }
        }
        catch (err) {
            throw err;
        }
    }
}

module.exports = UserService;





















































