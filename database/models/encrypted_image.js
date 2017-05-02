
const Sequelize = require('sequelize')
const connection = require('../connection')

const EncryptedImage = connection.define('encryptedImage', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    hash: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    salt: {
        type: Sequelize.STRING,
        allowNull: false
    },
    initialVector: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: true
})

module.exports = EncryptedImage