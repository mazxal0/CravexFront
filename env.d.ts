declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_API_URL: string;
    readonly NEXT_PUBLIC_API_URL_REGISTRATION: string;
    readonly NEXT_PUBLIC_API_URL_LOGIN: string;
    readonly NEXT_PUBLIC_API_URL_GET_ALL_WALLETS: string;
  }
}
