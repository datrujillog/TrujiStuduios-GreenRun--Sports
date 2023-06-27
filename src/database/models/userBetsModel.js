
const { DataTypes } = require("sequelize");

const BetStatus = {
    OPEN: 'open',
    WON: 'won',
    LOST: 'lost'
};

module.exports = (sequelize) => {
    return sequelize.define("UserBet", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    betId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    odd: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    state: {
        type: DataTypes.ENUM(...Object.values(BetStatus)),
        allowNull: false,
        defaultValue: BetStatus.OPEN
    }
}, {
    timestamps: true,
    paranoid: true,
});

};






