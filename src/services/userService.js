
const {User} = require('../database/index');

class UserService{

    async getByEmail(username) {
        try {
            const user = await User.findOne({where: {username, deleted: false}});
            return user;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
   

    async getAll(){
        try{
            const count = await User.count();
            if(count === 0){
                return {
                    count,
                    messge: "No hay usuarios"
                }
            }
            //listar solo los usuarios que no esten borrados
            const users = await User.findAll({where: {deleted: false}});
                   
            return {
                count,
                users
            }
        }catch(err){
            throw err;
        }
    }

    async getById(id){
        try{
            const user = await User.findByPk(id);
            return {
                user
            }
        }catch(err){
            throw err;
        }
    }

    async create(data){
        try{
            const user = await User.create(data);
            return {
                created: true,
                data: user
            }
        }catch(err){
            throw err;
        }
    }

    async update(id, data){
        try{
            const user = await User.update(data, {
                where: {
                    id
                }
            });
            return {
                updated: true,
                data: user
            }
        }catch(err){
            throw err;
        }
    }

    //borrar el usuario por id pero no lo borra de la base de datos con el campo deleted 
    async delete(id){
        try{
            const user = await User.findByPk(id);
            if(user){
                user.deleted = true;
                await user.save(); 
                return {
                    deleted: true,
                    data: user
                }
            }else{
                throw new Error('User not found');
            }


               
        }catch(err){
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
