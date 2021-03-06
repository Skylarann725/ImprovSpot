module.exports = function(sequelize, DataTypes) {

    var improv = sequelize.define("improv", {
        game_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { 
              len: [1]
            },
            unique: true
        },
        instructions: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        avg_rating: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        min_players: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 2
        },
        max_players: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        date: {
            type: DataTypes.DATE
        }
    });
    return improv;
};