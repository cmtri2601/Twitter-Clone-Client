import { User } from '../common/User';

export interface RegisterRequest {
  email?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  confirmPassword?: string;
  dateOfBirth?: string;
}

export interface RegisterResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}
