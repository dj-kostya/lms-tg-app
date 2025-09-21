import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Text,
  Avatar
} from '@telegram-apps/telegram-ui';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useUserDisplayName, useUserAvatar } from '@/hooks/useUserData';

import './SimpleHeader.css';

interface SimpleHeaderProps {
  showBackButton?: boolean;
  onBackClick?: () => void;
  className?: string;
}

export const SimpleHeader: FC<SimpleHeaderProps> = ({
  showBackButton = true,
  onBackClick,
  className = ''
}) => {
  const navigate = useNavigate();
  const { title, icon } = usePageTitle();
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
    <div className={`simple-header ${className}`}>
      <div className="simple-header-content">
        {/* Левая часть */}
        <div className="simple-header-left">
          {showBackButton && (
            <Button
              size="s"
              mode="outline"
              onClick={handleBackClick}
              className="simple-back-button"
            >
              ←
            </Button>
          )}
          <div className="simple-page-info">
            {icon && (
              <span className="simple-page-icon">
                {icon}
              </span>
            )}
            <Text className="simple-page-title">
              {title}
            </Text>
          </div>
        </div>

        {/* Правая часть */}
        <div className="simple-header-right">
          <Button
            size="s"
            mode="outline"
            onClick={handleProfileClick}
            className="simple-profile-button"
          >
            <Avatar 
              src={avatarUrl || undefined} 
              size={20}
            />
            <Text className="simple-user-name">
              {displayName.split(' ')[0]}
            </Text>
          </Button>
        </div>
      </div>
    </div>
  );
};
