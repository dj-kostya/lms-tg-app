import { useState, useMemo } from 'react';
import { mockNotifications } from '@/data/mockData';
import { useUserData, useUserDisplayName } from './useUserData';
import type { Notification } from '@/types';

/**
 * Хук для работы с уведомлениями пользователя
 * @returns Объект с уведомлениями и методами для работы с ними
 */
export function useNotifications() {
  const { user, isFromTelegram } = useUserData();
  const displayName = useUserDisplayName();
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  // Персонализируем уведомления с именем пользователя
  const personalizedNotifications = useMemo(() => {
    return notifications.map(notification => ({
      ...notification,
      message: notification.message.replace(/\{userName\}/g, displayName.split(' ')[0])
    }));
  }, [notifications, displayName]);

  // Группируем уведомления по дате
  const groupedNotifications = useMemo(() => {
    return personalizedNotifications.reduce((groups, notification) => {
      const date = notification.createdAt.toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(notification);
      return groups;
    }, {} as Record<string, Notification[]>);
  }, [personalizedNotifications]);

  // Статистика уведомлений
  const stats = useMemo(() => {
    const unreadCount = notifications.filter(n => !n.isRead).length;
    const totalCount = notifications.length;
    const byType = notifications.reduce((acc, notification) => {
      acc[notification.type] = (acc[notification.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      unreadCount,
      totalCount,
      byType,
      hasNotifications: totalCount > 0
    };
  }, [notifications]);

  // Методы для работы с уведомлениями
  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => 
        n.id === notificationId 
          ? { ...n, isRead: true }
          : n
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, isRead: true }))
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'createdAt'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const removeNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  return {
    notifications: personalizedNotifications,
    groupedNotifications,
    stats,
    isFromTelegram,
    user,
    markAsRead,
    markAllAsRead,
    clearAll,
    addNotification,
    removeNotification
  };
}
