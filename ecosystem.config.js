// pm2 config file
module.exports = {
    apps: [{
        name: "node-boilerplate",
        script: "./bin/server.js",

        // LOGS. set value to /dev/null to disable pm2 logging
        output: './logs/pm2/out.log',
        error: './logs/pm2/error.log',
        merge_logs: true,
        log_date_format: "YYYY-MM-DD HH:mm Z",

        // ENV VARIABLES
        env: {
            NODE_ENV: 'development'
        },
        env_test: {
            NODE_ENV: 'test',
        },
        env_staging: {
            NODE_ENV: 'staging',
        },
        env_production: {
            NODE_ENV: 'production',
        }
    }]
};