import { axiosClient } from '~/api/axiosClient';
import { UserEndpoints } from '~/api/endPoints';
import { LoginRequest } from '~/dto/users/Login';
import { RegisterRequest } from '~/dto/users/Register';

/**
 * Service class for handling user-related API calls
 */
export default class UserService {
  /**
   * Register a new user
   * @param data
   * @returns Promise with notification that registration success or not
   */
  static async register(data: RegisterRequest) {
    const response = await axiosClient.post(UserEndpoints.register(), data);
    return response.data;
  }

  /**
   * Login to application
   * @param data
   * @returns Promise with notification that login success or not
   */
  static async login(data: LoginRequest) {
    const response = await axiosClient.post(UserEndpoints.login(), data);
    return response.data;
  }
}
