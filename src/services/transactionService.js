

class transactionService{
    


    async deposit(payload){
        try{
            return {success: true, message: 'Deposito realizado con exito'};
        }catch(error){
            throw error;
        }
    }
}

module.exports = transactionService;