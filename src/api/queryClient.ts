import { MutationCache, QueryClient, QueryKey } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

interface QueryMeta {
  successMessage?: string;
  errorMessage?: string;
  invalidateQueries?: QueryKey | QueryKey[];
  mutationId?: string;
}

/**
 * Configure and create the Query client.
 * Includes global configuration for queries and mutations
 */
const queryClient = new QueryClient({
  /**
   * generic config
   */
  defaultOptions: {
    queries: {
      staleTime: 30000
    }
  },

  /**
   * Global query cache configuration
   * Handles success and error states for all queries
   * Normally don't show toast when query
   */
  // queryCache: new QueryCache({
  //   onSuccess: (data, query) => {
  //     const meta = query.meta as QueryMeta | undefined;
  //     if (meta?.successMessage) {
  //       toast(meta.successMessage);
  //     } else {
  //       console.log(data);
  //       toast('data');
  //     }
  //   },
  //   onError: (error, query) => {
  //     const meta = query.meta as QueryMeta | undefined;
  //     console.log('Meta: ', meta?.errorMessage);
  //     console.log('Query error: ', error);
  //   }
  // }),

  /**
   * Global mutation cache configuration
   * Handles success and error states for all mutations
   */
  mutationCache: new MutationCache({
    onSuccess: (data, _variables, _context, mutation) => {
      // Handle successful mutations
      const meta = mutation.meta as QueryMeta | undefined;
      if (meta?.successMessage) {
        toast.success(meta.successMessage);
      } else {
        toast.success((data as { detail: string }).detail);
      }

      // Invalidate relevant queries if specified
      if (meta?.invalidateQueries) {
        queryClient.invalidateQueries({ queryKey: meta?.invalidateQueries });
      }
    },
    onError: (error, _variables, _context, mutation) => {
      const meta = mutation.meta as QueryMeta | undefined;
      if (meta?.errorMessage) {
        toast.error(meta.errorMessage);
      } else {
        const data = (error as AxiosError).response?.data;
        toast.error((data as { errors: string })?.errors);
      }
    }
  })
});

export default queryClient;
