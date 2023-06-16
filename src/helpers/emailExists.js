const {User:userModel} = require('../database');

// verificar si el email existe en la base de datos 
const emailExists = async (email = '') => {
    const emailExist = await userModel.findOne({where:{email}});
    if(emailExist){
        throw new Error(`El email ${email} ya esta registrado`);
    }
}

// verificar si el username existe en la base de datos
const usernameExists = async (username = '') => {
    const usernameExist = await userModel.findOne({where:{username}});
    if(usernameExist){
        throw new Error(`El username ${username} ya esta registrado`);
    }
}

module.exports = {
    emailExists,
    usernameExists
}