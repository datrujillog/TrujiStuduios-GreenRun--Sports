
function authResponse(res,result,statusCode){
    const { success, message, data } = result;
    return res.status(statusCode).json({
        success,
        message,
        data
    })
    
    


    

}



module.exports = { authResponse }
// return res.status(statusCode).json(result)
