declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_API_URL: string;
    readonly NEXT_PUBLIC_FRONTEND_URL: string;

    readonly NEXT_PUBLIC_API_URL_REGISTRATION: string;
    readonly NEXT_PUBLIC_API_URL_LOGIN: string;
    readonly NEXT_PUBLIC_API_URL_AUTH: string;
    readonly NEXT_PUBLIC_API_URL_VERIFICATION_TO_TG_CODE: string;
    readonly NEXT_PUBLIC_API_URL_SEND_CODE_TO_TG_BOT: string;
    readonly NEXT_PUBLIC_API_URL_LOG_OUT: string;
    readonly NEXT_PUBLIC_API_URL_GET_ME: string;
    readonly NEXT_PUBLIC_API_URL_GET_ALL_WALLETS: string;
    readonly NEXT_PUBLIC_API_CHANGE_USER_DATA: string;
    readonly NEXT_PUBLIC_API_VERIFY_EMAIL: string;
    readonly NEXT_PUBLIC_API_SEND_VERIFICATION_EMAIL: string;

    readonly NEXT_PUBLIC_API_GET_ALL_COINS: string;
    readonly NEXT_PUBLIC_API_GET_ORDERED_ALL_COINS: string;
    readonly NEXT_PUBLIC_API_GET_COIN_DATA: string;
    readonly NEXT_PUBLIC_API_GET_COIN_DATA_BY_ID: string;
    readonly NEXT_PUBLIC_API_QUERY_COINS: string;

    readonly NEXT_PUBLIC_API_ADD_COIN_FOR_WALLET: string;
    readonly NEXT_PUBLIC_API_DELETE_COIN_FROM_WALLET: string;

    readonly NEXT_PUBLIC_API_ADD_NEW_WALLET: string;
    readonly NEXT_PUBLIC_API_DELETE_WALLET: string;

    readonly NEXT_PUBLIC_API_GET_TRANSACTION_FOR_ONE_ASSET: string;
    readonly NEXT_PUBLIC_API_CREATE_TRANSACTION_FOR_ONE_ASSET: string;
    readonly NEXT_PUBLIC_API_DELETE_ONE_TRANSACTION: string;
  }
}
