import type { FC } from 'react';
import {
  Button,
  List,
  Section,
  Text,
  Title,
  Avatar,
  Progress,
} from '@telegram-apps/telegram-ui';
import { Page } from '@/components/Page.tsx';
import { useUserData, useUserDisplayName } from '@/hooks/useUserData';
import { useUserStat, useAchievements } from '@/hooks/Profile';

import './ProfilePage.css';

export const ProfilePage: FC = () => {
  const { user: profile } = useUserData();
  const displayName = useUserDisplayName();
  const userStat = useUserStat();
  const achievements = useAchievements();

  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}ч ${mins}м`;
    }
    return `${mins}м`;
  };

  const getProgressPercentage = (completed: number, total: number): number => {
    if (total === 0) return 0;
    return Math.round((completed / total) * 100);
  };

  const handleEditProfile = () => {
    // TODO: Implement profile editing
    console.log('Edit profile clicked');
  };

  const handleViewAchievements = () => {
    // TODO: Navigate to achievements page
    console.log('View achievements clicked');
  };

  return (
    <Page back={false}>
      <div className="profile-page">
        <List>
          {/* Заголовок профиля */}
          <Section>
            <div className="profile-header">
              <div className="profile-avatar-section">
                {profile?.photo_url && <Avatar
                  src={profile.photo_url}
                  size={96}
                  className="profile-avatar"
                />}
              </div>

              <div className="profile-info">
                <Title level="2" className="profile-name">
                  {displayName}
                </Title>
                {profile?.username && (
                  <Text className="profile-username">
                    @{profile.username}
                  </Text>
                )}
              </div>

              <Button
                size="s"
                mode="outline"
                onClick={handleEditProfile}
                className="edit-profile-button"
              >
                Редактировать
              </Button>
            </div>
          </Section>

          {/* Статистика обучения */}
          <Section header={<Section.Header>Статистика обучения</Section.Header>}>
            <div className="stats-grid">
              <div className="stat-item">
                <Text className="stat-value">{userStat.completedCourses}</Text>
                <Text className="stat-label">Курсов завершено</Text>
              </div>
              <div className="stat-item">
                <Text className="stat-value">{userStat.completedLessonsCount}</Text>
                <Text className="stat-label">Уроков завершено</Text>
              </div>
              <div className="stat-item">
                <Text className="stat-value">{userStat.studyStreak}</Text>
                <Text className="stat-label">Дней подряд</Text>
              </div>
              <div className="stat-item">
                <Text className="stat-value">{formatTime(userStat.totalStudyTime)}</Text>
                <Text className="stat-label">Время обучения</Text>
              </div>
            </div>
          </Section>

          {/* Прогресс по курсам */}
          <Section header={<Section.Header>Прогресс по курсам</Section.Header>}>
            <div className="courses-progress">
              <div className="progress-item">
                <div className="progress-header">
                  <Text className="progress-title">Общий прогресс</Text>
                  <Text className="progress-percentage">
                    {getProgressPercentage(userStat.completedLessonsCount, userStat.totalLessons)}%
                  </Text>
                </div>
                <Progress
                  value={getProgressPercentage(userStat.completedLessonsCount, userStat.totalLessons)}
                  className="progress-bar"
                />
                <Text className="progress-details">
                  {userStat.completedLessonsCount} из {userStat.totalLessons} уроков
                </Text>
              </div>
            </div>
          </Section>

          {/* Достижения */}
          <Section
            header={<Section.Header>Достижения</Section.Header>}
            footer={
              <Button
                size="s"
                mode="outline"
                stretched
                onClick={handleViewAchievements}
              >
                Все достижения
              </Button>
            }
          >
            <div className="achievements-preview">
              {achievements.slice(0, 3).map((achievement) => (
                <div key={achievement.id} className="achievement-item">
                  <div className="achievement-icon">
                    {achievement.icon}
                  </div>
                  <div className="achievement-info">
                    <Text className="achievement-title">{achievement.title}</Text>
                    <Text className="achievement-description">
                      {achievement.description}
                    </Text>
                  </div>
                </div>
              ))}
            </div>
          </Section>

        </List>
      </div>
    </Page>
  );
};
