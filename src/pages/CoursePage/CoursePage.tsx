import type { FC } from 'react';
import { useParams } from 'react-router-dom';
import { List, Section, Text, Title } from '@telegram-apps/telegram-ui';
import { Page } from '@/components/Page.tsx';
import { findCourseById, findSchoolByCourseId } from '@/data/mockData';
import { LessonsList } from '@/components/LessonsList';
import type { Lesson } from '@/types';

import './CoursePage.css';

export const CoursePage: FC = () => {
    const { id } = useParams();

    if (!id) {
        return (
            <Page back={true}>
                <div style={{ padding: '20px', textAlign: 'center' }}>
                    <Title level="1">Ошибка</Title>
                    <Text>ID курса не указан</Text>
                </div>
            </Page>
        );
    }

    const course = findCourseById(id);
    const school = findSchoolByCourseId(id);

    if (!course) {
        return (
            <Page back={true}>
                <div style={{ padding: '20px', textAlign: 'center' }}>
                    <Title level="1">Курс не найден</Title>
                    <Text>Курс с ID "{id}" не существует</Text>
                </div>
            </Page>
        );
    }

    const getLevelText = (level?: string) => {
        switch (level) {
            case 'beginner': return 'Начинающий';
            case 'intermediate': return 'Средний';
            case 'advanced': return 'Продвинутый';
            default: return 'Не указан';
        }
    };

    const handleLessonClick = (lesson: Lesson) => {
        // TODO: Implement lesson navigation
        console.log('Lesson clicked:', lesson);
    };

    return (
        <Page back={true}>
            <div className="course-page">
                <List>
                    {course.imageUrl && (
                        <Section>
                            <img
                                src={course.imageUrl}
                                alt={course.title}
                                className="course-image"
                            />
                        </Section>
                    )}

                    <Section>
                        <Title level="1" className="course-title">
                            {course.title}
                        </Title>
                        {school && (
                            <Text className="course-school">
                                Школа: {school.name}
                            </Text>
                        )}
                        <Text className="course-description">
                            {course.description}
                        </Text>
                    </Section>

                    <Section>
                        <div className="course-info-section">
                            {course.price && (
                                <div className="course-info-item">
                                    <span className="course-info-label">Цена:</span>
                                    <span className="course-info-value course-price">
                                        {course.price.toLocaleString('ru-RU')} ₽
                                    </span>
                                </div>
                            )}

                            {course.duration && (
                                <div className="course-info-item">
                                    <span className="course-info-label">Длительность:</span>
                                    <span className="course-info-value">{course.duration}</span>
                                </div>
                            )}

                            {course.level && (
                                <div className="course-info-item">
                                    <span className="course-info-label">Уровень:</span>
                                    <span className="course-info-value">{getLevelText(course.level)}</span>
                                </div>
                            )}
                        </div>
                    </Section>

                </List>

                {course.lessons && course.lessons.length > 0 && (
                    <LessonsList
                        lessons={course.lessons}
                        courseId={course.id}
                        onLessonClick={handleLessonClick}
                    />
                )}

            </div>
        </Page>
    );
};
