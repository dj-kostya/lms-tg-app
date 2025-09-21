import type { FC } from 'react';
import { Text, Title } from '@telegram-apps/telegram-ui';
import type { Course } from '@/types';

import './CourseCard.css';

interface CourseCardProps {
  course: Course;
  onClick?: (course: Course) => void;
}

export const CourseCard: FC<CourseCardProps> = ({ course, onClick }) => {
  const handleClick = () => {
    onClick?.(course);
  };

  return (
    <div className="course-card" onClick={handleClick}>
      {course.imageUrl && (
        <img
          src={course.imageUrl}
          alt={course.title}
          className="course-card__image"
        />
      )}
      <div className="course-card__content">
        <Title level="3" className="course-card__title">
          {course.title}
        </Title>
        <Text className="course-card__description">
          {course.description}
        </Text>
      </div>
    </div>
  );
};
