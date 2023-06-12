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
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'updated_at',
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'deleted_at',
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    userBetId: {
      type: DataTypes.UUID,
      allowNull: true,
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
