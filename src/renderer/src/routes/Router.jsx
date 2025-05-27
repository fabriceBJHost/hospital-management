import { createHashRouter } from 'react-router-dom';
import DefaultLayout from '../layouts/DefaultLayout';
import AuthLayout from '../layouts/AuthLayout';
import NotFound from '../components/NotFound';
import Dashboard from '../components/Dashboard';
import Login from '../components/Login';

/**
 * function who return all view
 */
const Router = createHashRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <Dashboard />
      }
    ]
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: <Login />
      }
    ]
  },
  {
    path: '/',
    element: <NotFound />
  }
]);

export default Router;
