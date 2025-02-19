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
  resetPassword: () => `/users/reset-password`
};
