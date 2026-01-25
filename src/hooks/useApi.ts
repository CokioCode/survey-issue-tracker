/** biome-ignore-all lint/suspicious/noExplicitAny: Legacy API hooks using any for flexibility */
import {
  type QueryKey,
  type UseMutationOptions,
  type UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { clientFetcher } from "@/lib/fetcher";

interface UseApiQueryOptions<T>
  extends Omit<UseQueryOptions<T, AxiosError>, "queryKey" | "queryFn"> {
  isAuth?: boolean;
}

interface UseApiMutationOptions<TData, TVariables>
  extends Omit<
    UseMutationOptions<TData, AxiosError, TVariables>,
    "mutationFn"
  > {
  isAuth?: boolean;
  invalidateQueries?: QueryKey[];
}

export const useGet = <T = any>(
  queryKey: QueryKey,
  url: string,
  options?: UseApiQueryOptions<T>,
) => {
  const { isAuth = false, ...queryOptions } = options || {};

  return useQuery<T, AxiosError>({
    queryKey,
    queryFn: () => clientFetcher<T>(url, { method: "GET", isAuth }),
    ...queryOptions,
  });
};

export const usePost = <TData = any, TVariables = any>(
  url: string,
  options?: UseApiMutationOptions<TData, TVariables>,
) => {
  const queryClient = useQueryClient();
  const {
    isAuth = false,
    invalidateQueries,
    ...mutationOptions
  } = options || {};

  return useMutation<TData, AxiosError, TVariables>({
    mutationFn: (data: TVariables) =>
      clientFetcher<TData>(url, { method: "POST", data, isAuth }),
    onSuccess: (...args) => {
      if (invalidateQueries) {
        invalidateQueries.forEach((key) => {
          queryClient.invalidateQueries({ queryKey: key });
        });
      }

      mutationOptions.onSuccess?.(...args);
    },
    ...mutationOptions,
  });
};

export const usePut = <TData = any, TVariables = any>(
  url: string | ((variables: TVariables) => string),
  options?: UseApiMutationOptions<TData, TVariables>,
) => {
  const queryClient = useQueryClient();
  const {
    isAuth = false,
    invalidateQueries,
    ...mutationOptions
  } = options || {};

  return useMutation<TData, AxiosError, TVariables>({
    mutationFn: (data: TVariables) => {
      const endpoint = typeof url === "function" ? url(data) : url;
      return clientFetcher<TData>(endpoint, { method: "PUT", data, isAuth });
    },
    onSuccess: (...args) => {
      if (invalidateQueries) {
        invalidateQueries.forEach((key) => {
          queryClient.invalidateQueries({ queryKey: key });
        });
      }
      mutationOptions.onSuccess?.(...args);
    },
    ...mutationOptions,
  });
};

export const usePatch = <TData = any, TVariables = any>(
  url: string | ((variables: TVariables) => string),
  options?: UseApiMutationOptions<TData, TVariables>,
) => {
  const queryClient = useQueryClient();
  const {
    isAuth = false,
    invalidateQueries,
    ...mutationOptions
  } = options || {};

  return useMutation<TData, AxiosError, TVariables>({
    mutationFn: (data: TVariables) => {
      const endpoint = typeof url === "function" ? url(data) : url;
      return clientFetcher<TData>(endpoint, { method: "PATCH", data, isAuth });
    },
    onSuccess: (...args) => {
      if (invalidateQueries) {
        invalidateQueries.forEach((key) => {
          queryClient.invalidateQueries({ queryKey: key });
        });
      }
      mutationOptions.onSuccess?.(...args);
    },
    ...mutationOptions,
  });
};

export const useDelete = <TData = any, TVariables = any>(
  url: string | ((variables: TVariables) => string),
  options?: UseApiMutationOptions<TData, TVariables>,
) => {
  const queryClient = useQueryClient();
  const {
    isAuth = false,
    invalidateQueries,
    ...mutationOptions
  } = options || {};

  return useMutation<TData, AxiosError, TVariables>({
    mutationFn: (variables: TVariables) => {
      const endpoint = typeof url === "function" ? url(variables) : url;
      return clientFetcher<TData>(endpoint, { method: "DELETE", isAuth });
    },
    onSuccess: (...args) => {
      if (invalidateQueries) {
        invalidateQueries.forEach((key) => {
          queryClient.invalidateQueries({ queryKey: key });
        });
      }
      mutationOptions.onSuccess?.(...args);
    },
    ...mutationOptions,
  });
};
