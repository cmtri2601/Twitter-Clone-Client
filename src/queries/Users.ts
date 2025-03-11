import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { queryKeys } from '~/api/queryKeys';
import { useAuth } from '~/components/auth/Auth';
import { StorageKey } from '~/constants/StorageKey';
import { User } from '~/dto/common/User';
import { ChangePasswordRequest } from '~/dto/users/ChangePassword';
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
      // errorMessage: 'Failed to register',
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
      successMessage: 'Login successfully'
      // errorMessage: 'Failed to login'
    }
  });
};

/**
 * Hook for logout
 * @returns Mutation result for logout
 */
export const useLogout = (): UseMutationResult<null, Error, LogoutRequest> => {
  const { unauthenticate } = useAuth();
  return useMutation({
    mutationFn: () =>
      UserService.logout({
        refreshToken: localStorage.getItem(StorageKey.REFRESH_TOKEN) as string
      }),
    onSuccess: () => {
      unauthenticate();
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
    staleTime: Infinity
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
 * @returns Mutation result for update profile
 */
export const useUpdateProfile = (): UseMutationResult<
  AxiosResponse<{ data: User }>,
  Error,
  UpdateMeRequest
> => {
  const { updateUser } = useAuth();
  return useMutation({
    mutationFn: (data: UpdateMeRequest) => UserService.updateProfile(data),
    onSuccess(res) {
      updateUser(res.data);
    },
    meta: {
      successMessage: 'Update your profile successfully',
      errorMessage: 'Cannot update your profile'
    }
  });
};

/**
 * Hook for change password
 * @returns Mutation result for change password
 */
export const useChangePassword = (): UseMutationResult<
  AxiosResponse<null>,
  Error,
  ChangePasswordRequest
> => {
  return useMutation({
    mutationFn: (data: ChangePasswordRequest) =>
      UserService.changePassword(data),
    meta: {
      successMessage: 'Change password successfully',
      errorMessage: 'Cannot change password'
    }
  });
};

/**
 * Hook for follow
 * @returns Mutation result for follow
 */
export const useFollow = (
  username?: string
): UseMutationResult<AxiosResponse<null>, Error, string | undefined> => {
  // const queryClient = useQueryClient();
  console.log('username', username);
  return useMutation({
    mutationFn: (id?: string) => UserService.follow(id),
    meta: {
      successMessage: 'Follow successfully',
      // errorMessage: 'Fail'
      invalidateQueries: [`users/${username}`]
    }
  });
};

/**
 * Hook for unfollow
 * @returns Mutation result for unfollow
 */
export const useUnfollow = (
  username?: string
): UseMutationResult<AxiosResponse<null>, Error, string | undefined> => {
  // const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id?: string) => UserService.unfollow(id),
    meta: {
      successMessage: 'Unfollow successfully',
      // errorMessage: 'Fail'
      invalidateQueries: [`users/${username}`]
    }
  });
};
