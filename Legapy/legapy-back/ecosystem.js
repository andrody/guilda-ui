module.exports = {
    apps: [
        {
            name: 'LegapyServer',
            script: 'app.js',
            env: {
                NODE_ENV: 'production',
                SOURCE_ENV: 'dist',
            },
        },
    ],

    deploy: {
        production: {
            user: 'andrody',
            host: '191.232.188.100',
            ref: 'origin/master',
            repo: 'git@bitbucket.org:koruja/legapy-back.git',
            path: '/',
            'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
            env: {
                SOURCE_ENV: 'dist',
                NODE_ENV: 'development',
            },
        },
        dev: {
            user: 'andrody',
            host: '191.232.188.100',
            ref: 'origin/dev',
            repo: 'git@bitbucket.org:koruja/legapy-back.git',
            path: '/',
            'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env dev',
            env: {
                SOURCE_ENV: 'dist',
                NODE_ENV: 'development',
            },
        },
    },
}
