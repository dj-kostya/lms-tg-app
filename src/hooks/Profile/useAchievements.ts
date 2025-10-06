import { useMemo } from "react";
import { mockAchievements } from "@/data/mockData";
import { Achievement } from "@/types";

export function useAchievements(): Achievement[] {
    return useMemo(() => {
        return mockAchievements;
    }, []);
}