import { Notification } from '@/types';
import { useMemo } from 'react';
import { mockNotifications } from '@/data/mockData';


export interface NotificationsState {
    notifications: Notification[];
    isLoading: boolean;
    error: string | null;
}

export function useNotifications(): NotificationsState {
    return useMemo(() => {
        return {
            notifications: mockNotifications,
            isLoading: false,
            error: null
        };
    }, []);
}
