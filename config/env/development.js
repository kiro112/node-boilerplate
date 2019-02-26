'use strict';

module.exports = {
    app: {
        name: 'MyBoilerplate',
        port: 3000
    },
    database: {
        sequelize: {
            db_name: 'boilerplate_db',
            db_user: 'root',
            db_password: 'toor',
            options: {
                host: 'localhost',
                dialect: 'mysql',
                port: '3306',
                operatorsAliases: false,
                // logging: false
            }
        }
    }
};