import { List, Section } from '@telegram-apps/telegram-ui';
import type { FC } from 'react';
import type { Lesson } from '@/types';

import { LessonCard } from '@/components/LessonCard';
import './LessonsList.css';

interface LessonsListProps {
  lessons: Lesson[];
  courseId?: string;
  onLessonClick?: (lesson: Lesson) => void;
}

export const LessonsList: FC<LessonsListProps> = ({ lessons, courseId, onLessonClick }) => {
  if (!lessons || lessons.length === 0) {
    return null;
  }

  const sortedLessons = [...lessons].sort((a, b) => a.order - b.order);

  return (
    <Section 
      header={
        <Section.Header>
          Программа курса ({lessons.length} уроков)
        </Section.Header>
      }
    >
      <div className="lessons-list-container">
        <List>
          {sortedLessons.map((lesson, index) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              index={index}
              courseId={courseId || ''}
              onClick={onLessonClick}
            />
          ))}
        </List>
      </div>
    </Section>
  );
};
