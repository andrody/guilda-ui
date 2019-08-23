import Categories from '../Categories'
import Bookmarks from '../Book/Bookmarks'
import Book from '../Book/Book'
import Comments from '../Comments/Comments'
import Favorites from '../Favorites/Favorites'
import Recents from '../Recents/Recents'
import ChangePassword from '../Auth/Page/ChangePassword'

const routes = [
    {
        path: '/app/categories/:id/books/:idBook',
        Component: Book,
    },
    {
        path: '/app/categories/:id/books/:idBook/comments',
        Component: Comments,
    },
    {
        path: '/app/categories/:id/books',
        Component: Bookmarks,
    },
    {
        path: '/app/favorites',
        Component: Favorites,
    },
    {
        path: '/app/news',
        Component: Recents,
    },
    {
        path: '/app/categories/:id',
        Component: Categories,
    },
    {
        path: '/app/categories',
        Component: Categories,
    },
    {
        path: '/app/change-password',
        Component: ChangePassword,
    },
]

export default routes
