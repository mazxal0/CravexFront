export interface UserRegistration {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
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
  isEmailVerified: boolean;
}

export interface UserType {
  email: string;
  username: string;
  telegram: string;
}
