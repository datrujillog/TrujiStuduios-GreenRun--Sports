
/**
 * Verifica si el usuario tiene permisos para acceder a un recurso
 * @param {string} userId Id del usuario que realiza la petición
 * @param {string} requestedId Id del usuario que se quiere consultar
 * @returns {Promise} Promesa con el resultado de la verificación
 * @throws {Error} Error original si falla la promesa
 * @throws {Error} Error de permisos si el usuario no tiene permisos
 * @example
**/


async function hasPermission(userId, requestedId) {
  if (userId !== requestedId) {
    return Promise.reject(new Error('No tiene permisos para acceder a este recurso'));
  }
}



module.exports = hasPermission;