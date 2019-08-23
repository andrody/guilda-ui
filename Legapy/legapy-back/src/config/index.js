let PORT = null

const ports = {
    production: '3000',
    staging: '3000',
    development: '3000',
}

const hosts = {
    production: 'http://www.legapy.com.py',
    staging: 'http://www.legapy.com.py',
    development: 'http://localhost',
}

PORT = ports[process.env.NODE_ENV || 'development']

const config = Object.create(null, {
    systemIsSet: {
        value: true,
    },
    database: {
        value: {
            name: 'Legapy',
            host: '167.99.239.43',
            user: 'sa',
            password: 'ko@12345',
        },
    },
    port: {
        value: PORT,
    },
    secret: {
        value: process.env.TOKEN_AUTH_SECRET || 'skladjlkjahsjkdhsajklhdjkas',
    },
    algorithm: {
        value: ['HS256'],
    },
    tokenTime: {
        value: '9999h', // 416 dias
    },
    host: {
        value: `${hosts[process.env.NODE_ENV || 'development']}:${PORT}/`,
    },
    env: {
        value: process.env.NODE_ENV || 'development',
    },
})

Object.freeze(config) // enumerable = writable = configurable = false

module.exports = config
