async getTransactionsByUser(idUser, id, category, userId) {
    const { results: user } = await this.userServ.userOne(idUser, id);

    const whereClause = {
        category: category || { [Op.ne]: null },
        userId: idUser
    };

    const transactions = await Transaction.findAll({
        where: whereClause
    });

    const formattedTransactions = transactions.map((transaction) => {
        const formattedUserId = transaction.userId.map((user) => ({
            id: user.id,
            name: user.name,
            // Añadir más propiedades de usuario según tus necesidades
        }));

        return {
            id: transaction.id,
            amount: transaction.amount,
            userId: formattedUserId,
            userBetId: transaction.userBetId,
            category: transaction.category,
            status: transaction.status,
            createdAt: transaction.createdAt,
            updatedAt: transaction.updatedAt,
        };
    });

    return {
        count: formattedTransactions.length,
        transactions: formattedTransactions,
    };
}
