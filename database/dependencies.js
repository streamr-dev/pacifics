
const connection = require('./connection')

const User = require('./models/user')
const Service = require('./models/service')

const initDependencies = () => {
    Service.hasMany(User)
    User.belongsTo(Service)
}

const sync = () => connection.sync()

module.exports = {
    initDependencies, sync
}
