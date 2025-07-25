// global.d.ts
export {};

declare global {
  interface TelegramWebAppUser {
    id: number;
    first_name?: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    is_premium?: boolean;
    photo_url?: string;
  }

  interface TelegramInitDataUnsafe {
    query_id?: string;
    user?: TelegramWebAppUser;
    auth_date?: number;
    hash: string;
  }

  interface TelegramWebApp {
    initData: string;
    initDataUnsafe: TelegramInitDataUnsafe;

    // Навешивает готовность SDK
    ready: () => void;

    expand: () => void;
    close: () => void;
    sendData: (data: string) => void;
    isExpanded: boolean;

    // Если используете дополнительные методы
    onEvent?: (event: string, handler: () => void) => void;
  }

  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}
