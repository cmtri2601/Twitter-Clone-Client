import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from 'react-error-boundary';
import { RouterProvider } from 'react-router-dom';
import queryClient from './api/queryClient';
import { ThemeProvider } from './components/theme-provider';
import ErrorFallback from './pages/ErrorFallback';
import router from './routes';

const App = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
          <RouterProvider
            future={{ v7_startTransition: true }}
            router={router}
          />
        </ThemeProvider>
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition='bottom-left'
          position='left'
        />
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
