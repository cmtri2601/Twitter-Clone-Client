import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { queryKeys } from '~/api/queryKeys';
import { LoginRequest } from '~/dto/users/Login';
import { RegisterRequest } from '~/dto/users/Register';
import UserService from '~/services/Users';

/**
 * Hook for register new user
 * @returns Mutation result for new user
 */
export const useRegister = (): UseMutationResult<
  AxiosError,
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
  AxiosError,
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
