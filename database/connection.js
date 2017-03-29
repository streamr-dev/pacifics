const Sequelize = require('sequelize')
const dbConfig = require('./config')

const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    omitNull: true,
    define: {
        timestamps: false,
        freezeTableName: true
    },
    logging: false,
    dialectOptions: {
        multipleStatements: true
    }
})

sequelize.testConnection = () => sequelize.authenticate()
    .then(() => {
        console.info('Connected to the database successfully!')
    })
    .catch((e) => {
        console.error('Something went wrong connecting to the database:\n' + e.stack + '\nExiting.')
        process.exit(1)
    })


sequelize.initDependencies = () => {
    const dependencies = require('./dependencies')
    dependencies.initDependencies() // sync function
    return dependencies.sync()
}

module.exports = sequelize
