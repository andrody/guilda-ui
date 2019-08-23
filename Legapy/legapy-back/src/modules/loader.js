/*
 * Varre diretórios "baseDir + categoryName"
 * faz require de todos os arquivos em seu interior
 * carregando todos os módulos de "baseDir + categoryName" em app
 *
 * cwd: Diretório raiz onde as pastas "resources" estarão
 *  ex: {cwd: __dirname}
 *  
 * Resultado esperado:
 *  app.models.user
 *  app.models.room
 *  app.controllers.userApiController
 *  app.routes.userApiRoute
 *  etc.
 *
 */

const fs = require('fs')

let baseDir = './'

const loadRsourcesFiles = (destine, categoryName, async, barChar) => {
    let fileName = null
    let filesDir = null
    let filesArray = []

    if (baseDir[baseDir.length - 1] !== barChar) {
        baseDir += barChar
    }

    filesDir = baseDir + categoryName + barChar

    if (!destine[categoryName]) {
        destine[categoryName] = {}
    }

    if (async) {
        fs.readdir(filesDir, (err, files) => {

            if (err) {
                console.error(`There was an error reading the directory ${filesDir}`)
                return
            }

            files.forEach((file) => {
                fileName = file.split('.')[0]
                destine[categoryName][fileName] = require(filesDir + fileName)
            })

            return
        })
    } else {
        try {
            filesArray = fs.readdirSync(filesDir)

            filesArray.forEach((file) => {
                fileName = file.split('.')[0]
                destine[categoryName][fileName] = require(filesDir + fileName)
            })

            return
        } catch (err) {
            console.error(`There was an error reading the directory ${filesDir}`)
            console.log(err)
            return
        }
    }
}

exports.loadRerourcesInto = (app, options) => {
    const barChar = /^win/.test(process.platform) ? '\\' : '/'

    if (options && options.cwd) {
        baseDir = options.cwd
    }

    if (options && options.resources && Array.isArray(options.resources)) {
        options.resources.forEach((category) => {
            loadRsourcesFiles(app, category, options.async, barChar)
        })
    } else {
        loadRsourcesFiles(app, 'models', options.async, barChar)
        loadRsourcesFiles(app, 'controllers', options.async, barChar)
    }
}