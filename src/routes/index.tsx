import { lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route
} from 'react-router-dom';
import ErrorFallback from '~/pages/ErrorFallback';
import Layout from '~/pages/Layout';
import Loading from '~/pages/Loading';

const createRouter = () => {
  const Home = lazy(() => import('~/pages/Home'));
  const Profile = lazy(() => import('~/pages/Profile'));
  const Login = lazy(() => import('~/pages/Login'));
  const Register = lazy(() => import('~/pages/Register'));
  const TestTailWind = lazy(() => import('~/pages/TestTailWind'));

  const ErrorBoundaryLayout = () => (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Outlet />
    </ErrorBoundary>
  );

  return createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<ErrorBoundaryLayout />}>
        <Route
          path='/register'
          element={
            <Suspense fallback={<Loading />}>
              <Register />
            </Suspense>
          }
        />

        <Route
          path='/login'
          element={
            <Suspense fallback={<Loading />}>
              <Login />
            </Suspense>
          }
        />

        <Route path='/login' element={<TestTailWind />} />

        <Route path='/' element={<Layout />}>
          <Route
            index
            element={
              <Suspense fallback={<Loading />}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path='profile'
            element={
              <Suspense fallback={<Loading />}>
                <Profile />
              </Suspense>
            }
            // loader={contactLoader}
            // action={contactAction}
          />
        </Route>
      </Route>
    ),
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
