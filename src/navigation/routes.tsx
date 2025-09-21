import type { ComponentType } from 'react';

import { CoursesPage } from '@/pages/CoursesPage/CoursesPage';
import { CoursePage } from '@/pages/CoursePage';
import { LessonPage } from '@/pages/LessonPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { NotificationsPage } from '@/pages/NotificationsPage';

interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
}

export const routes: Route[] = [
  { path: '/notifications', Component: NotificationsPage, title: 'Уведомления' },
  { path: '/education', Component: CoursesPage, title: 'Обучение' },
  { path: '/education/course/:id', Component: CoursePage },
  { path: '/education/course/:courseId/lesson/:lessonId', Component: LessonPage },
  { path: '/profile', Component: ProfilePage, title: 'Личный кабинет' },
];
