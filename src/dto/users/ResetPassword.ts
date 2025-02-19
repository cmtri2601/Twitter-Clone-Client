export interface ResetPasswordRequest {
  forgotPasswordToken?: string;
  password?: string;
  confirmPassword?: string;
}
