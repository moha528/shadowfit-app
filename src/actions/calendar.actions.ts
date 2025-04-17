'use server';

import { CalendarService } from '@/services/calendar.service';

export async function getCalendarData(userId: string, month: Date) {
    try {
        const calendarData = await CalendarService.getCalendarData(userId, month);
        return { success: true, data: calendarData };
    } catch (error) {
        console.error('Error fetching calendar data:', error);
        return { success: false, error: 'Failed to fetch calendar data' };
    }
} 