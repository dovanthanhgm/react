import { CustomLayout } from '~/layouts'
import { Home, Login } from '~/pages'

const define = {
    home: '/',
    about: '/about',
    contact: '/contact',
    login: '/login'
}

// Public routes
const publicRoutes = [
    { path: define.about, component: Home, layout: CustomLayout },
    { path: define.contact, component: Home, layout: null },
    { path: define.login, component: Login, layout: null },
]

// Private routes
const privateRoutes = [
    { path: define.home, component: Home },
];

// Combine routes
const routes = [
    ...publicRoutes,
    ...privateRoutes.map(route => ({ ...route, private: true })),
];

export default routes
