import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

export async function main() {
  console.log("🌱 Début du processus de seeding...")

  const hashedPassword = "$2b$10$zTbYnxmL6Vi9YIAkD4rw6uJ.ooX3zZSZdTYSILy48GF/eRwr/KkWG" // password: passer123
  const isHashed = await bcrypt.compare("passer123", hashedPassword)
  console.log(isHashed)

  try {
    // Delete existing seed data
    console.log("🗑️ Suppression des données de seed existantes...")
    const users = await prisma.user.findMany({
      where: {
        email: {
          in: ['demo@gmail.com', 'user@example.com']
        }
      }
    })
    const userIds = users.map(user => user.id)
    
    await prisma.account.deleteMany({
      where: {
        userId: {
          in: userIds
        }
      }
    })
    await prisma.user.deleteMany({
      where: {
        email: {
          in: ['demo@gmail.com', 'user@example.com']
        }
      }
    })
    console.log("✅ Données de seed existantes supprimées avec succès")

    // Création du compte administrateur
    console.log("👤 Création du compte administrateur...")
    const admin = await prisma.user.create({
      data: {
        email: "demo@gmail.com", 
        name: "Admin Demo",
        role: "ADMIN",
        emailVerified: true,
        profileCompleted: true,
      }
    })
    console.log("✅ Compte administrateur créé avec succès")

    // Création du compte associé pour le mot de passe
    console.log("🔑 Création des identifiants administrateur...")
    await prisma.account.create({
      data: {
        id: `acc_${admin.id}`,
        accountId: admin.id,
        providerId: "credentials", 
        userId: admin.id,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    })
    console.log("✅ Identifiants administrateur créés avec succès")

    // Création d'un compte utilisateur vérifié
    console.log("👤 Création du compte utilisateur...")
    const user = await prisma.user.create({
      data: {
        email: "user@example.com",
        name: "User Demo", 
        role: "USER",
        emailVerified: true,
        profileCompleted: true,
      }
    })
    console.log("✅ Compte utilisateur créé avec succès")

    // Création du compte associé pour le mot de passe
    console.log("🔑 Création des identifiants utilisateur...")
    await prisma.account.create({
      data: {
        id: `acc_${user.id}`,
        accountId: user.id,
        providerId: "credentials",
        userId: user.id,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    })
    console.log("✅ Identifiants utilisateur créés avec succès")

    console.log("✨ Seeding terminé avec succès!")
  } catch (error) {
    console.error("❌ Erreur lors du seeding:", error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error("❌ Erreur fatale:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    console.log("🔌 Connexion à la base de données fermée")
  })