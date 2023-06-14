const { body, validationResult, check, oneOf } = require('express-validator');
const { validarCampos} = require('./validarCampos');


const validarRegistro = () => {
    const validaciones = [ 
        body('firstName', 'El nombre es obligatorio').not().isEmpty(),
        body('lastName', 'El apellido es obligatorio').not().isEmpty(),
        body('email', 'El email es obligatorio').not().isEmpty(),
        body('email', 'El email no es válido').isEmail(),
        body('password', 'La contraseña es obligatoria').not().isEmpty(),
        body('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
        body('phone', 'El teléfono es obligatorio').not().isEmpty(),
        body('address', 'La dirección es obligatoria').not().isEmpty(),

        validarCampos
    ]

    return validaciones
}

const validarLogin = () => {
    const validaciones = [
        body('email', 'El email es obligatorio').not().isEmpty(),
        body('email', 'El email no es válido').isEmail(),
        body('password', 'La contraseña es obligatoria').not().isEmpty(),
        body('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
    ]
}

const validarActualizarUsuario = () => {
    const validaciones = [
        body('firstName', 'El nombre es obligatorio').not().isEmpty(),
        body('lastName', 'El apellido es obligatorio').not().isEmpty(),
        body('email', 'El email es obligatorio').not().isEmpty(),
        body('email', 'El email no es válido').isEmail(),
        body('phone', 'El teléfono es obligatorio').not().isEmpty(),
        body('address', 'La dirección es obligatoria').not().isEmpty(),
    ]
}

module.exports = {
    validarRegistro,
    validarLogin,
    validarActualizarUsuario,
    validarCampos
}
