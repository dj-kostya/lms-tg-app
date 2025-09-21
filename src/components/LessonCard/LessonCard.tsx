import { Cell, Navigation } from '@telegram-apps/telegram-ui';
import { useNavigate } from 'react-router-dom';
import type { FC } from 'react';
import type { Lesson } from '@/types';

import './LessonCard.css';

interface LessonCardProps {
  lesson: Lesson;
  index: number;
  courseId: string;
  onClick?: (lesson: Lesson) => void;
}

export const LessonCard: FC<LessonCardProps> = ({ lesson, index, courseId, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Сначала вызываем callback, если он есть
    onClick?.(lesson);
    
    // Затем переходим к уроку
    navigate(`/education/course/${courseId}/lesson/${lesson.id}`);
  };

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
      case 'video': return 'Видео';
      case 'text': return 'Текст';
      case 'quiz': return 'Тест';
      case 'practice': return 'Практика';
      default: return 'Урок';
    }
  };

  return (
    <Cell
      before={
        <div className="lesson-card__number">
          {index + 1}
        </div>
      }
      after={
        <Navigation>
          {getLessonTypeIcon(lesson.type)}
        </Navigation>
      }
      subtitle={
        <span className="lesson-card__subtitle">
          {lesson.duration} • {getLessonTypeText(lesson.type)}
        </span>
      }
      onClick={handleClick}
    >
      <div className="lesson-card__content">
        <div className="lesson-card__title">{lesson.title}</div>
        <div className="lesson-card__description">{lesson.description}</div>
      </div>
    </Cell>
  );
};
