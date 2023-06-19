
/**
 * Sends an authentication response to the client.
 * @param {Object} res - The response object.
 * @param {Object} result - The result object containing success, message, and data properties.
 * @param {number} statusCode - The HTTP status code to send with the response.
 * @returns {Object} The response object with the success, message, and data properties.
 */
function authResponse(res, result, statusCode) {
    // console.log('DATA <> ',result);
    const { success, message, data } = result;
    return res.status(statusCode).json({
        success,
        message,
        data
    })
}

/**
 * Sends a login response to the client.
 * @param {Object} res - The response object.
 * @param {Object} result - The result object containing success, message, and token properties.
 * @param {number} statusCode - The HTTP status code to send with the response.
 * @returns {Object} The response object with the success, message, and token properties.
 */
function loginResponse(res, result, statusCode) {
    const { success, message, token } = result;
    return res.status(statusCode).json({
        success,
        message,
        token
    });
}


/**
 * Sends an error response to the client.
 * @param {Object} res - The response object.
 * @param {Object} result - The result object containing success, message, and error properties.
 * @param {number} statusCode - The HTTP status code to send with the response.
 * @returns {Object} The response object with the success, message, and error properties.
 */
function errorResponse(res, result, statusCode) {
    const { success, message, error } = result;
    return res.status(statusCode).json({
        success,
        message,
        error
    });
}





module.exports = { authResponse, loginResponse, errorResponse };
// return res.status(statusCode).json(result)
