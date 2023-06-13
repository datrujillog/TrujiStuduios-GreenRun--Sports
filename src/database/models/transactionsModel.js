const { DataTypes } = require("sequelize");

const TransactionCategory = {
  DEPOSIT: "deposit",
  WITHDRAW: "withdraw",
  BET: "bet",
  WINNING: "winning",
  TRANSFER: "transfer",
};

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
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM(Object.values(TransactionCategory)),
      allowNull: false,
      field: 'category',
      defaultValue: TransactionCategory.DEPOSIT,

    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'status',
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
    userAssociatedId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: 'User Associated',
    },
  }, {
    timestamps: true,
    paranoid: true,
  });
};
