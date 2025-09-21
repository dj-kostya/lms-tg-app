import { Section } from '@telegram-apps/telegram-ui';
import type { FC } from 'react';
import type { School } from '@/types';

import { CourseCard } from '@/components/CourseCard/CourseCard';
import './SchoolCard.css';

interface SchoolCardProps {
  school: School;
  onCourseClick?: (course: any) => void;
}

export const SchoolCard: FC<SchoolCardProps> = ({ school, onCourseClick }) => {
  return (
    <Section header={<Section.Header>{school.name}</Section.Header>}>
      <div className="school-card__courses">
        {school.courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onClick={onCourseClick}
          />
        ))}
      </div>
    </Section>
  );
};
