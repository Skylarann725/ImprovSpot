module.exports = function(sequelize, DataTypes) {

    var user = sequelize.define("user", {
        username: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1, 15]
            }
        },

        firstname: {
            type: DataTypes.STRING,
            allowNull: false
        },

        lastname: {
            type: DataTypes.STRING,
            allowNull: false
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                min: 6
            }
        }

    });
    return user;
};
