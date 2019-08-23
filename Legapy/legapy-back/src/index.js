/*
 * Requisitando dependências
 */

const config = require('./config')
const express = require('express')
const http = require('http')
const expressSetup = require('./express.js')


require('express-async-errors')


const app = express()
const server = http.createServer(app)

const setupServer = async (callback) => {
    console.log(`[Working in ${config.env} mode]`)

    /*
     * Configura o express
     */

    app.set('port', config.port)
    app.rootDir = __dirname
    await expressSetup(app, express, __dirname)

    callback(server)
}

module.exports = setupServer
