const src = process.env.SOURCE_ENV || 'src'
const config = require(`./${src}/config`)
const serverSetup = require(`./${src}`)
const Constants = require(`./${src}/auxiliary/Constants`)

Constants.rootSystemDir = __dirname

if (config.systemIsSet) {
    if (!process.env.TEST_ON) {
        serverSetup((server) => {
            server.listen(config.port, () => {
                console.log('Express server listening on port ' + config.port)
            })
        })
    }
} else {
    console.log('\x1b[41m', '[Error: Missing environment variables. Exiting]', '\x1b[0m')
    process.exit(1)
}

module.exports = serverSetup
