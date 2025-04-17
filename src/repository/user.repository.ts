import prisma from "@/lib/prisma"
import { User } from "@prisma/client";

export const UserRepository = {
    async createUser(data: User) {
        return await prisma.user.create({
            data,
        })
    },

    async updateUser(id: string, data: Partial<User>) {
        return await prisma.user.update({
            where: { id },
            data,
        })
    },

    async deleteUser(id: string) {
        return await prisma.user.delete({
            where: { id },
        })
    },

    async getAllUsers() {
        return await prisma.user.findMany()
    },

    async getUserById(id: string) {
        return await prisma.user.findUnique({
            where: { id },
        })
    },

    async getUserByEmail(email: string) {
        return await prisma.user.findUnique({
            where: { email },
        })
    },

    async getUsersWithPagination(params: {
        page: number;
        perPage: number;
        sort?: string;
        search?: string;
        filters?: {
            role?: string[];
            gender?: string[];
            profileCompleted?: string[];
        };
    }) {
        const { page, perPage, sort, search, filters } = params;
        const skip = (page - 1) * perPage;

        // Build where clause
        const where: any = {};

        if (search) {
            where.OR = [
                { name: { contains: search, mode: "insensitive" } },
                { email: { contains: search, mode: "insensitive" } },
            ];
        }

        if (filters?.role?.length) {
            where.role = { in: filters.role };
        }

        if (filters?.gender?.length) {
            where.gender = { in: filters.gender };
        }

        if (filters?.profileCompleted?.length) {
            // Handle profileCompleted filter
            const booleanValues = filters.profileCompleted.map(v => v === "true");
            // If both true and false are selected, don't apply the filter
            if (!(booleanValues.includes(true) && booleanValues.includes(false))) {
                where.profileCompleted = booleanValues[0];
            }
        }

        // Build orderBy
        let orderBy: any = { createdAt: "desc" };
        if (sort) {
            const [column, order] = sort.split(".");
            orderBy = { [column]: order };
        }

        const totalUsers = await prisma.user.count({ where });

        const users = await prisma.user.findMany({
            where,
            orderBy,
            skip,
            take: perPage,
            select: {
                id: true,
                email: true,
                name: true,
                gender: true,
                role: true,
                profileCompleted: true,
                createdAt: true,
                updatedAt: true,
                emailVerified: true,
                image: true,
            },
        });

        return { users, totalUsers };
    }
}
