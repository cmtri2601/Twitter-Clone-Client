import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryKey
} from '@tanstack/react-query';

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
   */
  queryCache: new QueryCache({
    onSuccess: (data, query) => {
      const meta = query.meta as QueryMeta | undefined;
      if (meta?.successMessage) {
        console.log('Query success: ', meta.successMessage);
      }
    },
    onError: (error, query) => {
      const meta = query.meta as QueryMeta | undefined;
      console.log('Meta: ', meta?.errorMessage);
      console.log('Query error: ', error);
    }
  }),

  /**
   * Global mutation cache configuration
   * Handles success and error states for all mutations
   */
  mutationCache: new MutationCache({
    onSuccess: (data, variables, context, mutation) => {
      // Handle successful mutations
      const meta = mutation.meta as QueryMeta | undefined;
      if (meta?.successMessage) {
        console.log('Mutation success: ', meta.successMessage);
      }

      // Invalidate relevant queries if specified
      if (meta?.invalidateQueries) {
        const queriesToInvalidate = Array.isArray(meta.invalidateQueries)
          ? meta.invalidateQueries
          : [meta.invalidateQueries];

        queriesToInvalidate.forEach((queryKey) => {
          queryClient.invalidateQueries({ queryKey });
        });
      }
    },
    onError: (error, variables, context, mutation) => {
      const meta = mutation.meta as QueryMeta | undefined;
      console.log('Meta: ', meta?.errorMessage);
      console.log('Mutation error: ', error);
    }
  })
});

export default queryClient;
