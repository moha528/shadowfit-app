import { CalendarRepository } from '@/repository/calendar.repository';
import { startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { DayOfWeek } from '@prisma/client';

export class CalendarService {
    static async getCalendarData(userId: string, month: Date) {
        const startDate = startOfMonth(month);
        const endDate = endOfMonth(month);

        // Récupérer le programme et les sessions d'entraînement
        const [program, trainingSessions] = await Promise.all([
            CalendarRepository.getProgramWithDays(userId),
            CalendarRepository.getTrainingSessions(userId, startDate, endDate)
        ]);

        // Générer tous les jours du mois
        const days = eachDayOfInterval({ start: startDate, end: endDate });

        // Mapper les jours avec les données du programme et des sessions
        return days.map(date => {
            const dayOfWeek = this.getDayOfWeek(date);
            const programDay = program?.days.find(d => d.dayOfWeek === dayOfWeek);
            const trainingSession = trainingSessions.find(
                session => session.date.toISOString().split('T')[0] === date.toISOString().split('T')[0]
            );

            return {
                date,
                isCurrentMonth: true,
                programDay: programDay ? {
                    dayOfWeek: programDay.dayOfWeek,
                    muscleTargets: programDay.muscleTargets
                } : undefined,
                trainingSession: trainingSession ? {
                    id: trainingSession.id,
                    exercises: trainingSession.exercises.map(exercise => ({
                        id: exercise.id,
                        name: exercise.name,
                        muscleGroups: exercise.muscleGroups
                    }))
                } : undefined
            };
        });
    }

    private static getDayOfWeek(date: Date): DayOfWeek {
        const days: DayOfWeek[] = [
            DayOfWeek.SUNDAY,
            DayOfWeek.MONDAY,
            DayOfWeek.TUESDAY,
            DayOfWeek.WEDNESDAY,
            DayOfWeek.THURSDAY,
            DayOfWeek.FRIDAY,
            DayOfWeek.SATURDAY
        ];
        return days[date.getDay()];
    }
} 