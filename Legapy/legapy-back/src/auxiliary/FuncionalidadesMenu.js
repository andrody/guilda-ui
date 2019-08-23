const isProduction = process.env.NODE_ENV === 'production'

const dev = {
    OCORRENCIAS: 21, /* {
        ID: 21,
        GRUPO: 3,
    },*/
    OCORRENCIAS_TRIAGEM: 22, /* {
        ID: 22,
        GRUPO: 3,
    },*/
    OCORRENCIAS_MEUS_ATENDIMENTOS: 23, /* {
        ID: 23,
        GRUPO: 3,
    },*/
    SOLICITACOES: 24, /* {
        ID: 24,
        GRUPO: 3,
    },*/
    SOLICITACOES_ATENDIMENTO_SIMULACAO: 25, /* {
        ID: 25,
        GRUPO: 3,
    },*/
    SOLICITACOES_ATENDIMENTO_CLIENTE: 26, /* {
        ID: 26,
        GRUPO: 3,
    },*/
    PERFIL: 27, /* {
        ID: 27,
        GRUPO: 3,
    },*/
    PERFIL_GERENCIAR: 28, /* {
        ID: 28,
        GRUPO: 3,
    },*/
    USUARIO: 29, /* {
        ID: 29,
        GRUPO: 3,
    },*/
    USUARIO_GERENCIAR: 30, /* {
        ID: 30,
        GRUPO: 3,
    },*/
    USUARIO_LIBERACAO: 31, /* {
        ID: 31,
        GRUPO: 3,
    },*/
    IMPORTACAO: 32, /* {
        ID: 32,
        GRUPO: 3,
    },*/
    IMPORTACAO_SPC: 33, /* {
        ID: 33,
        GRUPO: 3,
    },*/
    IMPORTACAO_CONTRA_CHEQUE: 34, /* {
        ID: 34,
        GRUPO: 3,
    },*/
    IMPORTACAO_COBRANCA: 35, /* {
        ID: 35,
        GRUPO: 3,
    },*/
    NOTICACAO: 73, /* {
        ID: 73,
        GRUPO: 4,
    },*/
    NOTICACAO_NOTIFICAR: 74, /* {
        ID: 74,
        GRUPO: 4,
    },*/
    DASHBOARD: 75, /* {
        ID: 75,
        GRUPO: 3,
    },*/
    DASHBOARD_DASHBOARD: 76, /* {
        ID: 76,
        GRUPO: 3,
    },*/
    USUARIO_APP: 78, /* {
        ID: 29,
        GRUPO: 3,
    },*/
    USUARIO_APP_GERENCIAR: 79, /* {
        ID: 30,
        GRUPO: 3,
    },*/
}

const production = {
    OCORRENCIAS: 21, /* {
        ID: 21,
        GRUPO: 3,
    },*/
    OCORRENCIAS_TRIAGEM: 22, /* {
        ID: 22,
        GRUPO: 3,
    },*/
    OCORRENCIAS_MEUS_ATENDIMENTOS: 23, /* {
        ID: 23,
        GRUPO: 3,
    },*/
    SOLICITACOES: 24, /* {
        ID: 24,
        GRUPO: 3,
    },*/
    SOLICITACOES_ATENDIMENTO_SIMULACAO: 25, /* {
        ID: 25,
        GRUPO: 3,
    },*/
    SOLICITACOES_ATENDIMENTO_CLIENTE: 26, /* {
        ID: 26,
        GRUPO: 3,
    },*/
    PERFIL: 27, /* {
        ID: 27,
        GRUPO: 3,
    },*/
    PERFIL_GERENCIAR: 28, /* {
        ID: 28,
        GRUPO: 3,
    },*/
    USUARIO: 29, /* {
        ID: 29,
        GRUPO: 3,
    },*/
    USUARIO_GERENCIAR: 30, /* {
        ID: 30,
        GRUPO: 3,
    },*/
    USUARIO_LIBERACAO: 31, /* {
        ID: 31,
        GRUPO: 3,
    },*/
    IMPORTACAO: 32, /* {
        ID: 32,
        GRUPO: 3,
    },*/
    IMPORTACAO_SPC: 33, /* {
        ID: 33,
        GRUPO: 3,
    },*/
    IMPORTACAO_CONTRA_CHEQUE: 34, /* {
        ID: 34,
        GRUPO: 3,
    },*/
    IMPORTACAO_COBRANCA: 35, /* {
        ID: 35,
        GRUPO: 3,
    },*/
    NOTICACAO: 73, /* {
        ID: 73,
        GRUPO: 4,
    },*/
    NOTICACAO_NOTIFICAR: 74, /* {
        ID: 74,
        GRUPO: 4,
    },*/
    DASHBOARD: 75, /* {
        ID: 75,
        GRUPO: 3,
    },*/
    DASHBOARD_DASHBOARD: 76, /* {
        ID: 76,
        GRUPO: 3,
    },*/
    USUARIO_APP: 78, /* {
        ID: 29,
        GRUPO: 3,
    },*/
    USUARIO_APP_GERENCIAR: 79, /* {
        ID: 30,
        GRUPO: 3,
    },*/
}

module.exports = isProduction ? production : dev
