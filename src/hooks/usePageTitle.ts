import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { routes } from '@/navigation/routes';
import { findCourseById, findLessonById } from '@/data/mockData';

/**
 * Хук для получения названия текущей страницы
 * @returns Название страницы и дополнительную информацию
 */
export function usePageTitle() {
  const location = useLocation();

  const pageInfo = useMemo(() => {
    const pathname = location.pathname;

    // Проверяем маршруты из routes
    const route = routes.find(r => {
      if (r.path.includes(':')) {
        // Для динамических маршрутов
        const routeParts = r.path.split('/');
        const pathParts = pathname.split('/');
        
        if (routeParts.length !== pathParts.length) return false;
        
        return routeParts.every((part, index) => {
          return part.startsWith(':') || part === pathParts[index];
        });
      }
      return r.path === pathname;
    });

    if (route) {
      // Если у маршрута есть title, используем его
      if (route.title) {
        return {
          title: route.title,
          subtitle: null,
          icon: route.icon
        };
      }

      // Для страниц курсов
      if (pathname.startsWith('/education/course/') && !pathname.includes('/lesson/')) {
        const courseId = pathname.split('/')[3];
        const course = findCourseById(courseId);
        if (course) {
          return {
            title: course.title,
            subtitle: 'Курс',
            icon: '📚'
          };
        }
      }

      // Для страниц уроков
      if (pathname.includes('/lesson/')) {
        const pathParts = pathname.split('/');
        const courseId = pathParts[3];
        const lessonId = pathParts[5];
        
        const course = findCourseById(courseId);
        const lesson = findLessonById(lessonId);
        
        if (course && lesson) {
          return {
            title: lesson.title,
            subtitle: course.title,
            icon: getLessonIcon(lesson.type)
          };
        }
      }
    }

    // Fallback для неизвестных страниц
    return {
      title: 'Обучение',
      subtitle: null,
      icon: '📚'
    };
  }, [location.pathname]);

  return pageInfo;
}

/**
 * Получает иконку для типа урока
 */
function getLessonIcon(type: string): string {
  switch (type) {
    case 'video': return '🎥';
    case 'text': return '📄';
    case 'quiz': return '❓';
    case 'practice': return '💻';
    default: return '📚';
  }
}
