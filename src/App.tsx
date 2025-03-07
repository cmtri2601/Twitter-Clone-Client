import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from 'react-error-boundary';
import { RouterProvider } from 'react-router-dom';
import queryClient from '~/api/queryClient';
import { AuthProvider } from '~/components/auth/auth-provider';
import { ThemeProvider } from '~/components/dark-mode/theme-provider';
import { Toaster } from '~/components/ui/sonner';
import ErrorFallback from '~/pages/ErrorFallback';
import router from '~/routes';

const App = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
            <RouterProvider
              future={{ v7_startTransition: true }}
              router={router}
            />
          </ThemeProvider>
        </AuthProvider>
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition='bottom-right'
          position='right'
        />
        <Toaster />
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
