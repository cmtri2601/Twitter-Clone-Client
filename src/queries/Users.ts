import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { queryKeys } from '~/api/queryKeys';
import { useAuth } from '~/components/auth/auth-provider';
import { StorageKey } from '~/constants/StorageKey';
import { ForgotPasswordRequest } from '~/dto/users/ForgotPassword';
import { LoginRequest, LoginResponse } from '~/dto/users/Login';
import { LogoutRequest } from '~/dto/users/Logout';
import { RegisterRequest, RegisterResponse } from '~/dto/users/Register';
import { ResetPasswordRequest } from '~/dto/users/ResetPassword';
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
export const useLogout = (): UseMutationResult<null, Error, LogoutRequest> => {
  const { setAuth } = useAuth();
  return useMutation({
    mutationFn: (data: LogoutRequest) => UserService.logout(data),
    onSuccess: () => {
      localStorage.removeItem(StorageKey.ACCESS_TOKEN);
      localStorage.removeItem(StorageKey.REFRESH_TOKEN);
      setAuth({});
    },
    meta: {
      successMessage: 'Logout successfully',
      errorMessage: 'Failed to logout'
    }
  });
};

/**
 * Hook for forgot password
 * @returns Mutation result for forgot password
 */
export const useForgotPassword = (): UseMutationResult<
  null,
  Error,
  ForgotPasswordRequest
> => {
  return useMutation({
    mutationFn: (data: ForgotPasswordRequest) =>
      UserService.forgotPassword(data),
    meta: {
      successMessage: 'Send email successfully',
      errorMessage: 'Failed to send email'
    }
  });
};

/**
 * Hook for reset password
 * @returns Mutation result for reset password
 */
export const useResetPassword = (): UseMutationResult<
  null,
  Error,
  ResetPasswordRequest
> => {
  return useMutation({
    mutationFn: (data: ResetPasswordRequest) => UserService.resetPassword(data),
    meta: {
      successMessage: 'Reset password successfully',
      errorMessage: 'Failed to reset password'
    }
  });
};
