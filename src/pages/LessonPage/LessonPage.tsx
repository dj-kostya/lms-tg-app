import type { FC } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Button, 
  List, 
  Section, 
  Placeholder,
  Text,
  Title,
  Cell,
  Navigation,
  Avatar
} from '@telegram-apps/telegram-ui';
import { Page } from '@/components/Page.tsx';
import { SimpleHeader } from '@/components/Header';
import { findCourseById, findSchoolByCourseId } from '@/data/mockData';
import type { Lesson } from '@/types';

import './LessonPage.css';

export const LessonPage: FC = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();

  if (!courseId || !lessonId) {
    return (
      <Page back={true}>
        <Placeholder
          header="Ошибка"
          description="ID курса или урока не указан"
        />
      </Page>
    );
  }

  const course = findCourseById(courseId);
  const school = findSchoolByCourseId(courseId);

  if (!course) {
    return (
      <Page back={true}>
        <Placeholder
          header="Курс не найден"
          description={`Курс с ID "${courseId}" не существует`}
        />
      </Page>
    );
  }

  const lesson = course.lessons?.find(l => l.id === lessonId);

  if (!lesson) {
    return (
      <Page back={true}>
        <Placeholder
          header="Урок не найден"
          description={`Урок с ID "${lessonId}" не существует в курсе "${course.title}"`}
        />
      </Page>
    );
  }

  const getLessonTypeIcon = (type: Lesson['type']) => {
    switch (type) {
      case 'video': return '🎥';
      case 'text': return '📖';
      case 'quiz': return '❓';
      case 'practice': return '💻';
      default: return '📚';
    }
  };

  const getLessonTypeText = (type: Lesson['type']) => {
    switch (type) {
      case 'video': return 'Видео урок';
      case 'text': return 'Текстовый урок';
      case 'quiz': return 'Тест';
      case 'practice': return 'Практическое задание';
      default: return 'Урок';
    }
  };

  const handleStartLesson = () => {
    // TODO: Implement lesson start logic
    console.log('Starting lesson:', lesson.id);
  };

  const handleCompleteLesson = () => {
    // TODO: Implement lesson completion logic
    console.log('Completing lesson:', lesson.id);
  };

  return (
    <Page back={true}>
      <SimpleHeader className="lesson-page-header" />
      <div className="lesson-page">
        <List>
          {/* Заголовок урока */}
          <Section>
            <div className="lesson-header">
              <div className="lesson-type-badge">
                <span className="lesson-type-icon">{getLessonTypeIcon(lesson.type)}</span>
                <span className="lesson-type-text">{getLessonTypeText(lesson.type)}</span>
              </div>
              <Title level="2" className="lesson-title">
                {lesson.title}
              </Title>
              <Text className="lesson-duration">
                ⏱️ {lesson.duration}
              </Text>
            </div>
          </Section>

          {/* Информация о курсе */}
          <Section header={<Section.Header>Информация о курсе</Section.Header>}>
            <Cell
              before={
                course.imageUrl ? (
                  <Avatar src={course.imageUrl} size={48} />
                ) : (
                  <div className="course-avatar-placeholder">
                    📚
                  </div>
                )
              }
              after={<Navigation />}
              subtitle={school?.name}
              onClick={() => navigate(`/education/course/${course.id}`)}
            >
              <Title level="3">{course.title}</Title>
            </Cell>
          </Section>

          {/* Описание урока */}
          <Section header={<Section.Header>Описание урока</Section.Header>}>
            <Text className="lesson-description">
              {lesson.description}
            </Text>
          </Section>

          {/* Содержание урока в зависимости от типа */}
          <Section header={<Section.Header>Содержание урока</Section.Header>}>
            {lesson.type === 'video' && (
              <div className="lesson-content">
                <div className="video-placeholder">
                  <div className="video-icon">🎥</div>
                  <Text>Видео урок будет загружен здесь</Text>
                  <Text className="video-note">
                    Нажмите "Начать урок" для просмотра
                  </Text>
                </div>
              </div>
            )}

            {lesson.type === 'text' && (
              <div className="lesson-content">
                <div className="text-content">
                  <Text>
                    Здесь будет размещен текстовый материал урока. 
                    Вы можете изучать его в удобном для вас темпе.
                  </Text>
                  <Text className="text-note">
                    Материал будет доступен после нажатия "Начать урок"
                  </Text>
                </div>
              </div>
            )}

            {lesson.type === 'quiz' && (
              <div className="lesson-content">
                <div className="quiz-content">
                  <Text>
                    Этот урок содержит тестовые вопросы для проверки ваших знаний.
                  </Text>
                  <Text className="quiz-note">
                    Тест будет доступен после нажатия "Начать урок"
                  </Text>
                </div>
              </div>
            )}

            {lesson.type === 'practice' && (
              <div className="lesson-content">
                <div className="practice-content">
                  <Text>
                    Практическое задание для закрепления материала.
                  </Text>
                  <Text className="practice-note">
                    Задание будет доступно после нажатия "Начать урок"
                  </Text>
                </div>
              </div>
            )}
          </Section>

          {/* Кнопки действий */}
          <Section>
            <div className="lesson-actions">
              <Button 
                size="l" 
                stretched
                className="start-lesson-button"
                onClick={handleStartLesson}
              >
                {lesson.isCompleted ? 'Повторить урок' : 'Начать урок'}
              </Button>
              
              {!lesson.isCompleted && (
                <Button 
                  size="m" 
                  stretched
                  mode="outline"
                  className="complete-lesson-button"
                  onClick={handleCompleteLesson}
                >
                  Отметить как завершенный
                </Button>
              )}
            </div>
          </Section>
        </List>
      </div>
    </Page>
  );
};
