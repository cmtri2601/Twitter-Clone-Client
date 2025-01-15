import { RouterProvider } from 'react-router-dom';
import router from './routes';
import { ThemeProvider } from './components/theme-provider';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import queryClient from './api/queryClient';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
        <RouterProvider future={{ v7_startTransition: true }} router={router} />
      </ThemeProvider>
      <ReactQueryDevtools
        initialIsOpen={false}
        buttonPosition='bottom-left'
        position='left'
      />
    </QueryClientProvider>
  );
};

export default App;
