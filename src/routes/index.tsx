import { createBrowserRouter } from 'react-router-dom';
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import TestTailWind from '~/pages/TestTailWind';

const createRouter = () => {
  return createBrowserRouter(
    [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/test-tw',
        element: <TestTailWind />
      }
    ],
    {
      future: {
        v7_relativeSplatPath: true,
        v7_normalizeFormMethod: true,
        v7_fetcherPersist: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true
      }
    }
  );
};

const router = createRouter();

export default router;
