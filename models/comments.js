module.exports = function(sequelize, DataTypes) {

    var comment = sequelize.define("comment", {
        comment: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [1]
            }
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        date: {
            type: DataTypes.DATE
        }

    });
    return comment;
};