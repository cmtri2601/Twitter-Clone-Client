export const queryKeys = {
  users: {
    all: ['users'] as const,
    byId: (id: string) => ['users', id]
  }
};
