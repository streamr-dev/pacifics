
const Sequelize = require('sequelize')
const connection = require('../connection')

const Service = connection.define('service', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    parcelCreatorAddress: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    postboxCreatorAddress: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
}, {
    timestamps: true
})

module.exports = Service
