const GenericErrors = {
    MISSING_FIELD: {
        CODE: 'MISSING_FIELD',
        STATUS: 400,
        MESSAGE: 'Faltando campos',
        TITLE: 'Alguns campos estão faltando',
    },
    NOT_FOUND: {
        CODE: 'NOT_FOUND',
        STATUS: 404,
        MESSAGE: 'Não encontrado',
        TITLE: 'Não encontrado',
    },
}

const ImportsErrors = {
    IMPORT_VALIDATION_ERROR: {
        CODE: 'IMPORT_VALIDATION_ERROR',
        STATUS: 400,
        MESSAGE: 'Faltando campos',
        TITLE: 'Alguns campos estão faltando',
    },
}

const ErrorsConstants = {
    ...GenericErrors,
    ...ImportsErrors,
    GENERIC_ERROR: {
        CODE: 'GENERIC_ERROR',
        STATUS: 400,
        MESSAGE: 'Erro genérico',
        TITLE: 'Erro genérico',
    },
    BAD_REQUEST: {
        CODE: 'BAD_REQUEST',
        STATUS: 400,
        MESSAGE: 'Erro na requisição',
        TITLE: 'Erro na requisição',
    },
    NOT_FOUND: {
        CODE: 'NOT_FOUND',
        STATUS: 404,
        MESSAGE: 'Não encontrado',
        TITLE: 'Não encontrado',
    },
    USER_NOT_FOUND: {
        CODE: 'USER_NOT_FOUND',
        STATUS: 404,
        MESSAGE: 'Usuário não encontrado',
        TITLE: 'Usuário não encontrado',
    },
    PERSON_NOT_FOUND: {
        CODE: 'PERSON_NOT_FOUND',
        STATUS: 404,
        MESSAGE: 'Pessoa não encontrada',
        TITLE: 'Pessoa não encontrada',
    },
    COMPANY_NOT_FOUND: {
        CODE: 'COMPANY_NOT_FOUND',
        STATUS: 404,
        MESSAGE: 'Empresa não encontrada',
        TITLE: 'Empresa não encontrad',
    },
    PERSON_COMPANY_NOT_FOUND: {
        CODE: 'PERSON_COMPANY_NOT_FOUND',
        STATUS: 404,
        MESSAGE: 'Não foi encontrada empresa para o usuário',
        TITLE: 'EmpresaPessoa não encontrada',
    },
    SOLICITATIONS_NOT_FOUND: {
        CODE: 'SOLICITATIONS_NOT_FOUND',
        STATUS: 404,
        MESSAGE: 'Solicitações não encontradas',
        TITLE: 'Solicitations not found',
    },
    REGISTRY_NOT_FOUND: {
        CODE: 'REGISTRY_NOT_FOUND',
        STATUS: 404,
        MESSAGE: 'Matrícula não encontrada',
        TITLE: 'Matrícula não encontrada',
    },
    SERVICE_NOT_FOUND: {
        CODE: 'SERVICE_NOT_FOUND',
        STATUS: 404,
        MESSAGE: 'Serviço não encontrado',
        TITLE: 'Serviço não encontrado',
    },
    PLATAFORM_SERVICE_NOT_FOUND: {
        CODE: 'PLATAFORM_SERVICE_NOT_FOUND',
        STATUS: 404,
        MESSAGE: 'Serviço Plataforma não encontrado',
        TITLE: 'Serviço Plataforma não encontrado',
    },
    PLATAFORM_SERVICE_PARAMETER_NOT_FOUND: {
        CODE: 'PLATAFORM_SERVICE_PARAMETER_NOT_FOUND',
        STATUS: 404,
        MESSAGE: 'Serviço Plataforma Parâmetro não encontrado',
        TITLE: 'Plataform Service Parameter not found',
    },
    PLATAFORM_SERVICE_CONSTRUCTOR_NOT_FOUND: {
        CODE: 'PLATAFORM_SERVICE_CONSTRUCTOR_NOT_FOUND',
        STATUS: 404,
        MESSAGE: 'Serviço Plataforma Construtor não encontrado',
        TITLE: 'Plataform Service Constructor not found',
    },
    PLATAFORM_AUTORIZATION_NOT_FOUND: {
        CODE: 'PLATAFORM_AUTORIZATION_NOT_FOUND',
        STATUS: 404,
        MESSAGE: 'Plataforma Autorização não encontrado',
        TITLE: 'Plataform Autorization not found',
    },
    SOLICIT_SAVE_ERROR: {
        CODE: 'SOLICIT_SAVE_ERROR',
        STATUS: 400,
        MESSAGE: 'Erro ao tentar solicitar',
        TITLE: 'Erro ao tentar solicitar',
    },
    GENERATE_PDF_ERROR: {
        CODE: 'GENERATE_PDF_ERROR',
        STATUS: 400,
        MESSAGE: 'Erro ao gerar pdf',
        TITLE: 'Erro ao gerar pdf',
    },
    IMPORTATION_FILE_SAVE_ERROR: {
        CODE: 'IMPORTATION_FILE_SAVE_ERROR',
        STATUS: 400,
        MESSAGE: 'Erro ao tentar salvar arquivo de importação',
        TITLE: 'Erro ao tentar salvar arquivo de importação',
    },
    APROVE_IMPORTATION_ERROR: {
        CODE: 'APROVE_IMPORTATION_ERROR',
        STATUS: 400,
        MESSAGE: 'Erro ao tentar aprovar a importação',
        TITLE: 'Erro ao tentar aprovar a importação',
    },
    GET_CONDITIONS_ERROR: {
        CODE: 'GET_CONDITIONS_ERROR',
        STATUS: 400,
        MESSAGE: 'Erro ao obter condições',
        TITLE: 'Erro ao obter condições',
    },
    NO_CONDITIONS_FOUND: {
        CODE: 'NO_CONDITIONS_FOUND',
        STATUS: 400,
        MESSAGE: 'Nenhuma condição encontrada',
        TITLE: 'Nenhuma condição encontrada',
    },
    MATRICULA_NOT_FOUND: {
        CODE: 'MATRICULA_NOT_FOUND',
        STATUS: 404,
        MESSAGE: 'Usuário não possui acesso ao sistemas do Aval',
        TITLE: 'Matrícula não encontrada',
    },
    USER_HAS_NO_REGISTRY: {
        CODE: 'USER_HAS_NO_REGISTRY',
        STATUS: 404,
        MESSAGE: 'Usuário não possui matrícula.',
        TITLE: 'Matrícula não encontrada',
    },
    GET_PERFIL_ERROR: {
        CODE: 'GET_PERFIL_ERROR',
        STATUS: 404,
        MESSAGE: 'Erro ao obter perfil',
        TITLE: 'Erro ao obter perfil',
    },
    PERFIL_NOT_FOUND: {
        CODE: 'PERFIL_NOT_FOUND',
        STATUS: 404,
        MESSAGE: 'Usuário não possui perfil para acessar o sistema. Entre em contato com o Gestor.',
        TITLE: 'Perfil não encontrada',
    },
    COMPANY_INCONSISTENCY: {
        CODE: 'COMPANY_INCONSISTENCY',
        STATUS: 404,
        MESSAGE: 'Empresa não encontrada. Por favor, contacte o suporte.',
        TITLE: 'Empresa não encontrada',
    },
    PARTNERS_NOT_FOUND: {
        CODE: 'PARTNERS_NOT_FOUND',
        STATUS: 404,
        MESSAGE: 'Nenhum convênio foi encontrado',
        TITLE: 'Convênio não encontrado',
    },
    CONTRACHEQUE_NOT_FOUND: {
        CODE: 'CONTRACHEQUE_NOT_FOUND',
        STATUS: 404,
        MESSAGE: 'Não há contra-cheque disponível para este servidor no período',
        TITLE: 'Contra cheque não encontrado',
    },
    IMPORTS_NOT_FOUND: {
        CODE: 'IMPORTS_NOT_FOUND',
        STATUS: 404,
        MESSAGE: 'Nenhuma importação encontrada',
        TITLE: 'NotFound',
    },
    RECORDS_NOT_FOUND: {
        CODE: 'RECORDS_NOT_FOUND',
        STATUS: 404,
        MESSAGE: 'Nenhum registro encontrado',
        TITLE: 'NotFound',
    },
    CPF_NOT_FOUND: {
        CODE: 'CPF_NOT_FOUND',
        STATUS: 404,
        MESSAGE: 'CPF não existente',
        TITLE: 'CPF Not found',
    },
    INVALID_CPF: {
        CODE: 'INVALID_CPF',
        STATUS: 401,
        MESSAGE: 'CPF inválido',
        TITLE: 'CPF inválido',
    },
    INVALID_TOKEN: {
        CODE: 'INVALID_TOKEN',
        STATUS: 401,
        MESSAGE: 'El token no es válido o caducado',
        TITLE: 'Token inválido',
    },
    INVALID_SMS_CODE: {
        CODE: 'INVALID_SMS_CODE',
        STATUS: 400,
        MESSAGE: 'Código inválido',
        TITLE: 'Invalid sms code',
    },
    PASSWORD_NOT_EQUAL: {
        CODE: 'PASSWORD_NOT_EQUAL',
        STATUS: 400,
        MESSAGE: 'Passwords não são iguais',
        TITLE: 'Password are not equal',
    },
    INVALID_BIRTHDAY: {
        CODE: 'INVALID_BIRTHDAY',
        STATUS: 400,
        MESSAGE: 'Data de nascimento inválida',
        TITLE: 'Data de nascimento inválida',
    },
    INVALID_DATE: {
        CODE: 'INVALID_DATE',
        STATUS: 400,
        MESSAGE: 'Data inválida',
        TITLE: 'Data inválida',
    },
    INVALID_PARAMETER: {
        CODE: 'INVALID_PARAMETER',
        STATUS: 400,
        MESSAGE: 'Parâmetro inválido',
        TITLE: 'Invalid parameter',
    },
    INVALID_SOLICITACAO_STATUS: {
        CODE: 'INVALID_SOLICITACAO_STATUS',
        STATUS: 400,
        MESSAGE: 'Status inválido',
        TITLE: 'Status invalid',
    },
    EMAIL_EXISTS: {
        CODE: 'EMAIL_EXISTS',
        STATUS: 400,
        MESSAGE: 'Esse e-mail já existe',
        TITLE: 'Email already exists',
    },
    FORGOT_PASSWORD_ERROR: {
        CODE: 'FORGOT_PASSWORD_ERROR',
        STATUS: 400,
        MESSAGE: 'Erro ao enviar e-mail para resetar senha',
        TITLE: 'Erro ao enviar e-mail',
    },
    FACEID_EXISTS: { // não deveria ser um "user already exists?"
        CODE: 'FACEID_EXISTS',
        STATUS: 400,
        MESSAGE: 'Esse face id já existe',
        TITLE: 'Face id already exists',
    },
    FACELOGIN_ERROR: {
        CODE: 'FACELOGIN_ERROR',
        STATUS: 400,
        MESSAGE: 'Falha ao logar com Facebook',
        TITLE: 'Facebook sign in failed',
    },
    GOOGLELOGIN_ERROR: {
        CODE: 'GOOGLELOGIN_ERROR',
        STATUS: 400,
        MESSAGE: 'Falha ao logar com Goole',
        TITLE: 'Google sign in failed',
    },
    GOOGLE_EXISTS: { // não deveria ser um "user already exists?"
        CODE: 'GOOGLE_EXISTS',
        MESSAGE: 'Esse google id já existe',
        TITLE: 'Google id already exists',
        STATUS: 400,
    },
    USER_ALREADY_EXISTS: {
        CODE: 'USER_ALREADY_EXISTS',
        STATUS: 400,
        MESSAGE: 'Usuário já existente',
        TITLE: 'Usuário já existente',
    },
    OPERATOR_DISABLE: {
        CODE: 'OPERATOR_DISABLE',
        STATUS: 401,
        MESSAGE: 'Operador está desabilitado. Por favor entre em contato com nosso suporte para mais detalhes',
        TITLE: 'Operador está desabilitado',
    },
    ERROR_TO_CREATE_OPERATOR_OR_SOLICITATION: {
        CODE: 'ERROR_TO_CREATE_OPERATOR_OR_SOLICITATION',
        STATUS: 400,
        MESSAGE: 'Erro ao criar operador ou solicitação',
        TITLE: 'Erro ao criar operador ou solicitação',
    },
    INCORRECT_USERNAME_OR_PASSWORD: {
        CODE: 'INCORRECT_USERNAME_OR_PASSWORD',
        STATUS: 401,
        MESSAGE: 'Email o contraseña incorrecta',
        TITLE: 'Incorrect cpf or password.',
    },
    INCORRECT_PASSWORD: {
        CODE: 'INCORRECT_PASSWORD',
        STATUS: 401,
        MESSAGE: 'Contraseña Incorrecta',
        TITLE: 'Incorrect password.',
    },
    USER_DESACTIVATED: {
        CODE: 'USER_DESACTIVATED',
        STATUS: 401,
        MESSAGE: 'Esse usuário não tem permissão para logar.',
        TITLE: 'User not allowed to login.',
    },
    UNAUTHORIZED: {
        CODE: 'UNAUTHORIZED',
        STATUS: 401,
        MESSAGE: 'Não autorizado',
        TITLE: 'Unauthorized',
    },
    UNAUTHORIZED_PERFIL: {
        CODE: 'UNAUTHORIZED_PERFIL',
        STATUS: 401,
        MESSAGE: 'Perfil não autorizado',
        TITLE: 'Unauthorized Perfil',
    },
    PERFIL_DISABLED: {
        CODE: 'PERFIL_DISABLED',
        STATUS: 401,
        MESSAGE: 'Perfil desabilitado',
        TITLE: 'Perfil desabilitado',
    },

    NO_MARGIN_AVAILABLE: {
        CODE: 'NO_MARGIN_AVAILABLE',
        STATUS: 401,
        TITLE: 'Não existe margem disponível',
        MESSAGE: 'Não existe margem disponível',
    },

    // AVAL
    AVAL_USER_NO_MARGIN: {
        CODE: 'UNAUTHORIZED_PERFIL',
        STATUS: 404,
        MESSAGE: 'Usuário não possui acesso ao sistemas do Aval!',
        TITLE: 'Não conseguiu acesso ao sistema de margem!',
    },

    // PMF
    PMF_PASSWORD_OUTDATED: {
        CODE: 'PMF_PASSWORD_OUTDATED',
        STATUS: 404,
        MESSAGE: 'Senha de convenio desatualizada',
        TITLE: 'PMF password outdated',
    },
}

module.exports = ErrorsConstants
