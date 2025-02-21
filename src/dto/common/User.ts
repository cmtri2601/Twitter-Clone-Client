import { UserStatus } from '~/constants/UserStatus';

export interface User {
  _id?: string;
  email?: string;
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  status?: UserStatus;

  verifyEmailToken?: string;
  forgotPasswordToken?: string;

  createAt?: string;
  updateAt?: string;

  bio?: string;
  location?: string;
  website?: string;
  dateOfBirth?: string;
  avatar?: string;
  coverPhoto?: string;
}
