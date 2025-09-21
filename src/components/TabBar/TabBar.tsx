import { Tabbar } from '@telegram-apps/telegram-ui';
import { useLocation, useNavigate } from 'react-router-dom';
import type { FC } from 'react';

import './TabBar.css';

interface TabItem {
  id: string;
  path: string;
  label: string;
  icon: JSX.Element;
}

const tabs: TabItem[] = [
  {
    id: 'notifications',
    path: '/notifications',
    label: 'Уведомления',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    id: 'education',
    path: '/education',
    label: 'Обучение',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 56 56"
        fill="none"
      >
        <path
          d="M28 56C43.464 56 56 43.464 56 28C56 12.536 43.464 0 28 0C12.536 0 0 12.536 0 28C0 43.464 12.536 56 28 56Z"
          fill="currentColor"
        />
        <path
          d="M37.5603 15.6277H18.4386C14.9228 15.6277 12.6944 19.4202 14.4632 22.4861L26.2644 42.9409C27.0345 44.2765 28.9644 44.2765 29.7345 42.9409L41.5381 22.4861C43.3045 19.4251 41.0761 15.6277 37.5627 15.6277H37.5603ZM26.2548 36.8068L23.6847 31.8327L17.4833 20.7414C17.0742 20.0315 17.5795 19.1218 18.4362 19.1218H26.2524V36.8092L26.2548 36.8068ZM38.5108 20.739L32.3118 31.8351L29.7417 36.8068V19.1194H37.5579C38.4146 19.1194 38.9199 20.0291 38.5108 20.739Z"
          fill="white"
        />
      </svg>
    ),
  },
  {
    id: 'profile',
    path: '/profile',
    label: 'Личный кабинет',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
];

export const TabBar: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleTabClick = (path: string) => {
    navigate(path);
  };

  return (
    <Tabbar>
      {tabs.map((tab) => (
        <Tabbar.Item
          key={tab.id}
          text={tab.label}
          selected={location.pathname === tab.path}
          onClick={() => handleTabClick(tab.path)}
        >
          {tab.icon}
        </Tabbar.Item>
      ))}
    </Tabbar>
  );
};
