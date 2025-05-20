export interface UserRegistration {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface User {}
