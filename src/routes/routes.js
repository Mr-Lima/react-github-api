import Auth from '../views/Auth';
import Home from '../views/Home';
import Repos from '../views/Repos';

export const ROUTES = [
  {
    name: 'Home',
    path: '/',
    component: Home,
    exact: true,
  },
  {
    name: 'Auth',
    path: '/auth',
    component: Auth,
    exact: true,
  },
  {
    name: 'Repos',
    path: '/:user',
    component: Repos,
  },
];
