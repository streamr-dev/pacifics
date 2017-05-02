
const connection = require('./connection')

const User = require('./models/user')
const EncryptedImage = require('./models/encrypted_image')
const Service = require('./models/service')

const initDependencies = () => {
    Service.hasMany(User, {
        foreignKey: {
            name: 'serviceId',
            allowNull: false
        }
    })
    User.belongsTo(Service, {
        foreignKey: {
            name: 'serviceId',
            allowNull: false
        }
    })
}

const sync = () => connection.sync()

module.exports = {
    initDependencies, sync
}
