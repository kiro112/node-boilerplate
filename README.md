# node-boilerplate



# PM2
[documentation](https://pm2.io/doc/en/runtime/overview/)

## Config File
> ecosystem.config.js


## Change ENV by using 
[env-docs](https://pm2.io/doc/en/runtime/best-practices/environment-variables/#set-environment-1)
> pm2 start ecosystem.config.js --env production

Note: Not yet sure which to use /env directory or env of pm2 but let just put env_* at ecosystem.config.js personally, i like the /env dir for development but prefer to use pm2 env for production


## pm2-logrotate
> Install `pm2 install pm2-logrotate`
[documentation](https://github.com/keymetrics/pm2-logrotate)
