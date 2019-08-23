import { observable, action } from 'mobx'
import API from '../utils/API'
import { CONTACT_US } from '../utils/constants'

class LandingStore {
    @observable languagePack
    @observable currentLanguage
    @observable model
    @observable activeBtn
    constructor() {
        this.model = {
            title: '',
            email: '',
            message: '',
        }
        this.activeBtn = 0
        this.currentLanguage = 'ES'
        this.languagePack = {
            ES: {
                landing: {
                    title: 'Es ley estar actualizado.',
                },
                nav: {
                    aboutUs: 'Quíenes somos',
                    func: 'Funcionalidades',
                    download: 'Descargue ya',
                    Support: 'Suporte',
                    contact: 'Contactese con nostros',
                    login: 'login',
                },
                aboutUs: {
                    title: 'Quiénes somos',
                    body: {
                        left: {
                            title: 'Toda la legislación paraguaya en la palma de su mano',
                            p1: 'LegaPy es un aplicativo simples e innovador que te ayuda a encontrar todas las leyes del Paraguay con la practicidad y la agilidad que usted necesita.',
                            p2: 'Con fue Con fuentes confiables y actualizadas diariamente, la app fue creada especialmente para facilitar la vida de profesionales y estudiantes de Derecho.',
                            p3: 'La solución sobre medida para atender las demandas de un país en constante crecimiento y que se moderniza constantemente, cada día más. Descubra y vea como Legapy puede mudar su día a día.',
                        },
                        right: {
                            title: 'LegaPy é feito para:',
                            item1: 'Estudiantes',
                            item2: 'Emprendedor',
                            item3: 'Jueces',
                            item4: 'Inversionistas',
                            item5: 'Abogados',
                            item6: 'Promotores',
                            item7: 'Defensores',
                            item8: 'Escribanos',
                            item9: 'Ciudadanos en busca de acceso fácil e inteligente a la legislación',
                        },
                    },
                },
                funcionalidades: {
                    title: 'Funcionalidades',
                    left: {
                        title: 'LegaPy es conocimento accesivle, moderno e inteligente.',
                        p: ['// Navegacion simples e intuitiva', '// Actualizacion diaria', '// Acesso a todo el contenido normativo del pais,desde lo antiguo al más reciente'],
                        footer: [
                            {
                                title: 'Busqueda ultrafácil',
                                subtitle: 'Rápidamente encuentre las leyes que busca digitando su número en el campo de busca.',
                                icon: 'lupa',
                            },
                            {
                                title: 'Favorite cualquier legislación',
                                subtitle: 'Guarde las leyes que cree importante y accese en modo offline.',
                                icon: 'favorite',
                            },
                            {
                                title: 'Adicione comentarios',
                                subtitle: 'Sus notas también tienen espacio! Adicione notas y marcaciones sin la necesidad de compartir con los demás usuarios.',
                                icon: 'comment',
                            },
                            {
                                title: 'Personalice su texto',
                                subtitle: 'Grife, negrite, cambie de color y destaque lo que fuere más importante en su investigación.',
                                icon: 'edit',
                            },
                        ],
                    },
                },
                download: {
                    title: 'Descargue ya!',
                    subtitle: 'Descargue ya y pruebe gratis por 15 días',
                    items: [
                        {
                            name: 'Mensual',
                            price: 'US$ 2,99',
                        },
                        {
                            name: 'Semestral',
                            price: 'US$ 14,99',
                        },
                        {
                            name: 'Anual',
                            price: 'US$ 24,99',
                        },
                    ],
                },
                terms: {
                    title: 'Terminos de uso',
                },
                privacy: {
                    title: 'Política de privacidad',
                },
                support: {
                    title: 'Soporte',
                    subtitle: 'Surgió alguna duda sobre cómo utilizar mejor el aplicativo?',
                    description: 'Echa un vistazo a los tutoriales y vea cómo usar LegaPy es más fácil aún de lo que usted se imagina',
                },
                contact: {
                    title: 'Contáctese con nosotros',
                    subtitle: 'Envíe sus dudas y sugestiones para LegaPy!',
                    description: 'Su opinión hace mucha diferencia para que tengamos una app cada día más perfeccionado y de acuerdo a sus necesidades.',
                    form: {
                        name: 'Nombre',
                        email: 'E-mail',
                        message: 'Mensaje',
                        btn: ['Enviar', 'Enviando', 'Enviado'],
                    },
                },
                login: {
                    title: 'Entrar',
                    email: 'E-mail',
                    password: 'Contraseña',
                    link: 'Olvidaste tu contraseña?',
                    register: 'Crear cuenta',
                    btn: 'Entrar',
                },
                forgotPassword: {
                    title: 'Olvidé la contraseña',
                    email: 'E-mail',
                    btn: 'Enviar Código',
                },
                resetPassword: {
                    title: 'Restaurar contraseña',
                    email: 'E-mail',
                    newPassword: 'Nueva contraseña',
                    RepeatedPassword: 'Repetir contraseña',
                    Code: 'Código',
                    btn: 'Restaurar',
                },
                register: {
                    title: 'Crear cuenta',
                    email: 'E-mail',
                    password: 'Contraseña',
                    RepeatedPassword: 'Repetir contraseña',
                    btn: 'Crear',
                },
            },
            PT: {
                landing: {
                    title: 'É lei estar atualizado.',
                },
                nav: {
                    aboutUs: 'Quem somos',
                    func: 'Funcionalidades',
                    download: 'Baixe agora',
                    Support: 'Suporte',
                    contact: 'Fale conosco',
                    login: 'login',
                },
                aboutUs: {
                    title: 'Quem somos',
                    body: {
                        left: {
                            title: 'Toda a legislação paraguaia na palma da sua mão',
                            p1: 'LegaPy é uma aplicação simples e inovadora que ajuda a encontrar todas as leis do Paraguai com a praticidade e agilidade que você precisa.',
                            p2: 'Com fontes confiáveis e atualizadas diariamente, o aplicativo foi criado especialmente para facilitar a vida dos profissionais de direito e estudantes.',
                            p3: 'A solução customizada para atender as demandas de um país em constante crescimento e em constante modernização, a cada dia a mais. Descubra e veja como a Legapy pode movimentar o seu dia a dia.',
                        },
                        right: {
                            title: 'LegaPy é feito para:',
                            item1: 'Estudantes',
                            item2: 'Empreendedores',
                            item3: 'Juízes',
                            item4: 'Investidores',
                            item5: 'Advogados',
                            item6: 'Promotores',
                            item7: 'Defensores',
                            item8: 'Escritores',
                            item9: 'Cidadãos que buscam acesso fácil e inteligente à legislação',
                        },
                    },
                },
                funcionalidades: {
                    title: 'Funcionalidades',
                    left: {
                        title: 'LegaPy é um conhecimento acessível, moderno e inteligente.',
                        p: ['// Navegação simples e intuitiva', '// Atualizações diárias', '// Acesso a todo o conteúdo normativo do país, do antigo ao mais recente'],
                        footer: [
                            {
                                title: 'Busca ultra fácil',
                                subtitle: 'Encontre rapidamente as leis que procura, inserindo o seu número no campo de pesquisa.',
                                icon: 'lupa',
                            },
                            {
                                title: 'Favorite qualquer legislação',
                                subtitle: 'Mantenha as leis que você considera importantes e acesse no modo off-line.',
                                icon: 'favorite',
                            },
                            {
                                title: 'Adicione comentários',
                                subtitle: 'Suas anotações também têm espaço! Adicione notas e marcações sem a necessidade de compartilhar com outros usuários.',
                                icon: 'comment',
                            },
                            {
                                title: 'Personalize seu texto',
                                subtitle: 'Grife, negrito, mude de cor e destaque o que foi mais importante em sua pesquisa.',
                                icon: 'edit',
                            },
                        ],
                    },
                },
                download: {
                    title: 'Baixe agora!',
                    subtitle: 'Baixe agora e use de graça por 15 dias',
                    items: [
                        {
                            name: 'Mensal',
                            price: 'US$ 2,99',
                        },
                        {
                            name: 'Semestral',
                            price: 'US$ 14,99',
                        },
                        {
                            name: 'Anual',
                            price: 'US$ 24,99',
                        },
                    ],
                },
                terms: {
                    title: 'Termos de uso',
                },
                privacy: {
                    title: 'Politica de privacidade',
                },
                support: {
                    title: 'Suporte',
                    subtitle: 'Surgiu alguma dúvida de como usar o aplicativo?',
                    description: 'Dê uma olhada nos tutoriais e veja como o uso do LegaPy é ainda mais fácil do que você imagina',
                },
                contact: {
                    title: 'Fale conosco',
                    subtitle: 'Envie suas dúvidas e sugestões para LegaPy!',
                    description: 'Sua opinião faz muita diferença para que tenhamos um aplicativo cada dia mais aperfeiçoado e de acordo com suas necessidades.',
                    form: {
                        name: 'Nome',
                        email: 'E-mail',
                        message: 'Mensagem',
                        btn: ['Enviar', 'Enviando', 'Enviado'],
                    },
                },
                login: {
                    title: 'Entrar',
                    email: 'E-mail',
                    password: 'Senha',
                    link: 'Esqueceu a senha?',
                    register: 'Criar conta',
                    btn: 'Entrar',
                },
                forgotPassword: {
                    title: 'Esqueci a senha',
                    email: 'E-mail',
                    btn: 'Enviar Código',
                },
                resetPassword: {
                    title: 'Restaurar senha',
                    email: 'E-mail',
                    newPassword: 'Nova senha',
                    RepeatedPassword: 'Repetir senha',
                    Code: 'Código',
                    btn: 'Restaurar',
                },
                register: {
                    title: 'Criar conta',
                    email: 'E-mail',
                    password: 'Senha',
                    RepeatedPassword: 'Repetir senha',
                    btn: 'Registrar',
                },
            },
            EN: {
                landing: {
                    title: 'It is law to be up to date.',
                },
                nav: {
                    aboutUs: 'About us',
                    func: 'Functionalities',
                    download: 'Download now',
                    Support: 'Support',
                    contact: 'Contact us',
                    login: 'login',
                },
                aboutUs: {
                    title: 'About us',
                    body: {
                        left: {
                            title: 'All Paraguayan legislation in the palm of your hand',
                            p1: 'LegaPy is a simple and innovative application that helps you find all the laws of Paraguay with the practicality and agility you need.',
                            p2: 'With trusted sources and updated daily, the application was created especially to make life easier for legal professionals and students.',
                            p3: 'The customized solution to meet the demands of a country in constant growth and in constant modernization, every day more. Discover and see how Legacy can move your day to day.',
                        },
                        right: {
                            title: 'LegaPy is made for:',
                            item1: 'Students',
                            item2: 'Entrepreneurs',
                            item3: 'Judges',
                            item4: 'Investors',
                            item5: 'Lawyers',
                            item6: 'Promoters',
                            item7: 'Defenders',
                            item8: 'Writers',
                            item9: 'Citizens seeking smart and easy access to legislation',
                        },
                    },
                },
                funcionalidades: {
                    title: 'Functionalities',
                    left: {
                        title: 'LegaPy is an accessible, modern and intelligent knowledge.',
                        p: ['// Simple and intuitive navigation', '// Daily Updates', '// Access to the entire normative content of the country, from the old to the more recent'],
                        footer: [
                            {
                                title: 'Ultra easy search',
                                subtitle: 'Quickly find the laws you are looking for by entering your number in the search field.',
                                icon: 'lupa',
                            },
                            {
                                title: 'Favorite any legislation',
                                subtitle: 'Keep the laws you deem important and go offline.',
                                icon: 'favorite',
                            },
                            {
                                title: 'Add comments',
                                subtitle: 'Your notes also have space! Add notes and bookmarks without the need to share with other users.',
                                icon: 'comment',
                            },
                            {
                                title: 'Customize your text',
                                subtitle: 'Griffin, bold, change color and highlight what was most important in your research.',
                                icon: 'edit',
                            },
                        ],
                    },
                },
                download: {
                    title: 'Download now',
                    subtitle: 'Download now and try for free for 15 days',
                    items: [
                        {
                            name: 'Monthly',
                            price: 'US$ 2,99',
                        },
                        {
                            name: 'Biannual',
                            price: 'US$ 14,99',
                        },
                        {
                            name: 'Yearly',
                            price: 'US$ 24,99',
                        },
                    ],
                },
                terms: {
                    title: 'Terms of use',
                },
                privacy: {
                    title: 'Privacy policy',
                },
                support: {
                    title: 'Support',
                    subtitle: 'Did you have any questions about how to use the app?',
                    description: 'Take a look at the tutorials and see how using LegaPy is even easier than you imagine',
                },
                contact: {
                    title: 'Contact us',
                    subtitle: 'Send your questions and suggestions for LegaPy!',
                    description: 'Your opinion makes a lot of difference so that we have an app every day more perfected and according to your needs.',
                    form: {
                        name: 'Name',
                        email: 'Email',
                        message: 'Message',
                        btn: ['Send', 'Sending', 'Sent!'],
                    },
                },
                login: {
                    title: 'Login',
                    email: 'E-mail',
                    password: 'Password',
                    link: 'Forgot your password?',
                    register: 'Create account',
                    btn: 'Login',
                },
                forgotPassword: {
                    title: 'Forgot password',
                    email: 'E-mail',
                    btn: 'Send Code',
                },
                resetPassword: {
                    title: 'Reset Password',
                    email: 'E-mail',
                    newPassword: 'New password',
                    RepeatedPassword: 'Repeated password',
                    Code: 'Code',
                    btn: 'Reset',
                },
                register: {
                    title: 'Create account',
                    email: 'E-mail',
                    password: 'Password',
                    RepeatedPassword: 'Repeat password',
                    btn: 'Register',
                },
            },
        }
    }

    @action changeLanguage = (lang) => {
        this.currentLanguage = lang
    }

    @action onSubmit = async (e) => {
        e.preventDefault()
        console.log(this.model)
        this.activeBtn = 1
        await API(CONTACT_US, 'post', this.model)
        this.activeBtn = 2
        this.model = {
            title: '',
            email: '',
            message: '',
        }
    }
}

export default new LandingStore()
