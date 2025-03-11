import { lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route
} from 'react-router-dom';
import ErrorFallback from '~/pages/ErrorFallback';
import Explore from '~/pages/Explore';
import ForgotPassword from '~/pages/ForgotPassword';
import Layout from '~/pages/Layout';
import Loading from '~/pages/Loading';
import Message from '~/pages/Message';
import NotFound from '~/pages/NotFound';
import Notification from '~/pages/Notification';
import ResetPassword from '~/pages/ResetPassword';

const createRouter = () => {
  const Home = lazy(() => import('~/pages/Home'));
  const Profile = lazy(() => import('~/pages/Profile'));
  const User = lazy(() => import('~/pages/User'));
  const Login = lazy(() => import('~/pages/Login'));
  const OAuth = lazy(() => import('~/pages/OAuth'));
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
        {/* Register */}
        <Route
          path='/register'
          element={
            <Suspense fallback={<Loading />}>
              <Register />
            </Suspense>
          }
        />

        {/* Login */}
        <Route
          path='/login'
          element={
            <Suspense fallback={<Loading />}>
              <Login />
            </Suspense>
          }
        />

        {/* Login with oauth */}
        <Route
          path='/oauth/:resourceServer'
          element={
            <Suspense fallback={<Loading />}>
              <OAuth />
            </Suspense>
          }
        />

        {/* Forgot password */}
        <Route
          path='/forgot-password'
          element={
            <Suspense fallback={<Loading />}>
              <ForgotPassword />
            </Suspense>
          }
        />

        {/* Reset password */}
        <Route
          path='/reset-password'
          element={
            <Suspense fallback={<Loading />}>
              <ResetPassword />
            </Suspense>
          }
        />

        {/* Test tailwind */}
        <Route path='/test-tw' element={<TestTailWind />} />

        {/* Require authorization */}
        <Route path='/' element={<Layout />}>
          {/* Home */}
          <Route
            index
            element={
              <Suspense fallback={<Loading />}>
                <Home />
              </Suspense>
            }
          />

          {/* Home */}
          <Route
            path='home'
            element={
              <Suspense fallback={<Loading />}>
                <Home />
              </Suspense>
            }
          />

          {/* Explore */}
          <Route
            path='explore'
            element={
              <Suspense fallback={<Loading />}>
                <Explore />
              </Suspense>
            }
          />

          {/* Notification */}
          <Route
            path='notification'
            element={
              <Suspense fallback={<Loading />}>
                <Notification />
              </Suspense>
            }
          />

          {/* Message */}
          <Route
            path='message'
            element={
              <Suspense fallback={<Loading />}>
                <Message />
              </Suspense>
            }
          />

          {/* Profile */}
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

          {/* User */}
          <Route
            path='user/:username'
            element={
              <Suspense fallback={<Loading />}>
                <User />
              </Suspense>
            }
            // loader={contactLoader}
            // action={contactAction}
          />
        </Route>

        {/* Not Found */}
        <Route
          path='*'
          element={
            <Suspense fallback={<Loading />}>
              <NotFound />
            </Suspense>
          }
        />
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
