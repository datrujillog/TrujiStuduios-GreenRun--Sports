'use strict'

const { Op } = require("sequelize");

const BaseService = require('./baseService');
const UserService = require('./userService');
const betsService = require('./betsService');

const transactionService = require('./transactionService');

const { UserBets, Transaction } = require('../database/index');



class betsUserService extends BaseService {
    constructor() {
        super(UserBets);
        this.userServ = new UserService();
        this.betsServ = new betsService();
        this.transactionServ = new transactionService();
    }

    async createUserBet(userId, body) {

        await this.userServ.userOne(userId, body.userId);

        const userBetId = body.betId;
        const idUser = body.userId;
        const { results: bets } = await this.betsServ.betsOne(userId, idUser, userBetId);

        if (bets.dataValues.status !== "active") {
            throw new Error('The bet is not active');
        }

        const balance = await this.transactionServ.getBalance(userId, body.userId);
        if (body.amount > balance.balance || body.amount <= 0) {
            throw new Error('You do not have enough credit to bet');
        }

        const userBet = await UserBets.create(body);

        const newBalance = balance.balance - body.amount;
        await this.userServ.userUpdate(userId, body.userId, { balance: newBalance });

        const datauserBet = {
            userId: body.userId,
            betId: body.betId,
            amount: body.amount,
            category: "bet",
            status: "active",
            userBetId: "bet",
        }
        const newTransaction = await Transaction.create(datauserBet);

        return {
            userBet,
            newTransaction,
            newBalance,
        };
    }
}


module.exports = betsUserService;