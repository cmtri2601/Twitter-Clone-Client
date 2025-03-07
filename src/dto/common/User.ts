import { UserStatus } from '~/constants/UserStatus';
import { Media } from '~/dto/common/Media';

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
  avatar?: Media;
  coverPhoto?: string;
}
