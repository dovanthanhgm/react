import { CustomLayout } from '~/layouts'
import { Home, Login } from '~/pages'

const routes = {
    home: '/',
    about: '/about',
    contact: '/contact',
    login: '/login'
}

// Public routes
const publicRoutes = [
    { path: routes.home, component: Home },
    { path: routes.about, component: Home, layout: CustomLayout },
    { path: routes.contact, component: Home, layout: null },
    { path: routes.login, component: Login, layout: null },
]

const privateRoutes = []

export { publicRoutes, privateRoutes }
