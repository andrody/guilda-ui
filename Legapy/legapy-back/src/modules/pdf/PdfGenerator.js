const pdfMaker = require('./pdf-maker')
const Utils = require('../../auxiliary/Utils')
const moment = require('moment')
const host = require('../../config').host

const generateFileName = (IDMatricula, DTCompetencia) => {
    const sDate = moment(DTCompetencia).format('MM_YYYY')

    return `${IDMatricula}_${sDate}.pdf`
}

const getLogoUrl = (empresa) => {
    const empresaCodigo = empresa.substring(0, 3) || ''

    return `${host}${empresaCodigo}.jpg`
}

const generateVoContraCheque = (contracheque) => {
    const BaseCalcFGTS = contracheque.ContraCHequeSalarioBase.BaseCalcFGTS
    const BaseCalcIRRF = contracheque.ContraCHequeSalarioBase.BaseCalcIRRF
    const FGTSMes = contracheque.ContraCHequeSalarioBase.FGTSMes
    const SalarioBase = contracheque.ContraCHequeSalarioBase.SalarioBase
    const SalContribINSS = contracheque.ContraCHequeSalarioBase.SalContribINSS

    contracheque.DTCompetencia = moment(contracheque.DTCompetencia).add('4', 'hours').toDate()

    let competenciaTemp = moment(contracheque.DTCompetencia).format('DD/MM')
    if (competenciaTemp === '02/12') {
        competenciaTemp = '13o/' + moment(contracheque.DTCompetencia).format('YYYY')
    } else {
        competenciaTemp = moment(contracheque.DTCompetencia).format('MM/YYYY')
    }

    const vo = {
        Empresa: contracheque.Empresa || ' ',
        CNPJ: contracheque.CNPJ || ' ',
        DTAdmissao: moment(contracheque.DTAdmissao).format('MM/YYYY') || ' ',
        IDMatricula: contracheque.Matricula ? contracheque.Matricula.NRMatricula : ' ',
        Nome: contracheque.Nome || ' ',
        DTCompetencia: competenciaTemp || ' ',
        Funcao: contracheque.Funcao || ' ',
        CTPS: contracheque.CTPS || ' ',
        Endereco: contracheque.Endereco || ' ',
        Mensagem: '...',
        ContraChequeSalarioBase: {
            BaseCalcFGTS: Utils.formatCurrency(BaseCalcFGTS) || ' ',
            BaseCalcIRRF: Utils.formatCurrency(BaseCalcIRRF) || ' ',
            FGTSMes: Utils.formatCurrency(FGTSMes) || ' ',
            totalEarnings: Utils.formatCurrency(SalarioBase) || ' ',
            SalarioBase: Utils.formatCurrency(SalarioBase) || ' ',
            SalContribINSS: Utils.formatCurrency(SalContribINSS) || ' ',
        },
        lsVOContraChequeDetalhe: [],
        logo: getLogoUrl(contracheque.Empresa), // 'http://localhost:3000/027.jpg',
        /* lsVOContraChequeDetalhe: [
            {
                CdVerba: 101,
                Descricao: '',
                Referencia: '25D',
                Vencimentos: 'R$ 3.540,60',
                Descontos: '2.4%',
            },
            {
                CdVerba: 102,
                Descricao: 'Salário',
                Referencia: '28D',
                Vencimentos: 'R$ 4.140,60',
                Descontos: '1.2%',
            },
            {
                CdVerba: 105,
                Descricao: 'INSS',
                Referencia: '20D',
                Vencimentos: 'R$ 140,60',
                Descontos: '0.5%',
            },
            {
                CdVerba: '',
                Descricao: '',
                Referencia: '',
                Vencimentos: '',
                Descontos: '',
            },
            {
                code: '',
                Descricao: '',
                Referencia: '',
                Vencimentos: '',
                Descontos: '',
            },
            {
                CdVerba: '',
                Descricao: '',
                Referencia: '',
                Vencimentos: '',
                Descontos: '',
            },
            {
                CdVerba: '',
                Descricao: '',
                Referencia: '',
                Vencimentos: '',
                Descontos: '',
            },
            {
                CdVerba: '',
                Descricao: '',
                Referencia: '',
                Vencimentos: '',
                Descontos: '',
            },
        ],*/
    }

    contracheque.ContraCHequeDetalhe.forEach((item) => {
        if (!item.CdVerba && !item.Referencia && item.Descricao && item.Vencimentos !== 0) {
            vo.Mensagem = item.Descricao || '...'
            vo.ContraChequeSalarioBase.totalEarnings = Utils.formatCurrency(item.Vencimentos) || ' '
            vo.ContraChequeSalarioBase.totalOff = Utils.formatCurrency(item.Descontos) || ' '
            vo.ContraChequeSalarioBase.netValue = Utils.formatCurrency(item.Vencimentos - item.Descontos) || ' '
        } else {
            vo.lsVOContraChequeDetalhe.push({
                CdVerba: item.CdVerba || ' ',
                Descricao: item.Descricao || ' ',
                Referencia: item.Referencia || ' ',
                Vencimentos: item.Vencimentos ? Utils.formatCurrency(item.Vencimentos) : ' ',
                Descontos: item.Descontos ? Utils.formatCurrency(item.Descontos) : ' ',
            })
        }
    })

    return vo
}

class PdfGenerator {
    constructor() {
        this.template = Utils.createFilePath([__dirname, 'contracheque.ejs'])
        this.option = {
            paperSize: {
                format: 'A4',
                orientation: 'portrait',
                border: '0cm',
            },
        }
    }

    async generatePdf(contracheque, cb) {
        try {
            const filename = generateFileName(contracheque.IDMatricula, contracheque.DTCompetencia)
            const vo = generateVoContraCheque(contracheque)
            const pdfPath = Utils.createFilePath([Utils.createFilePath(['server', 'public']), filename])

            await pdfMaker(this.template, vo, pdfPath, this.option)

            return cb(null, { link: host + filename })
        } catch (e) {
            console.log('## err')
            return cb(e)
        }
    }
}

module.exports = PdfGenerator
