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
        },
        id_rol: {
            type: DataType.INTEGER
        }
    });
    /* 
        generateHash: async function(password) {
            return await bcrypt.hash(password, bcrypt.genSaltSync(8));
        },
        validPassword: async function(password) {
            return await bcrypt.compare(password, this.password);
        } 

    Users.prototype.generateHash = async function(password) {
        return await bcrypt.hash(password, bcrypt.genSaltSync(8));
    };

    Users.prototype.validPassword = async function(password) {
        return await bcrypt.compare(password, this.password);
    }; */

    Users.associate = (models) => {
        Users.belongsTo(models.Roles, { foreignKey: 'id_rol' });
    };

    return Users;

};