import { CustomLayout } from '~/layouts'
import { Home, Login, Logout, About } from '~/pages'

export const define = {
    home: '/',
    about: '/about',
    contact: '/contact',
    login: '/login',
    logout: '/logout'
}

// Public routes
const publicRoutes = [
    { path: define.login, component: Login},
    { path: define.logout, component: Logout},
]

// Private routes
const privateRoutes = [
    { path: define.home, component: Home },
    { path: define.about, component: About},
    { path: define.contact, component: About, layout: CustomLayout},
];

// Combine routes
const routes = [
    ...publicRoutes,
    ...privateRoutes.map(route => ({ ...route, private: true })),
];

export default routes
