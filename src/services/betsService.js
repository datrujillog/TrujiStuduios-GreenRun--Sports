const { User } = require('../database/index');
const { Bets } = require('../database/index');
const { UserBets } = require('../database/index');
const { Transaction } = require('../database/index');
const BaseService = require('./baseService');
const UserService = require('./userService');

const { Op } = require("sequelize");



class betsService extends BaseService {
    constructor() {
        super(Bets);
        const userServ = new UserService();
        this.userServ = userServ;

    }

    async getAllBets() {
        try {
            const bets = await this.model.findAll();
            return bets;    
        } catch (error) {
            throw error;
        }
    }

    
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

        //dame una muestra que es lo que le envio por el body de postman







    }

}

module.exports = betsService;