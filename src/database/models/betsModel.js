const { DataTypes } = require("sequelize");
 
const BetStatus = {
    PENDING: "pending",
    WON: "won",
    LOST: "lost",
};
 
const BetResult = {
    WON: "won",
    LOST: "lost",
}; 
 
module.exports = (sequelize) => {
    return sequelize.define("Bets", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        betOption: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sport: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM(...Object.values(BetStatus)),
            allowNull: false,
            defaultValue: BetStatus.PENDING
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        eventId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        odd: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        result: {
            type: DataTypes.ENUM(...Object.values(BetResult)),
            allowNull: true,
            defaultValue: BetResult.LOST
        },
    }, {
        timestamps: true,
        paranoid: true,
    });
};

