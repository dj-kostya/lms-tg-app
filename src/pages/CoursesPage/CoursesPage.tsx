import { List } from '@telegram-apps/telegram-ui';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Page } from '@/components/Page.tsx';
import { SchoolCard } from '@/components/SchoolCard/SchoolCard';
import { mockSchools } from '@/data/mockData';
import type { Course } from '@/types';

export const CoursesPage: FC = () => {
  const navigate = useNavigate();
  const handleCourseClick = (course: Course) => {
    navigate(`/education/course/${course.id}`);
  };

  return (
    <Page back={false}>
      <List style={{ paddingBottom: '20px' }}>
        {mockSchools.map((school) => (
          <SchoolCard
            key={school.id}
            school={school}
            onCourseClick={handleCourseClick}
          />
        ))}
      </List>
    </Page>
  );
};
