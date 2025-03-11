import { useQueryClient } from '@tanstack/react-query';
import { createContext, useContext, useMemo } from 'react';
import { queryKeys } from '~/api/queryKeys';
import { StorageKey } from '~/constants/StorageKey';
import { User } from '~/dto/common/User';
import Loading from '~/pages/Loading';
import { useGetMe } from '~/queries/Users';

type AuthType = {
  isLogin: boolean;
  user?: User;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthProviderState = {
  auth: AuthType;
  authenticate: (accessToken: string, refreshToken: string, user: User) => void;
  unauthenticate: () => void;
  updateUser: (user: User) => void;
};

const initialState: AuthProviderState = {
  auth: { isLogin: false, user: undefined },
  authenticate: () => null,
  unauthenticate: () => null,
  updateUser: () => null
};

const AuthProviderContext = createContext<AuthProviderState>(initialState);

export function AuthProvider({ children }: AuthProviderProps) {
  //  Get user data
  const { isLoading, isSuccess, data: res } = useGetMe();
  const user = res?.data;

  console.log('auth-provider...', isLoading, isSuccess, user);

  // Query client to trigger get user
  const queryClient = useQueryClient();

  // Return of useAuth hook
  const value = useMemo(
    () => ({
      auth: { isLogin: Boolean(user), user: user },
      authenticate: (accessToken: string, refreshToken: string, user: User) => {
        localStorage.setItem(StorageKey.ACCESS_TOKEN, accessToken);
        localStorage.setItem(StorageKey.REFRESH_TOKEN, refreshToken);
        queryClient.setQueryData(queryKeys.users.me, { data: user });
      },
      unauthenticate: () => {
        localStorage.removeItem(StorageKey.ACCESS_TOKEN);
        localStorage.removeItem(StorageKey.REFRESH_TOKEN);
        queryClient.setQueryData(queryKeys.users.me, null);
      },
      updateUser: (user: User) => {
        queryClient.setQueryData(queryKeys.users.me, { data: user });
      }
    }),
    [queryClient, user]
  );

  // Return loading page when fetch user have done yet
  if (isLoading) {
    return <Loading />;
  }

  return (
    <AuthProviderContext.Provider value={value}>
      {children}
    </AuthProviderContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthProviderContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
};
