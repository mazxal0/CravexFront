export interface UserRegistration {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface UserLoginType {
  email: string;
  password: string;
}

export interface UserLoginRequestGet {
  requires2FA: boolean;
  userId: string;
  message: string;
  telegramLink: string;
}

export interface UserRegistrationRequestGet {
  success: boolean;
  userId: string;
  telegramLink: string;
  message: string;
}

export interface UserTypeGet {
  email: string;
  username: string;
  telegramUser: {
    telegramUsername: string;
  };
}

export interface UserType {
  email: string;
  username: string;
  telegram: string;
}
