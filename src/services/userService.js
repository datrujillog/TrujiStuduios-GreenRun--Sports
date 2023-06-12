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

    
      
      






      //////////////////////////////////////


    async update(id, data) {
        try {
            const user = await User.update(data, {
                where: {
                    id
                }
            });
            return {
                updated: true,
                data: user
            }
        } catch (err) {
            throw err;
        }
    }

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







  