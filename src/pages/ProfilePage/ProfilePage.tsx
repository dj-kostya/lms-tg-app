import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  List,
  Section,
  Text,
  Title,
  Cell,
  Avatar,
  Progress,
  Badge
} from '@telegram-apps/telegram-ui';
import { Page } from '@/components/Page.tsx';
import { SimpleHeader } from '@/components/Header';
import { mockStudyStats, findCourseById, findSchoolByCourseId } from '@/data/mockData';
import { useUserData, useUserDisplayName } from '@/hooks/useUserData';
import { useAuthContext } from '@/components/AuthProvider';
import type { UserProfile } from '@/types';

import './ProfilePage.css';

export const ProfilePage: FC = () => {
  const navigate = useNavigate();
  const { user: profile, isFromTelegram, isFromAuth } = useUserData();
  const displayName = useUserDisplayName();
  const stats = mockStudyStats;
  
  // Получаем контекст авторизации для кнопки выхода
  let authContext: ReturnType<typeof useAuthContext> | null = null;
  try {
    authContext = useAuthContext();
  } catch {
    console.log('Контекст недоступен');
    // Контекст недоступен
  }

  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}ч ${mins}м`;
    }
    return `${mins}м`;
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getLevelText = (level: UserProfile['level']): string => {
    switch (level) {
      case 'beginner': return 'Начинающий';
      case 'intermediate': return 'Средний';
      case 'advanced': return 'Продвинутый';
      default: return 'Неизвестно';
    }
  };

  const getLevelColor = (level: UserProfile['level']): string => {
    switch (level) {
      case 'beginner': return 'var(--tg-theme-button-color)';
      case 'intermediate': return 'var(--tg-theme-link-color)';
      case 'advanced': return 'var(--tg-theme-destructive-text-color)';
      default: return 'var(--tg-theme-text-color)';
    }
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

  const handleViewEnrolledCourses = () => {
    navigate('/education');
  };

  const handleLogout = () => {
    if (authContext) {
      authContext.logout();
    }
  };

  return (
    <Page back={false}>
      <SimpleHeader showBackButton={false} className="profile-page-header" />
      <div className="profile-page">
        <List>
          {/* Заголовок профиля */}
          <Section>
            <div className="profile-header">
              <div className="profile-avatar-section">
                <Avatar 
                  src={profile.photoUrl} 
                  size={96}
                  className="profile-avatar"
                />
                <div className="profile-level-badge">
                  <Badge 
                    type="number" 
                    style={{ backgroundColor: getLevelColor(profile.level) }}
                  >
                    {getLevelText(profile.level)}
                  </Badge>
                </div>
              </div>
              
              <div className="profile-info">
                <Title level="2" className="profile-name">
                  {displayName}
                </Title>
                {profile.username && (
                  <Text className="profile-username">
                    @{profile.username}
                  </Text>
                )}
                <Text className="profile-join-date">
                  Участник с {formatDate(profile.joinDate)}
                </Text>
                {isFromAuth && (
                  <Text className="profile-source">
                    🔐 Авторизован через API
                  </Text>
                )}
                {isFromTelegram && !isFromAuth && (
                  <Text className="profile-source">
                    📱 Данные из Telegram
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
                <Text className="stat-value">{profile.completedCourses}</Text>
                <Text className="stat-label">Курсов завершено</Text>
              </div>
              <div className="stat-item">
                <Text className="stat-value">{profile.completedLessonsCount}</Text>
                <Text className="stat-label">Уроков завершено</Text>
              </div>
              <div className="stat-item">
                <Text className="stat-value">{profile.studyStreak}</Text>
                <Text className="stat-label">Дней подряд</Text>
              </div>
              <div className="stat-item">
                <Text className="stat-value">{formatTime(profile.totalStudyTime)}</Text>
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
                    {getProgressPercentage(profile.completedLessonsCount, profile.totalLessons)}%
                  </Text>
                </div>
                <Progress 
                  value={getProgressPercentage(profile.completedLessonsCount, profile.totalLessons)} 
                  className="progress-bar"
                />
                <Text className="progress-details">
                  {profile.completedLessonsCount} из {profile.totalLessons} уроков
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
              {profile.achievements.slice(0, 3).map((achievement) => (
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

          {/* Активные курсы */}
          <Section 
            header={<Section.Header>Активные курсы</Section.Header>}
            footer={
              <Button 
                size="s" 
                mode="outline" 
                stretched
                onClick={handleViewEnrolledCourses}
              >
                Все курсы
              </Button>
            }
          >
            {profile.enrolledCourses.slice(0, 2).map((courseId) => {
              const course = findCourseById(courseId);
              const school = findSchoolByCourseId(courseId);
              
              if (!course) return null;

              const completedLessonsInCourse = profile.completedLessons.filter(
                lessonId => course.lessons?.some(lesson => lesson.id === lessonId)
              ).length;
              
              const totalLessonsInCourse = course.lessons?.length || 0;
              const progress = getProgressPercentage(completedLessonsInCourse, totalLessonsInCourse);

              return (
                <Cell
                  key={courseId}
                  before={
                    course.imageUrl ? (
                      <Avatar src={course.imageUrl} size={48} />
                    ) : (
                      <div className="course-avatar-placeholder">
                        📚
                      </div>
                    )
                  }
                  subtitle={school?.name}
                  after={
                    <div className="course-progress">
                      <Text className="course-progress-text">{progress}%</Text>
                      <Progress value={progress} />
                    </div>
                  }
                  onClick={() => navigate(`/education/course/${course.id}`)}
                >
                  <Title level="3">{course.title}</Title>
                </Cell>
              );
            })}
          </Section>

          {/* Статистика по периодам */}
          <Section header={<Section.Header>Активность</Section.Header>}>
            <div className="activity-stats">
              <div className="activity-period">
                <Text className="activity-period-title">На этой неделе</Text>
                <div className="activity-items">
                  <Text className="activity-item">
                    📚 {stats.thisWeek.lessonsCompleted} уроков
                  </Text>
                  <Text className="activity-item">
                    ⏱️ {formatTime(stats.thisWeek.studyTime)}
                  </Text>
                  <Text className="activity-item">
                    🎯 {stats.thisWeek.coursesStarted} курсов начато
                  </Text>
                </div>
              </div>

              <div className="activity-period">
                <Text className="activity-period-title">В этом месяце</Text>
                <div className="activity-items">
                  <Text className="activity-item">
                    📚 {stats.thisMonth.lessonsCompleted} уроков
                  </Text>
                  <Text className="activity-item">
                    ⏱️ {formatTime(stats.thisMonth.studyTime)}
                  </Text>
                  <Text className="activity-item">
                    🏆 {stats.thisMonth.coursesCompleted} курсов завершено
                  </Text>
                </div>
              </div>
            </div>
          </Section>

          {/* Контактная информация */}
          <Section header={<Section.Header>Контактная информация</Section.Header>}>
            {profile.email && (
              <Cell
                before={<div className="contact-icon">📧</div>}
                subtitle="Email"
              >
                <Text>{profile.email}</Text>
              </Cell>
            )}
            {profile.phone && (
              <Cell
                before={<div className="contact-icon">📱</div>}
                subtitle="Телефон"
              >
                <Text>{profile.phone}</Text>
              </Cell>
            )}
          </Section>

          {/* Кнопка выхода */}
          {authContext && authContext.isAuthenticated && (
            <Section>
              <Button 
                size="m" 
                mode="gray"
                stretched
                onClick={handleLogout}
              >
                Выйти из аккаунта
              </Button>
            </Section>
          )}
        </List>
      </div>
    </Page>
  );
};
