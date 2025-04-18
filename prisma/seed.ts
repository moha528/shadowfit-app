import { PrismaClient } from "@prisma/client"
import * as bcrypt from "bcryptjs"

const prisma = new PrismaClient()

export async function main() {
  // Création du compte administrateur
  const admin = await prisma.user.create({
    data: {
      email: "demo@gmail.com", 
      name: "Admin Demo",
      role: "ADMIN",
      emailVerified: true,
      profileCompleted: true,
    }
  })

  // Création du compte associé pour le mot de passe
  const salt = await bcrypt.genSalt(10)
  const hashedAdminPassword = await bcrypt.hash("demo123", salt)
  await prisma.account.create({
    data: {
      id: `acc_${admin.id}`,
      accountId: admin.id,
      providerId: "credentials", 
      userId: admin.id,
      password: hashedAdminPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  })

  // Création d'un compte utilisateur vérifié
  const user = await prisma.user.create({
    data: {
      email: "user@example.com",
      name: "User Demo", 
      role: "USER",
      emailVerified: true,
      profileCompleted: true,
    }
  })

  // Création du compte associé pour le mot de passe
  const userSalt = await bcrypt.genSalt(10)
  const hashedUserPassword = await bcrypt.hash("user123", userSalt)
  await prisma.account.create({
    data: {
      id: `acc_${user.id}`,
      accountId: user.id,
      providerId: "credentials",
      userId: user.id,
      password: hashedUserPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })