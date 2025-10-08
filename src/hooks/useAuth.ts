import { useMemo } from 'react';
import type { UserProfile } from '@/types';
import { useMutation } from "@tanstack/react-query";
import { getClient } from "@/api/client"

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  backendUserData: UserProfile | null;
  error: string | null;
}

export interface AuthContextType extends AuthState {
  refetch: () => void;
}


function useLogin() {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: async () => {
      console.log('🚀 Sending login request')
      // TODO: move to api/queries/user.ts
      return await getClient().userClient.login()
    }
  })
}



/**
 * Хук для управления авторизацией пользователя
 */
export function useAuth(): AuthContextType {
  const { data: loginData, isPending, isError, isSuccess, mutate } = useLogin();

  return useMemo(() => ({
    isAuthenticated: isSuccess,
    isLoading: isPending,
    backendUserData: loginData || null,
    error: isError ? 'Failed to login' : null,
    refetch: mutate,
  }), [loginData, isPending, isError, isSuccess]);
}

