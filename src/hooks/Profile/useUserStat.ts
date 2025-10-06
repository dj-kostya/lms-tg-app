import { useMemo } from "react";

export interface UserStat {
    completedCourses: number;
    completedLessonsCount: number;
    studyStreak: number;
    totalStudyTime: number;
    totalLessons: number;
}

export function useUserStat(): UserStat {
    return useMemo(() => {
        return {
            completedCourses: 0,
            completedLessonsCount: 0,
            studyStreak: 0,
            totalStudyTime: 0,
            totalLessons: 0,
        }
    }, [])
}