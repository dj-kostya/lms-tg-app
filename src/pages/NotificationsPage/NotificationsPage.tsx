import type { FC } from 'react';
import {
  Button,
  List,
  Section,
  Text,
  Title,
  Cell,
  Badge,
  Spinner
} from '@telegram-apps/telegram-ui';
import { Page } from '@/components/Page.tsx';
import { useNotifications } from '@/hooks/Notifications';
import type { Notification } from '@/types';

import './NotificationsPage.css';

export const NotificationsPage: FC = () => {
  const { notifications, isLoading } = useNotifications();

  const formatTimeAgo = (date: Date): string => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 60) {
      return `${diffInMinutes} мин назад`;
    } else if (diffInHours < 24) {
      return `${diffInHours} ч назад`;
    } else if (diffInDays < 7) {
      return `${diffInDays} дн назад`;
    } else {
      return date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'short'
      });
    }
  };

  const getPriorityColor = (priority: Notification['priority']): string => {
    switch (priority) {
      case 'high': return 'var(--tg-theme-destructive-text-color)';
      case 'medium': return 'var(--tg-theme-link-color)';
      case 'low': return 'var(--tg-theme-hint-color)';
      default: return 'var(--tg-theme-text-color)';
    }
  };

  const getTypeIcon = (type: Notification['type']): string => {
    switch (type) {
      case 'course_update': return '📚';
      case 'lesson_reminder': return '⏰';
      case 'achievement': return '🏆';
      case 'system': return '🔧';
      case 'promotion': return '🎉';
      default: return '📢';
    }
  };

  const getTypeLabel = (type: Notification['type']): string => {
    switch (type) {
      case 'course_update': return 'Курс';
      case 'lesson_reminder': return 'Напоминание';
      case 'achievement': return 'Достижение';
      case 'system': return 'Система';
      case 'promotion': return 'Акция';
      default: return 'Уведомление';
    }
  };

  const formatGroupDate = (date: Date): string => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Сегодня';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Вчера';
    } else {
      return date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
      });
    }
  };

  if (isLoading) {
    return (
      <Page>
        <div className="notifications-loading">
          <Spinner size="m" />
          <Text>Загрузка...</Text>
        </div>
      </Page>
    );
  }

  return (
    <Page back={false}>
      <div className="notifications-page">
        {/* Заголовок с счетчиком */}
        <div className="notifications-header">
          <div className="header-content">
            <Title level="1">Уведомления</Title>
          </div>
          {notifications.filter((notification) => !notification.isRead).length > 0 && (
            <Badge type="number" className="unread-badge">
              {notifications.filter((notification) => !notification.isRead).length}
            </Badge>
          )}
        </div>

        {/* Действия */}
        {notifications.length > 0 && (
          <div className="notifications-actions">
            <Button
              size="s"
              mode="outline"
              disabled={notifications.filter((notification) => !notification.isRead).length === 0}
            >
              Отметить все как прочитанные
            </Button>
            <Button
              size="s"
              mode="outline"
              onClick={() => {
                notifications.forEach((notification) => {
                  notification.isRead = true;
                });
              }}
            >
              Очистить все
            </Button>
          </div>
        )}

        {/* Список уведомлений */}
        {notifications.length > 0 ? (
          <List>
            {notifications.map((notification) => (
              <Section
                key={notification.id}
                header={<Section.Header>{formatGroupDate(notification.createdAt)}</Section.Header>}
              >
                {notifications
                  .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
                  .map((notification) => (
                    <Cell
                      key={notification.id}
                      before={
                        <div className="notification-icon">
                          {notification.icon || getTypeIcon(notification.type)}
                        </div>
                      }
                      subtitle={
                        <div className="notification-subtitle">
                          <Text className="notification-time">
                            {formatTimeAgo(notification.createdAt)}
                          </Text>
                          <Badge
                            type="number"
                            style={{
                              backgroundColor: getPriorityColor(notification.priority),
                              marginLeft: '8px'
                            }}
                          >
                            {getTypeLabel(notification.type)}
                          </Badge>
                        </div>
                      }
                      after={
                        !notification.isRead && (
                          <div className="unread-indicator" />
                        )
                      }
                      className={`notification-cell ${!notification.isRead ? 'unread' : ''}`}
                    >
                      <div className="notification-content">
                        <Text className="notification-title">
                          {notification.title}
                        </Text>
                        <Text className="notification-message">
                          {notification.message}
                        </Text>
                      </div>
                    </Cell>
                  ))}
              </Section>
            ))}
          </List>
        ) : (
          <div className="notifications-empty">
            <div className="empty-icon">🔔</div>
            <Title level="2">Нет уведомлений</Title>
            <Text className="empty-message">
              Здесь будут появляться важные обновления, напоминания и новости
            </Text>
          </div>
        )}
      </div>
    </Page>
  );
};
