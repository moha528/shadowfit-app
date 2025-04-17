import prisma from "@/lib/prisma"

export const AccountRepository = {
    async findAccountByUserId(userId: string) {
        return await prisma.account.findFirst({
            where: { userId }
        })
    }
    ,
    async updatePassword(id: string, password: string) {
        return await prisma.account.update({
            where: { id },
            data: { password },
        })
    }
}


