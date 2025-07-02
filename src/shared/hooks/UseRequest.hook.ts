import {
  MutationFunction,
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';
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

interface UseMutationHookProps<TDataGet = any, TDataSend = any> {
  apiUrl: string;
  method?: 'post' | 'put' | 'patch' | 'delete';
  config?: AxiosRequestConfig;
  mutationOptions?: Omit<
    UseMutationOptions<TDataGet, AxiosError, TDataSend>,
    'mutationFn'
  >;
  onSuccessCallback?: (data: TDataGet, variables: TDataSend) => void;
  onErrorCallback?: (error: AxiosError, variables: TDataSend) => void;
}

export const useMutationRequest = <TDataGet = any, TDataSend = any>({
  apiUrl,
  method = 'post',
  config = {},
  mutationOptions = {},
  onSuccessCallback,
  onErrorCallback,
}: UseMutationHookProps<TDataGet, TDataSend>) => {
  const mutationFn: MutationFunction<TDataGet, TDataSend> = async (
    variables,
  ) => {
    const response: AxiosResponse<TDataGet> = await api[method](
      apiUrl,
      variables,
      config,
    );
    return response.data;
  };

  return useMutation<TDataGet, AxiosError, TDataSend>({
    mutationFn,
    ...mutationOptions,
    onSuccess: (data: TDataGet, variables: TDataSend, context?: unknown) => {
      if (onSuccessCallback) {
        onSuccessCallback(data, variables);
      }
      mutationOptions.onSuccess?.(data, variables, context);
    },
    onError: (error: AxiosError, variables: TDataSend, context?: unknown) => {
      if (onErrorCallback) {
        onErrorCallback(error, variables);
      }
      mutationOptions.onError?.(error, variables, context);
    },
  });
};
