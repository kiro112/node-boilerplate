'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);

const config = require('./../../config/config').database.sequelize;

const db = {};

const sequelize = new Sequelize(
    config.db_name, 
    config.db_user, 
    config.db_password, 
    config.options
);

fs.readdirSync(__dirname + '/models') //lists all filenames
    .filter(file => {
        return (file.indexOf('.' !== 0) && (file !== basename) && (file.slice(-3) === '.js'));
    })
    .forEach(file => {
        const model = sequelize['import'](path.join(__dirname + '/models', file));
        db[model.name] = model;
    });

Object.keys(db)
    .forEach(modelName => {
        if (db[modelName].associate) {
            db[modelName].associate(db);
        }
    });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

sequelize
    .authenticate()
    .then(() => {
        console.log('connected to the database');
    })
    .catch(err => {
        throw new Error('Sequelize unable to connect to database', err);
    });

// this is dangerous !
if(['development', 'test'].includes(process.env.NODE_ENV)) {
    sequelize.sync({ force: false });
}

module.exports = db;