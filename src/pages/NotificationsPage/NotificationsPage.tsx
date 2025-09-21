import type { FC } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { SimpleHeader } from '@/components/Header';
import { useNotifications } from '@/hooks/useNotifications';
import type { Notification } from '@/types';

import './NotificationsPage.css';

export const NotificationsPage: FC = () => {
  const navigate = useNavigate();
  const {
    groupedNotifications,
    stats,
    isFromTelegram,
    markAsRead,
    markAllAsRead,
    clearAll
  } = useNotifications();
  const [isLoading, setIsLoading] = useState(false);

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

  const handleNotificationClick = (notification: Notification) => {
    // Помечаем уведомление как прочитанное
    if (!notification.isRead) {
      markAsRead(notification.id);
    }

    // Переходим по ссылке, если она есть
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    }
  };

  const handleMarkAllAsRead = () => {
    setIsLoading(true);
    setTimeout(() => {
      markAllAsRead();
      setIsLoading(false);
    }, 500);
  };

  const handleClearAll = () => {
    setIsLoading(true);
    setTimeout(() => {
      clearAll();
      setIsLoading(false);
    }, 500);
  };

  const formatGroupDate = (dateString: string): string => {
    const date = new Date(dateString);
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
      <SimpleHeader showBackButton={false} className="notifications-page-header" />
      <div className="notifications-page">
        {/* Заголовок с счетчиком */}
        <div className="notifications-header">
          <div className="header-content">
            <Title level="1">Уведомления</Title>
            {isFromTelegram && (
              <Text className="data-source-indicator">
                📱 Данные из Telegram
              </Text>
            )}
          </div>
          {stats.unreadCount > 0 && (
            <Badge type="number" className="unread-badge">
              {stats.unreadCount}
            </Badge>
          )}
        </div>

        {/* Действия */}
        {stats.hasNotifications && (
          <div className="notifications-actions">
            <Button 
              size="s" 
              mode="outline"
              onClick={handleMarkAllAsRead}
              disabled={stats.unreadCount === 0}
            >
              Отметить все как прочитанные
            </Button>
            <Button 
              size="s" 
              mode="outline"
              onClick={handleClearAll}
            >
              Очистить все
            </Button>
          </div>
        )}

        {/* Список уведомлений */}
        {stats.hasNotifications ? (
          <List>
            {Object.entries(groupedNotifications).map(([dateString, dateNotifications]) => (
              <Section 
                key={dateString}
                header={<Section.Header>{formatGroupDate(dateString)}</Section.Header>}
              >
                {dateNotifications
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
                      onClick={() => handleNotificationClick(notification)}
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
