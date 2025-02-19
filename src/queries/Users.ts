import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { queryKeys } from '~/api/queryKeys';
import { StorageKey } from '~/constants/StorageKey';
import { LoginRequest, LoginResponse } from '~/dto/users/Login';
import { LogoutRequest } from '~/dto/users/Logout';
import { RegisterRequest, RegisterResponse } from '~/dto/users/Register';
import UserService from '~/services/Users';

/**
 * Hook for register new user
 * @returns Mutation result for new user
 */
export const useRegister = (): UseMutationResult<
  AxiosResponse<RegisterResponse>,
  Error,
  RegisterRequest
> => {
  return useMutation({
    mutationFn: (data: RegisterRequest) => UserService.register(data),
    meta: {
      successMessage: 'Register successfully',
      errorMessage: 'Failed to register',
      invalidateQueries: queryKeys.users.all
    }
  });
};

/**
 * Hook for login
 * @returns Mutation result for login
 */
export const useLogin = (): UseMutationResult<
  AxiosResponse<LoginResponse>,
  Error,
  LoginRequest
> => {
  return useMutation({
    mutationFn: (data: LoginRequest) => UserService.login(data),
    meta: {
      successMessage: 'Login successfully',
      errorMessage: 'Failed to login'
    }
  });
};

/**
 * Hook for logout
 * @returns Mutation result for logout
 */
export const useLogout = (): UseMutationResult<
  AxiosError,
  Error,
  LogoutRequest
> => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: LogoutRequest) => UserService.logout(data),
    onSuccess: () => {
      localStorage.removeItem(StorageKey.ACCESS_TOKEN);
      localStorage.removeItem(StorageKey.REFRESH_TOKEN);
      navigate('/login');
    },
    meta: {
      successMessage: 'Logout successfully',
      errorMessage: 'Failed to logout'
    }
  });
};
