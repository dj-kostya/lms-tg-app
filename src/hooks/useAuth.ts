import { useState, useEffect, useCallback, useMemo } from 'react';
import { retrieveRawInitData } from '@telegram-apps/sdk-react';
import { login, type AuthResponse } from '@/services/auth';
import type { UserProfile } from '@/types';

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserProfile | null;
  initData: string | null;
  error: string | null;
}

export interface AuthContextType extends AuthState {
  login: () => Promise<void>;
  logout: () => void;
  retryAuth: () => Promise<void>;
}

/**
 * Хук для управления авторизацией пользователя
 */
export function useAuth(): AuthContextType {
  
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    user: null,
    initData: null,
    error: null,
  });

  // Функция для выполнения авторизации
  const performLogin = useCallback(async () => {
    // Всегда получаем свежий init data из Telegram SDK
    const initDataRaw = retrieveRawInitData();
    
    if (!initDataRaw) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: 'No Telegram init data available',
      }));
      return;
    }

    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Выполняем авторизацию с текущим init data
      const response: AuthResponse = await login(initDataRaw);
      
      if (response.is_authenticated && response.verified && response.user) {
        // Преобразуем данные пользователя в формат UserProfile
        const userProfile: UserProfile = {
          id: response.user.id.toString(),
          firstName: response.user.first_name,
          lastName: response.user.last_name,
          username: response.user.username,
          photoUrl: response.user.photo_url,
          email: undefined,
          phone: undefined,
          joinDate: response.auth_date ? new Date(response.auth_date) : new Date(),
          level: 'beginner',
          totalCourses: 0,
          completedCourses: 0,
          totalLessons: 0,
          completedLessonsCount: 0,
          studyStreak: 0,
          totalStudyTime: 0,
          achievements: [],
          enrolledCourses: [],
          completedLessons: []
        };

        setAuthState({
          isAuthenticated: true,
          isLoading: false,
          user: userProfile,
          initData: initDataRaw,
          error: null,
        });

        // Сохраняем только данные пользователя в localStorage
        localStorage.setItem('user_data', JSON.stringify(userProfile));
        
        console.info('✅ User authenticated successfully:', response.user_name);
      } else {
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: 'Authentication failed - user not verified',
        }));
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      }));
    }
  }, []);

  // Функция для выхода из системы
  const logout = useCallback(() => {
    setAuthState({
      isAuthenticated: false,
      isLoading: false,
      user: null,
      initData: null,
      error: null,
    });
    
    // Очищаем данные из localStorage
    localStorage.removeItem('user_data');
  }, []);

  // Функция для повторной попытки авторизации
  const retryAuth = useCallback(async () => {
    await performLogin();
  }, [performLogin]);

  // Проверяем сохраненные данные при инициализации
  useEffect(() => {
    const checkStoredAuth = async () => {
      const storedUserData = localStorage.getItem('user_data');
      const initDataRaw = retrieveRawInitData();

      if (storedUserData && initDataRaw) {
        try {
          // Восстанавливаем данные пользователя из localStorage
          const userProfile = JSON.parse(storedUserData) as UserProfile;
          setAuthState({
            isAuthenticated: true,
            isLoading: false,
            user: userProfile,
            initData: initDataRaw,
            error: null,
          });
          console.info('✅ Restored user session from localStorage');
          return;
        } catch (error) {
          console.error('Error parsing stored user data:', error);
        }
      }

      // Если нет сохраненных данных или init data, пытаемся авторизоваться
      if (initDataRaw) {
        await performLogin();
      } else {
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: 'No Telegram init data available',
        }));
      }
    };

    checkStoredAuth();
  }, [performLogin]);

  return useMemo(() => ({
    ...authState,
    login: performLogin,
    logout,
    retryAuth,
  }), [authState, performLogin, logout, retryAuth]);
}

/**
 * Хук для получения init data для API запросов
 * @returns init data строка или null
 */
export function useInitData(): string | null {
  const { initData } = useAuth();
  return initData;
}
