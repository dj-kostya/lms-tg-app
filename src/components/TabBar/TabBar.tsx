import { Tabbar } from '@telegram-apps/telegram-ui';
import { Icon28Edit } from '@telegram-apps/telegram-ui/dist/icons/28/edit';
import { Icon24Person } from '@/icons';
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
    id: 'education',
    path: '/',
    label: 'Обучение',
    icon: (
      <Icon28Edit />
    ),
  },
  {
    id: 'profile',
    path: '/profile',
    label: 'Личный кабинет',
    icon: (
      <Icon24Person />
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
