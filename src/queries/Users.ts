import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { queryKeys } from '~/api/queryKeys';
import { useAuth } from '~/components/auth/auth-provider';
import { StorageKey } from '~/constants/StorageKey';
import { User } from '~/dto/common/User';
import { ForgotPasswordRequest } from '~/dto/users/ForgotPassword';
import { LoginRequest, LoginResponse } from '~/dto/users/Login';
import { LogoutRequest } from '~/dto/users/Logout';
import { RegisterRequest, RegisterResponse } from '~/dto/users/Register';
import { ResetPasswordRequest } from '~/dto/users/ResetPassword';
import { UpdateMeRequest } from '~/dto/users/UpdateMe';
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

/**
 * Hook for resend verify email
 * @returns Mutation result for resend verify email
 */
export const useResendVerifyEmail = (): UseMutationResult<null, Error> => {
  return useMutation({
    mutationFn: () => UserService.resendVerifyEmail(),
    meta: {
      successMessage: 'Resend verify email successfully',
      errorMessage: 'Failed to resend verify email'
    }
  });
};

/**
 * Hook for get login user information
 * @returns User
 */
export const useGetMe = (): UseQueryResult<AxiosResponse<User>> => {
  return useQuery({
    queryKey: [`users/me`],
    queryFn: () => UserService.getMe(),
    staleTime: 0
  });
};

/**
 * Hook for get user information
 * @returns User
 */
export const useGetUser = (
  username?: string
): UseQueryResult<
  AxiosResponse<User & { isFollow?: boolean; isFollowed?: boolean }>
> => {
  return useQuery({
    queryKey: [`users/${username}`],
    queryFn: () => UserService.getUser(username)
  });
};

/**
 * Hook for update profile
 * @returns Mutation result for login
 */
export const useUpdateProfile = (): UseMutationResult<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  AxiosResponse<any>,
  Error,
  UpdateMeRequest
> => {
  // const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateMeRequest) => UserService.updateProfile(data),
    meta: {
      successMessage: 'Update successfully',
      errorMessage: 'Failed to update',
      invalidateQueries: ['users/me']
    }
  });
};

/**
 * Hook for update profile
 * @returns Mutation result for login
 */
export const useFollow = (
  username?: string
): UseMutationResult<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  AxiosResponse<any>,
  Error,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any
> => {
  // const queryClient = useQueryClient();
  console.log('username', username);
  return useMutation({
    mutationFn: (id: string) => UserService.follow(id),
    meta: {
      successMessage: 'Follow successfully',
      // errorMessage: 'Fail'
      invalidateQueries: [`users/${username}`]
    }
  });
};

/**
 * Hook for update profile
 * @returns Mutation result for login
 */
export const useUnfollow = (
  username?: string
): UseMutationResult<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  AxiosResponse<any>,
  Error,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any
> => {
  // const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => UserService.unfollow(id),
    meta: {
      successMessage: 'Unfollow successfully',
      // errorMessage: 'Fail'
      invalidateQueries: [`users/${username}`]
    }
  });
};
