
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
    },
    deliveryCreatorAddress: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    eventManagerAddress: {
        type: Sequelize.STRING,
        allowNull: false
    },
    trackingStreamId: {
        type: Sequelize.STRING,
        allowNull: false
    },
    trackingStreamKey: {
        type: Sequelize.STRING,
        allowNull: false
    },
    photoStreamId: {
        type: Sequelize.STRING,
        allowNull: false
    },
    photoStreamKey: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: true
})

module.exports = Service
