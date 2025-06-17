declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_API_URL: string;
    readonly NEXT_PUBLIC_API_URL_REGISTRATION: string;
    readonly NEXT_PUBLIC_API_URL_LOGIN: string;
    readonly NEXT_PUBLIC_API_URL_AUTH: string;
    readonly NEXT_PUBLIC_API_URL_LOG_OUT: string;
    readonly NEXT_PUBLIC_API_URL_GET_ME: string;
    readonly NEXT_PUBLIC_API_URL_GET_ALL_WALLETS: string;

    readonly NEXT_PUBLIC_API_GET_ALL_COINS: string;
    readonly NEXT_PUBLIC_API_GET_ORDERED_ALL_COINS: string;
    readonly NEXT_PUBLIC_API_GET_COIN_DATA: string;
    readonly NEXT_PUBLIC_API_GET_COIN_DATA_BY_ID: string;

    readonly NEXT_PUBLIC_API_ADD_COIN_FOR_WALLET: string;
    readonly NEXT_PUBLIC_API_DELETE_COIN_FROM_WALLET: string;
  }
}
