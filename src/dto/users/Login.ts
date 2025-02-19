import { User } from '../common/User';

export interface LoginRequest {
  email?: string;
  password?: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}
