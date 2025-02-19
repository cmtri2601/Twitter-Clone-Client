import { createContext, useContext, useState } from 'react';
import { StorageKey } from '~/constants/StorageKey';
import { User } from '~/dto/common/User';

type Auth = {
  user?: User;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthProviderState = {
  auth: Auth | null;
  setAuth: (auth: Auth) => void;
};

const initialState: AuthProviderState = {
  auth: null,
  setAuth: () => null
};

const AuthProviderContext = createContext<AuthProviderState>(initialState);

export function AuthProvider({ children }: AuthProviderProps) {
  const jsonUser = localStorage.getItem(StorageKey.USER);
  const initAuth = { user: jsonUser ? JSON.parse(jsonUser) : null };
  const [auth, setAuth] = useState<Auth>(initAuth);

  const value = {
    auth,
    setAuth: (auth: Auth) => {
      if (!auth.user) {
        // Case: logout
        localStorage.removeItem(StorageKey.USER);
      } else {
        // Case: login -register
        localStorage.setItem(StorageKey.USER, JSON.stringify(auth.user));
      }
      setAuth(auth);
    }
  };

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
