const BaseService = require('./baseService');

const { User } = require('../database/index');
const { Transaction } = require('../database/index');
const hasPermission = require('../helpers/hasPermission');
const { httpStatusCodes } = require('../helpers/httpStatusCodes');

class UserService extends BaseService {

    constructor() {
        super(User);
    }


    async getAll() {
        try {
            const count = await User.count();
            if (count === 0) {
                return {
                    count,
                    message: "No hay usuarios"
                };
            }

            const fields = { deleted: false };
            const exclude = null;

            const { count: usersCount, entities: users } = await this.findAllByFieldsAndExclude(fields, exclude);

            return {
                count: usersCount,
                users
            };
        } catch (error) {
            throw error;
        }
    }

    async userUpdate(id, body) {
        try {
            const user = await User.findOne({ where: { id } }); // Buscamos el usuario por id

            if (!user) {
                return { message: `El usuario con el Id ${id} no existe` };
            }

            const { firstName, lastName, password, phone, email, username, address, gender, birthDate, city, category } = body;

            const userUpdate = await User.update(
                { firstName, lastName, password, phone, email, username, address, gender, birthDate, city, category },
                { where: { id } }
            );

            return {
                update: true,
                message: `El usuario con el id ${id} se actualizó correctamente`,
                data: userUpdate
            };
        } catch (error) {
            throw error;
        }
    }

    async userOne(userId, id) {
        try {

            await hasPermission(userId, id);

            const user = await User.findOne({ where: { id } });
            if (!user) return { message: ` El usuario con el Id ${id} no existe` };

            return {
                user
            };

        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    //Hacer una apuesta en un evento específico
    async userBet(id, userId, body) {
        try {
            const user = await User.findOne({ where: { id: userId } });
            if (!user) return { message: ` El usuario con el Id ${userId} no existe` };

            const transaction = await Transaction.findOne({ where: { id } });

            const { amount } = body;

            if (transaction) {
                const newAmount = transaction.amount + amount;
                const transactionUpdate = await Transaction.update(
                    { amount: newAmount },
                    { where: { id } }
                );
                return {
                    update: true,
                    message: `La transacción con el id ${id} se actualizó correctamente`,
                    data: transactionUpdate
                };
            }

            const transactionCreate = await Transaction.create(
                { amount, userId },
                { where: { id } }
            );

            return {
                create: true,
                message: `La transacción con el id ${id} se creó correctamente`,
                data: transactionCreate
            };
            

        } catch (error) {
            console.log(error);
            throw error;
        }
    }




















    //////////////////////////////////////




    //borrar el usuario por id pero no lo borra de la base de datos con el campo deleted 
    async delete(id) {
        try {
            const user = await User.findByPk(id);
            if (user) {
                user.deleted = true;
                await user.save();
                return {
                    deleted: true,
                    data: user
                }
            } else {
                throw new Error('User not found');
            }



        } catch (err) {
            throw err;
        }
    }


    // async delete(id){
    //     try{
    //         const user = await User.destroy({
    //             where: {
    //                 id
    //             }
    //         });
    //         return {
    //             deleted: true,
    //             data: user
    //         }
    //     }catch(err){
    //         throw err;
    //     }
    // }



}

module.exports = UserService;







