const { Op } = require("sequelize");

const BaseService = require('./baseService');
const UserService = require('./userService');
const transactionService = require("./transactionService");

const { Bets: BetsModel, Transaction } = require('../database/index');
const { UserBets: UserBetsModel } = require('../database/index');

class betsService extends BaseService {
    constructor() {
        super(BetsModel);
        this.userServ = new UserService();
        this.transactionServ = new transactionService();
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

        const { results: updatedBet } = await this.betsUpdate(idUser, userId, betsId, { status });

        return {
            success: true,
            message: `la apuesta ${bet.name} ha sido ${status}`,
            results: updatedBet
        }
    }

    //! En Desarrollo resolver la liquidacion de lost no liquidar
    //     F ). Resultados de apuestas resueltas(ganadas / perdidas)
    // 
    // Esta liquidación debería desencadenar pagos para los usuarios que hayan realizado una
    // apuesta por la opción ganadora en caso de ganar

    async patchBetResult(idUser, userId, body) {

        const { results: user } = await this.userServ.userOne(userId, idUser);
        const { results: best } = await this.betsOne(idUser, userId, body.betsId);

        if (best.status === 'settled') throw new Error(`Bet ${body.betsId} is already settled.`);
        if (best.status === 'cancelled') throw new Error(`Bet ${body.betsId} is already cancelled.`);
        if (best.result === 'won') throw new Error(`Bet ${body.betsId} is already won.`);
        if (best.result === 'lost') throw new Error(`Bet ${body.betsId} is already lost.`);

        const result = await BetsModel.update({ result: body.result, status: body.status }, { where: { id: body.betsId } });
        // !Analizar este punto 
        //si la apuesta es lost no liquidar 
        if (body.result === 'lost') { //si la apuesta es lost no liquidar solo actualizar el estado de la apuesta y de los usuarios que apostaron
            const bestFilter = await UserBetsModel.findAll({ where: { betId: body.betsId, state: 'open' } });

            for (const bet of bestFilter) {
                await UserBetsModel.update({ status: body.status, result: body.result }, { where: { id: bet.id } });
                
            }
            return {
                success: true,
                message: `la apuesta ha sido actualizada`,
                results: result
            }
        }

        //si la apuesta es won liquidar
        
        const bestFilter = await UserBetsModel.findAll({ where: { betId: body.betsId, state: 'open' } });

        for (const bet of bestFilter) { 
            var Sum = bet.odd * bet.amount;
            await UserBetsModel.update({ status: body.status, result: body.result, amount: Sum }, { where: { id: bet.id } });
            const dataTran = {
                userId: bet.userId,
                amount: Sum,
                category: "winning",
                status: "settled",
                userBetId: "winning",
            }
            await Transaction.create(dataTran);
        }

        return {
            success: true,
            message: `la apuesta ha sido actualizada`,
            results: result
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