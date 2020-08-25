import bcrypt from 'bcryptjs';

module.exports = (sequelize, DataType) => {
    const Users = sequelize.define('Users', {
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
        },
        password: {
            type: DataType.STRING,
            allowNull: false,
            validate: { notEmpty: true }
        },
        email: {
            type: DataType.STRING,
            unique: true,
            allowNull: false,
            validate: { notEmpty: true }
        }
    }, {
        instanceMethods: {
            async generateHash(password) {
                return await bcrypt.hash(password, bcrypt.genSaltSync(8));
            },
            async validPassword(password) {
                return await bcrypt.compare(password, this.password);
            }
        }
    });

    Users.associate = (models) => {
        Users.belongsTo(models.Roles);
    };

    return Users;

};