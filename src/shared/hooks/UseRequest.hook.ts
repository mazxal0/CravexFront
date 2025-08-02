import { useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import api from '@/lib/axios';

interface UseRequestHookProps<T = any> {
  nameOfCache: string;
  apiUrl: string;
  params?: Record<string, any>;
  config?: AxiosRequestConfig;
  queryOptions?: Omit<UseQueryOptions<T, AxiosError>, 'queryFn' | 'queryKey'>;
  additionQueryFn?: (data: any) => {};
}

export const useQueryRequest = <T = any>({
  nameOfCache,
  apiUrl,
  params = {},
  config = {},
  queryOptions = {},
  additionQueryFn = undefined,
}: UseRequestHookProps<T>) => {
  const queryKey = params
    ? [nameOfCache, apiUrl, params]
    : [nameOfCache, apiUrl];
  // console.log('KEYS:', queryKey);
  return useQuery<T, AxiosError>({
    queryKey,
    queryFn: async (): Promise<T> => {
      const response: AxiosResponse<T> = await api.get<T>(apiUrl, {
        params,
        ...config,
      });

      if (additionQueryFn) {
        additionQueryFn(response.data);
      }
      return response.data;
    },
    staleTime: 60 * 1000 * 5, // 5 минут
    retry: 2,
    ...queryOptions,
  });
};
//
// interface UseMutationHookProps<TDataGet = any, TDataSend = any> {
//   apiUrl?: string; // Сделаем необязательным, так как может быть динамическим
//   method?: 'post' | 'put' | 'patch' | 'delete';
//   config?: AxiosRequestConfig;
//   mutationOptions?: Omit<
//     UseMutationOptions<TDataGet, AxiosError, TDataSend>,
//     'mutationFn'
//   >;
//   onSuccessCallback?: (data: TDataGet, variables: TDataSend) => void;
//   onErrorCallback?: (error: AxiosError, variables: TDataSend) => void;
// }
//
// export const useMutationRequest = <TDataGet = any, TDataSend = any>({
//   apiUrl = '',
//   method = 'post',
//   config = {},
//   mutationOptions = {},
//   onErrorCallback,
// }: UseMutationHookProps<TDataGet, TDataSend> = {}) => {
//   return useMutation<TDataGet, AxiosError, TDataSend>({
//     mutationFn: async (variables: any) => {
//       const url = variables?.url ? `${apiUrl}${variables.url}` : apiUrl;
//       const data = variables?.data || variables;
//
//       const requestConfig = {
//         ...config,
//         headers: {
//           'Content-Type': 'application/json',
//           ...config.headers,
//         },
//       };
//
//       // Убрали try/catch → ошибка пойдёт в onError
//       const response = await api[method](url, data, requestConfig);
//       return response.data;
//     },
//     ...mutationOptions,
//   });
// };
type MutationVariables<TDataSend> = {
  apiUrl?: string; // Теперь необязательный
  data: TDataSend;
};

export const useMutationRequest = <TDataGet = any, TDataSend = any>({
  defaultApiUrl = '', // URL по умолчанию (можно не задавать)
  method = 'post',
  config = {},
  mutationOptions = {},
}: {
  defaultApiUrl?: string;
  method?: 'get' | 'post' | 'put' | 'delete' | 'patch';
  config?: AxiosRequestConfig;
  mutationOptions?: any;
} = {}) => {
  return useMutation<
    TDataGet,
    AxiosError<TDataGet>,
    MutationVariables<TDataSend> // Принимает { apiUrl?, data }
  >({
    mutationFn: async (variables) => {
      const apiUrl = variables.apiUrl ?? defaultApiUrl;
      if (!apiUrl) {
        throw new Error('API URL is required. Provide it in hook or mutate.');
      }

      const requestConfig: AxiosRequestConfig = {
        ...config,
        headers: {
          'Content-Type': 'application/json',
          ...config.headers,
        },
      };

      const response = await api[method]<TDataGet>(
        apiUrl,
        variables.data,
        requestConfig,
      );
      return response.data;
    },
    ...mutationOptions,
  });
};
