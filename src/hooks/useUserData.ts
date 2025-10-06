import { useMemo } from 'react';
import { initDataState, useSignal } from '@telegram-apps/sdk-react';

/**
 * Хук для получения данных пользователя из контекста авторизации, Telegram Init Data или моков
 * @returns Объект с данными пользователя и информацией о источнике данных
 */
export function useUserData() {
  const initData = useSignal(initDataState);
  return useMemo(() => ({
    user: initData?.user,
  }), [initData]);

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
    if (user?.last_name) {
      return `${user.first_name} ${user.last_name}`;
    }
    if (user?.first_name) {
      return user?.first_name;
    }
    return user?.username || null;
  }, [user?.first_name, user?.last_name, user?.username]);
}

/**
 * Хук для получения аватара пользователя
 * @returns URL аватара или null
 */
export function useUserAvatar() {
  const { user } = useUserData();
  return user?.photo_url || null;
}
