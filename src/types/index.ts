export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string; // например "45 минут"
  type: 'video' | 'text' | 'quiz' | 'practice';
  isCompleted?: boolean;
  order: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  price?: number;
  duration?: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
  lessons?: Lesson[];
}

export interface School {
  id: string;
  name: string;
  description: string;
  courses: Course[];
  imageUrl?: string;
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName?: string;
  username?: string;
  photoUrl?: string;
  email?: string;
  phone?: string;
  joinDate: Date;
  level: 'beginner' | 'intermediate' | 'advanced';
  totalCourses: number;
  completedCourses: number;
  totalLessons: number;
  completedLessonsCount: number;
  studyStreak: number; // дни подряд
  totalStudyTime: number; // в минутах
  achievements: Achievement[];
  enrolledCourses: string[]; // ID курсов
  completedLessons: string[]; // ID уроков
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  type: 'course_completion' | 'lesson_completion' | 'study_streak' | 'time_spent';
}

export interface StudyStats {
  thisWeek: {
    lessonsCompleted: number;
    studyTime: number; // в минутах
    coursesStarted: number;
  };
  thisMonth: {
    lessonsCompleted: number;
    studyTime: number;
    coursesCompleted: number;
  };
  allTime: {
    lessonsCompleted: number;
    studyTime: number;
    coursesCompleted: number;
    achievementsUnlocked: number;
  };
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'course_update' | 'lesson_reminder' | 'achievement' | 'system' | 'promotion';
  isRead: boolean;
  createdAt: Date;
  actionUrl?: string; // URL для перехода при клике
  icon?: string; // эмодзи или иконка
  priority: 'low' | 'medium' | 'high';
  courseId?: string; // ID курса, если уведомление связано с курсом
  lessonId?: string; // ID урока, если уведомление связано с уроком
}
