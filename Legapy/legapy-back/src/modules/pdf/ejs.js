const ejs = require('ejs')
var pdfMaker = require('pdf-maker');
 
var template = './contracheque.ejs';
var data = {
    company: 'Fortal Empreendimentos',
    cnpj: '83.703.323/0001-79',
    date: '11/2017',
    register: 123456789,
    name: 'Romério de Sousa Lima Love',
    emmitDate: '11/2017',
    job: 'Desenvolvedor Koruja Sofware Studios',
    ctps: '00000000/0000-00',
    place: 'Av. Humberto Monte, 2929 - Pici, Fortaleza - CE, 60440-593, 402B Torre Sul.',
    pay: 'R$ 4.440,57',
    baseFGTS: 'R$ 3.996,00',
    baseIR: 'R$ 996,00',
    totalEarnings: 'R$ 4.440,57',
    totalOff: 'R$ 496,30',
    fgts: 'R$ 1996,00',
    contribution: 'R$ 96,00',
    netValue: 'R$ 4.440,57',
    message: 'Omae wa mou shindeiru..... NANI!!??',
    details: [
        {
            code: 101,
            type: '',
            reference: '25D',
            earnings: 'R$ 3.540,60',
            off: '2.4%'
        },
        {
            code: 102,
            type: 'Salário',
            reference: '28D',
            earnings: 'R$ 4.140,60',
            off: '1.2%'
        },
        {
            code: 105,
            type: 'INSS',
            reference: '20D',
            earnings: 'R$ 140,60',
            off: '0.5%'
        },
        {
            code: '',
            type: '',
            reference: '',
            earnings: '',
            off: ''
        },
        {
            code: '',
            type: '',
            reference: '',
            earnings: '',
            off: ''
        },
        {
            code: '',
            type: '',
            reference: '',
            earnings: '',
            off: ''
        },
        {
            code: '',
            type: '',
            reference: '',
            earnings: '',
            off: ''
        },
        {
            code: '',
            type: '',
            reference: '',
            earnings: '',
            off: ''
        },
    ]
}
var pdfPath = './file.pdf';
var option = {
    
        paperSize: {
            format: 'A4',
            orientation: 'portrait',
            border: '0cm'
        }
    
}
 
pdfMaker(template, data, pdfPath, option);