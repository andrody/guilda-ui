import React from 'react'
import { render } from 'react-dom'
import numeral from 'numeral'
import moment from 'moment'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import routes from './router'
import { createMuiTheme } from 'material-ui/styles'
import createPalette from 'material-ui/styles/createPalette'
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
    DialogContentText,
} from 'material-ui/Dialog'
import UtilStore from './stores/UtilStore'
import Button from 'material-ui/Button'


const theme = createMuiTheme({
    palette: createPalette({
        primary: {
            // light: will be calculated from palette.primary.main,
            main: '#0a3456',
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contast with palette.primary.main
        },
        secondary: {
            light: '#0066ff',
            main: '#E24529',
            // dark: will be calculated from palette.secondary.main,
            contrastText: '#fff',
        },
        tertiary: {
            light: '#dbdbdb',
            main: '#E24529',
            // dark: will be calculated from palette.secondary.main,
            contrastText: '#fff',
        },
    // error: will us the default color
    }),
})

import('./styles/main.scss')

moment.defineLocale('pt-br', {
    months: 'janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro'.split('_'),
    monthsShort: 'jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez'.split('_'),
    weekdays: 'domingo_segunda-feira_terça-feira_quarta-feira_quinta-feira_sexta-feira_sábado'.split('_'),
    weekdaysShort: 'dom_seg_ter_qua_qui_sex_sáb'.split('_'),
    weekdaysMin: 'dom_2ª_3ª_4ª_5ª_6ª_sáb'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        L: 'DD/MM/YYYY',
        LL: 'D [de] MMMM [de] YYYY',
        LLL: 'D [de] MMMM [de] YYYY [às] LT',
        LLLL: 'dddd, D [de] MMMM [de] YYYY [às] LT',
    },
    calendar: {
        sameDay: '[Hoje às] LT',
        nextDay: '[Amanhã às] LT',
        nextWeek: 'dddd [às] LT',
        lastDay: '[Ontem às] LT',
        lastWeek() {
            return (this.day() === 0 || this.day() === 6) ?
                '[Último] dddd [às] LT' : // Saturday + Sunday
                '[Última] dddd [às] LT' // Monday - Friday
        },
        sameElse: 'L',
    },
    relativeTime: {
        future: 'em %s',
        past: '%s atrás',
        s: 'segundos',
        m: 'um minuto',
        mm: '%d minutos',
        h: 'uma hora',
        hh: '%d horas',
        d: 'um dia',
        dd: '%d dias',
        M: 'um mês',
        MM: '%d meses',
        y: 'um ano',
        yy: '%d anos',
    },
    ordinal: '%dº',
})

numeral.register('locale', 'br', {
    delimiters: {
        thousands: '.',
        decimal: ',',
    },
    abbreviations: {
        thousand: 'k',
        million: 'm',
        billion: 'b',
        trillion: 't',
    },
    currency: {
        symbol: 'R$',
    },
})
numeral.locale('br')

const renderApp = () => {
    render(
        <AppContainer>
            <Router>
                <MuiThemeProvider theme={theme}>
                    <Switch>
                        {routes}
                    </Switch>
                </MuiThemeProvider>
            </Router>
        </AppContainer>,
        document.getElementById('root'),
    )
}

renderApp()
