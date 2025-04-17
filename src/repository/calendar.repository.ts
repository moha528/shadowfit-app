import prisma from '@/lib/prisma';

export class CalendarRepository {
    static async getProgramWithDays(userId: string) {
        return prisma.program.findUnique({
            where: { userId },
            include: {
                days: {
                    orderBy: {
                        dayOfWeek: 'asc'
                    }
                }
            }
        });
    }

    static async getTrainingSessions(userId: string, startDate: Date, endDate: Date) {
        return prisma.trainingSession.findMany({
            where: {
                userId,
                date: {
                    gte: startDate,
                    lte: endDate
                }
            },
            include: {
                exercises: true
            }
        });
    }
} 