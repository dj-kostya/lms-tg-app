import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Text,
  Avatar,
  Cell
} from '@telegram-apps/telegram-ui';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useUserData, useUserDisplayName, useUserAvatar } from '@/hooks/useUserData';

import './Header.css';

interface HeaderProps {
  showBackButton?: boolean;
  onBackClick?: () => void;
  className?: string;
}

export const Header: FC<HeaderProps> = ({
  showBackButton = true,
  onBackClick,
  className = ''
}) => {
  const navigate = useNavigate();
  const { title, subtitle, icon } = usePageTitle();
  const { } = useUserData();
  const displayName = useUserDisplayName();
  const avatarUrl = useUserAvatar();

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate(-1);
    }
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <div className={`app-header ${className}`}>
      <div className="header-content">
        {/* Левая часть - кнопка назад и иконка страницы */}
        <div className="header-left">
          {showBackButton && (
            <Button
              size="s"
              mode="outline"
              onClick={handleBackClick}
              className="back-button"
            >
              ←
            </Button>
          )}
          <div className="page-info">
            {icon && (
              <div className="page-icon">
                {icon}
              </div>
            )}
            <div className="page-title-section">
              <Text className="page-title">
                {title}
              </Text>
              {subtitle && (
                <Text className="page-subtitle">
                  {subtitle}
                </Text>
              )}
            </div>
          </div>
        </div>

        {/* Правая часть - аватар пользователя */}
        <div className="header-right">
          <Cell
            before={
              <Avatar 
                src={avatarUrl || undefined} 
                size={24}
                className="user-avatar"
              />
            }
            subtitle={displayName.split(' ')[0]}
            onClick={handleProfileClick}
            className="profile-cell"
          />
        </div>
      </div>
    </div>
  );
};
