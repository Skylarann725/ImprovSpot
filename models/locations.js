module.exports = function(sequelize, DataTypes) {

    var locations = sequelize.define("locations", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        group_level: {
            type: DataTypes.STRING,
            allowNull: false
        },
        improv_type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true
        },
        date_established: {
            type: DataTypes.DATE,
            allowNull: false
        },
        nospacename: {
            type: DataTypes.STRING,
            allowNull: false
        },
        urlcity: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return locations;
};