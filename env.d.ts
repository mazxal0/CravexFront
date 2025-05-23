declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_API_URL: string;
    readonly NEXT_PUBLIC_API_URL_REGISTRATION: string;
    readonly NEXT_PUBLIC_API_URL_LOGIN: string;
    readonly NEXT_PUBLIC_API_URL_AUTH: string;
    readonly NEXT_PUBLIC_API_URL_GET_ME: string;
    readonly NEXT_PUBLIC_API_URL_GET_ALL_WALLETS: string;

    readonly NEXT_PUBLIC_API_GET_ALL_COINS: string;
    readonly NEXT_PUBLIC_API_GET_ORDERED_ALL_COINS: string;
  }
}
