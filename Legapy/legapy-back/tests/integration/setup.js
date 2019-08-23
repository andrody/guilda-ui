/* global beforeEach */

const supertest = require('supertest')
const chai = require('chai')

// process.env.TARGET_DATABASE = 'GanhoMaisPreProducao'

beforeEach(async () => {
    try {
        await require('../../server/index.js', { bustCache: true })((server) => {
            global.server = server
            global.request = supertest(server)
        })
    } catch (e) {
        console.log('- Erro no beforeEach')
    }
})

global.expect = chai.expect
global.should = chai.should

