module.exports = function(sequelize, DataTypes) {

    var user = sequelize.define("user", {
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { 
              len: [1]
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { 
              len: [1]
            }
        }
        
    });
    return user;
};