// Types basés sur votre schéma Prisma

import { Gender, Role } from "@prisma/client"

 
  export interface UserType {
    id: string
    email: string
    name: string
    gender: Gender
    role: Role
    profileCompleted: boolean
    goals: string | null
    createdAt: Date
    updatedAt: Date
    emailVerified: boolean
    image: string | null
  }
  
  export interface UserProfileProps {
    user: UserType
  }
  
  export interface ProfileFormData {
    name: string
    goals: string
    gender: Gender
  }
  
  export interface PasswordFormData {
    currentPassword: string
    newPassword: string
    confirmPassword: string
  }