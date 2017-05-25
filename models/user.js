module.exports = function(sequelize, DataTypes) {

    var user = sequelize.define("user", {
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 15]
            }
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
