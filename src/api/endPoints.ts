/**
 * API endpoint configurations
 * Centralized endpoints management for entire application
 */

/**
 * User endpoints
 */
export const UserEndpoints = {
  /** Register */
  register: () => `/users/register`,

  /** Login */
  login: () => `/users/login`,

  /** Logout */
  logout: () => `/users/logout`,

  /** Forgot password */
  forgotPassword: () => `/users/forgot-password`,

  /** Reset password */
  resetPassword: () => `/users/reset-password`,

  /** Reset password */
  resendVerifyEmail: () => `/users/resend-verify-email`,

  /** Get login user info */
  getMe: () => `/users/me`,

  /** Get user info */
  getUser: (username?: string) => `/users/${username}`,

  /** Update profile */
  updateProfile: () => `/users/me`,

  /** Follow */
  follow: (id: string) => `/users/${id}/follow`,

  /** Follow */
  unfollow: (id: string) => `/users/${id}/unfollow`
};
