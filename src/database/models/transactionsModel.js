const { DataTypes } = require("sequelize");

// const TransactionCategory = {
//   DEPOSIT: "deposit",
//   WITHDRAW: "withdraw",
//   BET: "bet",
//   WINNING: "winning",
// };

module.exports = (sequelize) => {
  return sequelize.define("Transaction", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'userId',
      // references: {
      //   model: 'users',
      //   key: 'id'
      // }
    },
    amount: {
      type: DataTypes.INTEGER, //4000 + 
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM("deposit", "withdraw", "bet", "winning"),  //total:5000 + 20% 5200
      allowNull: false,
      field: 'category',
      defaultValue: "deposit",

    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'status',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'createdAt',
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'updatedAt',
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'deletedAt',
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'deleted',
      defaultValue: false,
    },
    userBetId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'userBetId',
      // references: {
      //   model: 'user_bets',
      //   key: 'id'
      // }
    },
  }, {
    timestamps: true,
    paranoid: true,
  });
};
