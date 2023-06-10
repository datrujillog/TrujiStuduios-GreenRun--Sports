
const UserService = require('./userService');

class AuthServices{

    async signup(data){
        const UserServ = new UserService();

        const user = await UserServ.create(data);
        return user;
    }

}

module.exports = AuthServices;
