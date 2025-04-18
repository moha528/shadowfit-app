import { Role } from "@prisma/client"

declare module "better-auth/react" {
  interface User {
    role: Role
  }
} 