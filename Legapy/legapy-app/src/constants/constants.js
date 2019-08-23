const baseUrl = 'http://191.252.56.154:3000/api'
// const baseUrl = 'http://localhost:3000/api'

export const SUBSCRIPTION_TYPES = {
    mensuallp: 30,
    semestrallp: 180,
    anuallp: 365,
}

// Upload de avatar
console.log(baseUrl)
export const AVATAR_URL = 'https://file-upload-example-backend-dkhqoilqqn.now.sh/upload'

// Autenticacao
export const LOGIN = `${baseUrl}/users/login`
export const CHANGE_PASSWORD = `${baseUrl}/users/change-password`
export const REGISTER = `${baseUrl}/users`
export const FORGOT_PASSWORD = `${baseUrl}/users/forgot-password`
export const RESET_PASSWORD = `${baseUrl}/users/reset-password`

// Categories
export const CATEGORIES = `${baseUrl}/categories`
export const CATEGORIES_LAST_UPDATE = `${baseUrl}/categories/updates`

// Books
export const BOOKS = `${baseUrl}/books`
export const SEARCH = `${baseUrl}/books/search`
export const FAVORITES = `${baseUrl}/books/favorites`
export const RECENTS = `${baseUrl}/books/recents`

// SUBSCRIPTIONS
export const SUBSCRIPTIONS = `${baseUrl}/subscriptions`

