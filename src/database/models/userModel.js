const { DataTypes } = require("sequelize");

const UserRole = {
  USER: "user",
  ADMIN: "admin",
  SUPERADMIN: "superadmin",
};

module.exports = (sequelize) => {
  return sequelize.define("User", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    balance: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    role: {
      type: DataTypes.ENUM(...Object.values(UserRole)),
      allowNull: true,
      defaultValue: UserRole.USER,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'birth_date',
    },
    countryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'country_id',
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    documentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'document_id',
    },
    userState: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'user_state',
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {
    timestamps: true,
    paranoid: true,
  });
};
 