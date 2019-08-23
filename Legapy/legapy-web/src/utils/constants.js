const isProduction = process.env.NODE_ENV === 'production'
// let baseUrl = 'http://167.99.239.43:3000/api'
let baseUrl = 'http://localhost:3000/api'
if (isProduction) baseUrl = 'http://191.252.56.154:3000/api'
export { isProduction }

// Autenticação
export const LOGIN = baseUrl + '/users/login'
export const REGISTER = baseUrl + '/users'
export const FORGOT_PASSWORD = baseUrl + '/users/forgot-password'
export const RESET_PASSWORD = baseUrl + '/users/forgot-password'
export const CHANGE_PASSWORD = baseUrl + '/users/change-password'

// Fornecedores
export const CONTACT_US = baseUrl + '/users/support'

// Categorias
export const CATEGORIES = `${baseUrl}/categories`

// Users
export const USERS = `${baseUrl}/users`

// Books
export const BOOKS = `${baseUrl}/books`
export const SEARCH = `${baseUrl}/books/search`
export const FAVORITES = `${baseUrl}/books/favorites`
export const RECENTS = `${baseUrl}/books/recents`
