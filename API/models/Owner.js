const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcryptjs");

class Owner extends Model {
  async validPassword(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  }

  generateJWT() {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
  }
}

Owner.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alternateContact: {
      type: DataTypes.STRING,
    },
    profession: {
      type: DataTypes.STRING,
    },
    bio: {
      type: DataTypes.TEXT,
    },
    wardenName: {
      type: DataTypes.STRING,
    },
    wardenContact: {
      type: DataTypes.STRING,
    },
    wardenEmail: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    govId: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ownersEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: "owner",
    underscored: true,
    freezeTableName: true,
    hooks: {
      beforeCreate: async (owner) => {
        if (owner.changed("password")) {
          owner.password = await bcrypt.hash(owner.password, 10);
        }
      },
    },
  }
);

module.exports = Owner;
