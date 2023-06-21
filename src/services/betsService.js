const { Op } = require("sequelize");

const BaseService = require('./baseService');
const UserService = require('./userService');

const { Bets: BetsModel } = require('../database/index');


class betsService extends BaseService {
    constructor() {
        super(BetsModel);
        this.userServ = new UserService();
    }


    async betsOne(userId, idUser, id) {
        try {
            await this.userServ.userOne(userId, idUser);
            const bet = await BetsModel.findByPk(id);
            if (!bet) {
                throw new Error(`Bet with Id ${id} does not exist.`);
            }
            return { results: bet };
        } catch (error) {
            console.log(error);
            throw new Error(`${error.message}`);
        }
    }

// ******************************************************************************************
    async userBet(body) {
        try {
            // crear la apuesta
            const bet = await this.create(body);

            return {
                error: false,
                message: 'Bet created',
                data: bet
            }


        } catch (error) {
            throw error;
        }

    }

}

module.exports = betsService;