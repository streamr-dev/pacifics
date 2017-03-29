
const connection = require('./connection')

//const User = require('./models/user')

const initDependencies = () => {
    // Init dependencies here, see
    // https://sequelize.readthedocs.io/en/v3/docs/associations/
}

const sync = () => connection.sync()

module.exports = {
    initDependencies, sync
}
