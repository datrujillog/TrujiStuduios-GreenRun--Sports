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

    async getBestByFilters(userId,idUser,sport,eventId) {
        try {
            await this.userServ.userOne(userId, idUser);

            const whereClause = {
                sport: sport || { [Op.ne]: null },
                eventId: eventId || { [Op.ne]: null },
            }
            const bets = await BetsModel.findAll({
                where: whereClause,
            });

            const formattedBets = bets.map((bet) => ({
                id: bet.id,
                betOption: bet.betOption,
                sport: bet.sport,
                status: bet.status,
                name: bet.name,
                eventId: bet.eventId,
                add: bet.add,
                result: bet.result,
                createdAt: bet.createdAt,
                updatedAt: bet.updatedAt,
            }));

            return {
                count: formattedBets.length,
                bets: formattedBets,
            };
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