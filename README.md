# node-boilerplate



# PM2
[documentation](https://pm2.io/doc/en/runtime/overview/)

## Config File
> ecosystem.config.js
```json
module.exports = {
    apps: [{
        name: "node-boilerplate",
        script: "./bin/server.js",

        // LOGS. set value to /dev/null to disable pm2 logging
        output: './logs/pm2/out.log',
        error: './logs/pm2/error.log',
        merge_logs: true,

        // ENV VARIABLES
        env: {
            NODE_ENV: "development"
        },
        env_test: {
            NODE_ENV: "test",
        },
        env_staging: {
            NODE_ENV: "staging",
        },
        env_production: {
            NODE_ENV: "production",
        }
    }]
};
```

## Change ENV by using 
[env-docs](https://pm2.io/doc/en/runtime/best-practices/environment-variables/#set-environment-1)
> pm2 start ecosystem.config.js --env production
> Note: Not yet sure which to use `/env` directory or env of pm2
>       but let just put env_* at ecosystem.config.js
>       personally, i like the /env dir for development but want to use pm2 env for production


## pm2-logrotate
> Install `pm2 install pm2-logrotate`
[documentation](https://github.com/keymetrics/pm2-logrotate)
