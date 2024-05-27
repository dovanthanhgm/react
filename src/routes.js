import { CustomLayout } from '~/layouts'
import { Home, Login, About } from '~/pages'

const define = {
    home: '/',
    about: '/about',
    contact: '/contact',
    login: '/login'
}

// Public routes
const publicRoutes = [
    { path: define.login, component: Login, layout: null },
    { path: define.home, component: Home },
]

// Private routes
const privateRoutes = [
    { path: define.about, component: About, layout: CustomLayout },
];

// Combine routes
const routes = [
    ...publicRoutes,
    ...privateRoutes.map(route => ({ ...route, private: true })),
];

export default routes
