import { UserEndpoints } from '~/api/endPoints';

const listShouldNotRetry = [
  UserEndpoints.register(),
  UserEndpoints.login(),
  UserEndpoints.forgotPassword(),
  UserEndpoints.resetPassword()
];

export const shouldRetry = (url?: string): boolean => {
  if (listShouldNotRetry.includes(url || '')) {
    return false;
  }

  return true;
};
