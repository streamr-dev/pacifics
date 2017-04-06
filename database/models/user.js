
const Sequelize = require('sequelize')
const connection = require('../connection')

const Service = require('./service')

const User = connection.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: true,
    include: [ Service ]
})

User.Instance.prototype.toJSON = function() {
    let json = this.get({
        plain: true
    })
    delete json.password
    return json
}

module.exports = User
