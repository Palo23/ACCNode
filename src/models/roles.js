import bcrypt from 'bcryptjs';

module.exports = (sequelize, DataType) => {
    const Roles = sequelize.define('Roles', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });

    Roles.associate = (models) => {
        Roles.hasMany(models.Users);
    };

    return Roles;

};