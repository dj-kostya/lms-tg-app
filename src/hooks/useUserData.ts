import { useMemo } from 'react';
import { initDataState, useSignal } from '@telegram-apps/sdk-react';
import { mockUserProfile } from '@/data/mockData';
import { useAuthContext } from '@/components/AuthProvider';
import type { UserProfile } from '@/types';

/**
 * Хук для получения данных пользователя из контекста авторизации, Telegram Init Data или моков
 * @returns Объект с данными пользователя и информацией о источнике данных
 */
export function useUserData() {
  const initData = useSignal(initDataState);
  
  // Пытаемся получить данные из контекста авторизации
  let authUser: UserProfile | null = null;
  let isFromAuth = false;
  
  try {
    const authContext = useAuthContext();
    if (authContext.isAuthenticated && authContext.user) {
      authUser = authContext.user;
      isFromAuth = true;
    }
  } catch {
    // Контекст авторизации недоступен, используем fallback
  }
  
  const userData = useMemo(() => {
    // Приоритет: данные из авторизации > данные из Telegram > моки
    if (authUser && isFromAuth) {
      return {
        user: authUser,
        isFromTelegram: false,
        isFromAuth: true,
        telegramUser: null,
        initData: null
      };
    }
    
    // Если есть данные из Telegram
    if (initData?.user) {
      const telegramUser = initData.user;
      
      // Преобразуем данные Telegram пользователя в формат UserProfile
      const userProfile: UserProfile = {
        id: telegramUser.id.toString(),
        firstName: telegramUser.first_name || 'Пользователь',
        lastName: telegramUser.last_name || undefined,
        username: telegramUser.username || undefined,
        photoUrl: telegramUser.photo_url || undefined,
        email: undefined, // Telegram не предоставляет email
        phone: undefined, // Telegram не предоставляет телефон
        joinDate: new Date(), // Дата регистрации в приложении
        level: 'beginner', // По умолчанию
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

      return {
        user: userProfile,
        isFromTelegram: true,
        isFromAuth: false,
        telegramUser: telegramUser,
        initData: initData
      };
    }
    
    // Fallback на моки для браузера
    return {
      user: mockUserProfile,
      isFromTelegram: false,
      isFromAuth: false,
      telegramUser: null,
      initData: null
    };
  }, [initData, authUser, isFromAuth]);

  return userData;
}

/**
 * Хук для получения информации о том, запущено ли приложение в Telegram
 * @returns true если приложение запущено в Telegram, false если в браузере
 */
export function useIsTelegramApp() {
  const initData = useSignal(initDataState);
  return useMemo(() => !!initData?.user, [initData]);
}

/**
 * Хук для получения полного имени пользователя
 * @returns Строка с полным именем пользователя
 */
export function useUserDisplayName() {
  const { user } = useUserData();
  
  return useMemo(() => {
    if (user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    return user.firstName;
  }, [user.firstName, user.lastName]);
}

/**
 * Хук для получения аватара пользователя
 * @returns URL аватара или null
 */
export function useUserAvatar() {
  const { user } = useUserData();
  return user.photoUrl || null;
}
