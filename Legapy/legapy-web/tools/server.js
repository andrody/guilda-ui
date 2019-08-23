const server = require('pushstate-server')

console.log('[Trying Running on port ' + (process.env.PORT || '4000') + ']')
server.start({
    port: process.env.PORT || 4000,
    directory: './dist',
})
