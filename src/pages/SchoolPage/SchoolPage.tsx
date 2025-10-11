import { type FC } from 'react';
import { Page } from '@/components/Page';
import { Card, List, Section, Text } from '@telegram-apps/telegram-ui';
import { HorizontalScroll } from '@/components/HorizontalScroll';
import { useNavigate } from 'react-router-dom';

export const SchoolPage: FC = () => {
    const navigate = useNavigate();

    return (
        <Page back={false}>
            {/* Hero Section */}
            <Section>
                <img
                    style={{
                        display: 'block',
                        height: 169,
                        width: '100%',
                        objectFit: 'cover',
                        borderRadius: '20px 20px 0 0',
                    }}
                    src="https://images.unsplash.com/photo-1611610436339-496cfcf1c51f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470"
                    alt="School banner"
                />
            </Section>

            <List style={{ padding: '0px 0px' }}>
                {/* Your Courses Section */}
                <Section header={<Section.Header large style={{ marginLeft: '20px', paddingTop: '20px', paddingBottom: '0px' }}>Ваши курсы</Section.Header>} style={{ backgroundColor: '#FFFFFF', borderRadius: '20px 20px 0 0' }}>
                    <HorizontalScroll>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <Card
                                key={index}
                                type="plain"
                                onClick={() => navigate(`/education/course/${index}`)}
                            >
                                <img
                                    alt="Course"
                                    src="https://images.unsplash.com/photo-1611610436339-496cfcf1c51f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470"
                                    style={{
                                        display: 'block',
                                        height: 188,
                                        width: 254,
                                        objectFit: 'cover',
                                        borderRadius: '20px 20px 0 0',
                                    }}
                                />
                                <Card.Cell
                                    readOnly
                                    subtitle="10 уроков, 5 заданий"
                                    description="Доступен еще 15 дней"
                                    style={{ padding: '16px 20px 20px' }}
                                >
                                    <Text style={{
                                        fontWeight: 590,
                                        fontSize: 17,
                                        lineHeight: '1.29em',
                                        letterSpacing: '-0.4px'
                                    }}>
                                        English для начинающих
                                    </Text>
                                </Card.Cell>
                            </Card>
                        ))}
                    </HorizontalScroll>
                    {/* </Section>

                {/* Available for Purchase Section */}
                    <Section.Header large style={{ marginLeft: '20px', paddingTop: '20px', paddingBottom: '0px' }}>Можно приобрести</Section.Header>
                    <HorizontalScroll>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <Card
                                key={index}
                                type="plain"
                                style={{
                                    position: 'relative',
                                }}
                            >
                                <Card.Chip
                                    readOnly
                                    style={{
                                        position: 'absolute',
                                        top: 16,
                                        right: 16,
                                        zIndex: 1,
                                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                        borderRadius: 10,
                                        padding: '10px 12px',
                                        boxShadow: '0px 12px 24px 0px rgba(0, 0, 0, 0.05)',
                                        fontSize: 16,
                                        fontWeight: 600,
                                        color: 'rgba(0, 0, 0, 0.8)',
                                    }}
                                >
                                    1500 руб
                                </Card.Chip>
                                <img
                                    alt="Course"
                                    src="https://images.unsplash.com/photo-1611610436339-496cfcf1c51f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470"
                                    style={{
                                        display: 'block',
                                        height: 188,
                                        width: 254,
                                        objectFit: 'cover',
                                        borderRadius: '20px 20px 0 0',
                                    }}
                                />
                                <Card.Cell
                                    readOnly
                                    subtitle="Следующий курс для изучения"
                                    style={{ padding: '16px 20px 20px' }}
                                >
                                    <Text style={{
                                        fontWeight: 590,
                                        fontSize: 17,
                                        lineHeight: '1.29em',
                                        letterSpacing: '-0.4px'
                                    }}>
                                        English. Продвинутый уровень
                                    </Text>
                                </Card.Cell>
                            </Card>
                        ))}
                    </HorizontalScroll>
                </Section>
            </List>
        </Page>
    );
};