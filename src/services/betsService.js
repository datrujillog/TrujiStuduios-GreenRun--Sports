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

    // UPDATE BETS
    async betsUpdate(userId, idUser, betsId, body) {
        try {
            await this.userServ.userOne(userId, idUser);
            const { results: bet } = await this.betsOne(idUser, userId, betsId);
            const updatedBet = await BetsModel.update(body, { where: { id: betsId } });
            return {
                success: true,
                message: `Bet ${bet.name} has been updated.`,
                results: updatedBet,
            };

        } catch (error) {
            console.log(error);
            throw new Error(`${error.message}`);
        }
    }

    async getBestByFilters(userId, idUser, sport, eventId) {
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

    // D ). Cambiar el estado de una apuesta (activa/cancelada)
    async updateBetAdmin(idUser, userId, body) {
        const { status, betOption, eventId, betsId } = body;

        await this.userServ.userOne(idUser, userId);

        const { results: bet } = await this.betsOne(idUser, userId, betsId);

        if (bet.eventId !== eventId) throw new Error(`EventId ${eventId} does not match with bet ${betsId}.`);

        const betOptionString = Object.keys(bet.betOption).toString();
        
        if (betOption !== betOptionString) throw new Error(`BetOption ${betOption} does not match with bet ${betsId}.`);

        const {results:updatedBet} = await this.betsUpdate(idUser, userId, betsId, { status });

        return {
            success: true,
            message: `la apuesta ${bet.name} ha sido ${status}`,
            results: updatedBet
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