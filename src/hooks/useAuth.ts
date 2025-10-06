import { useMemo } from 'react';
import type { UserProfile } from '@/types';
import { useQuery } from "@tanstack/react-query";
import { queries } from "@/api/queries"

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
  return useQuery(queries.user.login())
}



/**
 * Хук для управления авторизацией пользователя
 */
export function useAuth(): AuthContextType {
  const { data: loginData, isLoading, isError, isSuccess, refetch } = useLogin();
  return useMemo(() => ({
    isAuthenticated: isSuccess,
    isLoading: isLoading,
    backendUserData: loginData || null,
    error: isError ? 'Failed to login' : null,
    refetch: refetch,
  }), [loginData, isLoading, isError, isSuccess, refetch]);
}

