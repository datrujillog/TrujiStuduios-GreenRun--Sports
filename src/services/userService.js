const BaseService = require('./baseService');

const { User } = require('../database/index');
const { Transaction } = require('../database/index');

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







