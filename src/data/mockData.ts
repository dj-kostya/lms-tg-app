import type { School, Course, UserProfile, StudyStats, Notification, Lesson } from '@/types';

export const mockSchools: School[] = [
  {
    id: '1',
    name: 'Программирование',
    description: 'Изучите современные языки программирования',
    courses: [
      {
        id: '1-1',
        title: 'JavaScript для начинающих',
        description: 'Изучите основы JavaScript и создайте свои первые приложения',
        price: 15000,
        duration: '2 месяца',
        level: 'beginner',
        imageUrl: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=300&h=200&fit=crop',
        lessons: [
          {
            id: '1-1-1',
            title: 'Введение в JavaScript',
            description: 'Что такое JavaScript, история языка, области применения',
            duration: '45 минут',
            type: 'video',
            order: 1
          },
          {
            id: '1-1-2',
            title: 'Переменные и типы данных',
            description: 'Объявление переменных, основные типы данных в JavaScript',
            duration: '60 минут',
            type: 'video',
            order: 2
          },
          {
            id: '1-1-3',
            title: 'Операторы и выражения',
            description: 'Арифметические, логические и операторы сравнения',
            duration: '50 минут',
            type: 'video',
            order: 3
          },
          {
            id: '1-1-4',
            title: 'Практика: Калькулятор',
            description: 'Создайте простой калькулятор на JavaScript',
            duration: '90 минут',
            type: 'practice',
            order: 4
          },
          {
            id: '1-1-5',
            title: 'Условия и циклы',
            description: 'if/else, switch, for, while - управление потоком выполнения',
            duration: '70 минут',
            type: 'video',
            order: 5
          },
          {
            id: '1-1-6',
            title: 'Тест по основам',
            description: 'Проверьте свои знания основ JavaScript',
            duration: '30 минут',
            type: 'quiz',
            order: 6
          }
        ]
      },
      {
        id: '1-2',
        title: 'React и современный фронтенд',
        description: 'Создавайте интерактивные веб-приложения с React',
        price: 25000,
        duration: '3 месяца',
        level: 'intermediate',
        imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop',
        lessons: [
          {
            id: '1-2-1',
            title: 'Введение в React',
            description: 'Что такое React, компоненты, JSX синтаксис',
            duration: '60 минут',
            type: 'video',
            order: 1
          },
          {
            id: '1-2-2',
            title: 'Создание первого компонента',
            description: 'Создайте свой первый React компонент',
            duration: '45 минут',
            type: 'practice',
            order: 2
          },
          {
            id: '1-2-3',
            title: 'Props и State',
            description: 'Передача данных между компонентами, управление состоянием',
            duration: '75 минут',
            type: 'video',
            order: 3
          },
          {
            id: '1-2-4',
            title: 'Хуки (Hooks)',
            description: 'useState, useEffect и другие хуки',
            duration: '90 минут',
            type: 'video',
            order: 4
          },
          {
            id: '1-2-5',
            title: 'Практика: Todo приложение',
            description: 'Создайте полноценное Todo приложение на React',
            duration: '120 минут',
            type: 'practice',
            order: 5
          }
        ]
      },
      {
        id: '1-3',
        title: 'Node.js и бэкенд разработка',
        description: 'Создавайте серверные приложения на Node.js',
        price: 30000,
        duration: '4 месяца',
        level: 'advanced',
        imageUrl: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=300&h=200&fit=crop'
      }
    ]
  },
  {
    id: '2',
    name: 'Дизайн',
    description: 'Освойте современные инструменты дизайна',
    courses: [
      {
        id: '2-1',
        title: 'UI/UX дизайн',
        description: 'Создавайте удобные и красивые интерфейсы',
        price: 20000,
        duration: '2 месяца',
        level: 'beginner',
        imageUrl: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=300&h=200&fit=crop',
        lessons: [
          {
            id: '2-1-1',
            title: 'Основы UI/UX дизайна',
            description: 'Что такое UI и UX, принципы хорошего дизайна',
            duration: '50 минут',
            type: 'video',
            order: 1
          },
          {
            id: '2-1-2',
            title: 'Цветовая палитра',
            description: 'Психология цвета, создание гармоничных палитр',
            duration: '40 минут',
            type: 'video',
            order: 2
          },
          {
            id: '2-1-3',
            title: 'Типографика',
            description: 'Выбор шрифтов, иерархия текста, читаемость',
            duration: '45 минут',
            type: 'video',
            order: 3
          },
          {
            id: '2-1-4',
            title: 'Практика: Дизайн кнопки',
            description: 'Создайте различные варианты кнопок',
            duration: '60 минут',
            type: 'practice',
            order: 4
          },
          {
            id: '2-1-5',
            title: 'Композиция и сетка',
            description: 'Принципы композиции, работа с сетками',
            duration: '55 минут',
            type: 'video',
            order: 5
          }
        ]
      },
      {
        id: '2-2',
        title: 'Figma для дизайнеров',
        description: 'Освойте профессиональный инструмент для дизайна',
        price: 18000,
        duration: '1 месяц',
        level: 'intermediate',
        imageUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=200&fit=crop'
      },
      {
        id: '2-3',
        title: 'Веб-дизайн и типографика',
        description: 'Изучите принципы веб-дизайна и работу с типографикой',
        price: 22000,
        duration: '2 месяца',
        level: 'intermediate',
        imageUrl: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=300&h=200&fit=crop'
      }
    ]
  },
  {
    id: '3',
    name: 'Маркетинг',
    description: 'Изучите современные методы продвижения',
    courses: [
      {
        id: '3-1',
        title: 'SMM и контент-маркетинг',
        description: 'Продвигайте бренд в социальных сетях',
        price: 16000,
        duration: '2 месяца',
        level: 'beginner',
        imageUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=200&fit=crop'
      },
      {
        id: '3-2',
        title: 'Google Ads и контекстная реклама',
        description: 'Настройте эффективную рекламную кампанию',
        price: 28000,
        duration: '3 месяца',
        level: 'intermediate',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop'
      }
    ]
  }
];

/**
 * Находит курс по ID во всех школах
 * @param courseId - ID курса для поиска
 * @returns Найденный курс или null, если курс не найден
 */
export const findCourseById = (courseId: string): Course | null => {
  for (const school of mockSchools) {
    const course = school.courses.find(course => course.id === courseId);
    if (course) {
      return course;
    }
  }
  return null;
};

/**
 * Находит школу, к которой принадлежит курс
 * @param courseId - ID курса для поиска
 * @returns Школа, содержащая курс, или null, если курс не найден
 */
export const findSchoolByCourseId = (courseId: string): School | null => {
  for (const school of mockSchools) {
    const course = school.courses.find(course => course.id === courseId);
    if (course) {
      return school;
    }
  }
  return null;
};

/**
 * Находит урок по ID
 * @param lessonId - ID урока для поиска
 * @returns Урок или undefined, если урок не найден
 */
export const findLessonById = (lessonId: string): Lesson | undefined => {
  for (const school of mockSchools) {
    for (const course of school.courses) {
      if (course.lessons) {
        const lesson = course.lessons.find(lesson => lesson.id === lessonId);
        if (lesson) return lesson;
      }
    }
  }
  return undefined;
};

// Моковые данные для профиля пользователя
export const mockUserProfile: UserProfile = {
  id: '1',
  firstName: 'Алексей',
  lastName: 'Петров',
  username: 'alex_petrov',
  photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  email: 'alex.petrov@example.com',
  phone: '+7 (999) 123-45-67',
  joinDate: new Date('2024-01-15'),
  level: 'intermediate',
  totalCourses: 5,
  completedCourses: 2,
  totalLessons: 25,
  completedLessonsCount: 12,
  studyStreak: 7,
  totalStudyTime: 1800, // 30 часов
  achievements: [
    {
      id: '1',
      title: 'Первый урок',
      description: 'Завершили свой первый урок',
      icon: '🎯',
      unlockedAt: new Date('2024-01-16'),
      type: 'lesson_completion'
    },
    {
      id: '2',
      title: 'Неделя обучения',
      description: 'Изучали 7 дней подряд',
      icon: '🔥',
      unlockedAt: new Date('2024-01-22'),
      type: 'study_streak'
    },
    {
      id: '3',
      title: 'Первый курс',
      description: 'Завершили свой первый курс',
      icon: '🏆',
      unlockedAt: new Date('2024-02-10'),
      type: 'course_completion'
    },
    {
      id: '4',
      title: '10 часов обучения',
      description: 'Потратили 10 часов на изучение',
      icon: '⏰',
      unlockedAt: new Date('2024-02-15'),
      type: 'time_spent'
    }
  ],
  enrolledCourses: ['1-1', '1-2', '2-1'],
  completedLessons: ['1-1-1', '1-1-2', '1-1-3', '1-1-4', '1-1-5', '1-1-6', '1-2-1', '1-2-2', '2-1-1', '2-1-2', '2-1-3', '2-1-4']
};

export const mockStudyStats: StudyStats = {
  thisWeek: {
    lessonsCompleted: 3,
    studyTime: 180, // 3 часа
    coursesStarted: 1
  },
  thisMonth: {
    lessonsCompleted: 8,
    studyTime: 480, // 8 часов
    coursesCompleted: 1
  },
  allTime: {
    lessonsCompleted: 12,
    studyTime: 1800, // 30 часов
    coursesCompleted: 2,
    achievementsUnlocked: 4
  }
};

export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Новый урок доступен!',
    message: 'В курсе "JavaScript для начинающих" добавлен новый урок "Функции и замыкания"',
    type: 'course_update',
    isRead: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 часа назад
    actionUrl: '/education/course/1-1',
    icon: '📚',
    priority: 'medium',
    courseId: '1-1'
  },
  {
    id: '2',
    title: 'Напоминание об уроке',
    message: '{userName}, не забудьте продолжить изучение курса "React для продвинутых". Последний урок был 3 дня назад.',
    type: 'lesson_reminder',
    isRead: false,
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 часа назад
    actionUrl: '/education/course/1-2',
    icon: '⏰',
    priority: 'high',
    courseId: '1-2'
  },
  {
    id: '3',
    title: 'Поздравляем с достижением!',
    message: '{userName}, вы получили достижение "Первые шаги" за завершение первого урока',
    type: 'achievement',
    isRead: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 день назад
    icon: '🏆',
    priority: 'medium'
  },
  {
    id: '4',
    title: 'Системное обновление',
    message: 'Приложение обновлено до версии 2.1.0. Добавлены новые функции и исправлены ошибки.',
    type: 'system',
    isRead: true,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 дня назад
    icon: '🔧',
    priority: 'low'
  },
  {
    id: '5',
    title: 'Специальное предложение',
    message: 'Скидка 30% на все курсы по программированию до конца месяца!',
    type: 'promotion',
    isRead: false,
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 часов назад
    actionUrl: '/education',
    icon: '🎉',
    priority: 'medium'
  },
  {
    id: '6',
    title: 'Новый курс доступен',
    message: 'Добавлен новый курс "TypeScript для разработчиков". Изучите типизацию в JavaScript!',
    type: 'course_update',
    isRead: true,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 дня назад
    actionUrl: '/education/course/1-3',
    icon: '🆕',
    priority: 'medium',
    courseId: '1-3'
  },
  {
    id: '7',
    title: 'Еженедельный отчет',
    message: '{userName}, на этой неделе вы изучили 3 урока и потратили 2 часа на обучение. Отличная работа!',
    type: 'system',
    isRead: true,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 неделя назад
    icon: '📊',
    priority: 'low'
  },
  {
    id: '8',
    title: 'Напоминание о практике',
    message: '{userName}, не забудьте выполнить практическое задание по уроку "Массивы и объекты"',
    type: 'lesson_reminder',
    isRead: false,
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 часов назад
    actionUrl: '/education/course/1-1/lesson/1-1-5',
    icon: '💻',
    priority: 'high',
    courseId: '1-1',
    lessonId: '1-1-5'
  }
];
