
const {User} = require('../database/index');

class UserService{

    async getAll(){
        try{
            // console.log("getAll");
            const count = await User.count();
            const users = await User.findAll();
            // console.log(users);
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

    async delete(id){
        try{
            const user = await User.destroy({
                where: {
                    id
                }
            });
            return {
                deleted: true,
                data: user
            }
        }catch(err){
            throw err;
        }
    }

    

}

module.exports = UserService;
