"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Pencil, Lock } from "lucide-react"
import { UserType, ProfileFormData, PasswordFormData, UserProfileProps } from "./types"
import { Gender, Role } from "@prisma/client"
import ProfileForm from "./forms/profile-form"
import PasswordForm from "./forms/password-form"
import ProfileInfo from "./profile-infos"
import { cn } from "@/lib/utils"

const ProfileHeader = ({
  user,
  onEditClick,
  editState
}: {
  user: UserType
  onEditClick: (state: 'profile' | 'password' | 'none') => void
  editState: 'profile' | 'password' | 'none'
}) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <Card className="border-0 bg-background">
      <CardHeader className="pb-0 pt-6">
        <div className="flex flex-col items-center">
          <Avatar className="h-20 w-20 border border-border">
            <AvatarImage src={user.image || ""} alt={user.name} />
            <AvatarFallback className="text-2xl bg-muted text-muted-foreground">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <div className="mt-4 text-center">
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <div className="flex items-center justify-center gap-2 mt-1">
              <Badge variant="secondary">{user.gender === Gender.MALE ? "Male" : "Female"}</Badge>
              {user.role !== Role.USER && <Badge variant="outline">{user.role}</Badge>}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-4 flex justify-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => onEditClick('profile')} className={cn(editState === 'profile' && "hidden")}>
            <Pencil className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onEditClick('password')} className={cn(editState === 'password' && "hidden")}>
            <Lock className="h-4 w-4 mr-2" />
            Change Password
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export function UserProfile({ user }: UserProfileProps) {
    const [editState, setEditState] = useState<'profile' | 'password' | 'none'>('none')

  const [profileFormData, setProfileFormData] = useState<ProfileFormData>({
    name: user.name,
    goals: user.goals || "",
    gender: user.gender,
  })

  const [passwordFormData, setPasswordFormData] = useState<PasswordFormData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleGenderChange = (value: string) => {
    setProfileFormData((prev) => ({ ...prev, gender: value as Gender }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate profile update
    console.log("Profile updated:", profileFormData)
    setEditState('none')
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate password update
    console.log("Password updated:", passwordFormData)
    setEditState('none')
    setPasswordFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
  }

  return (
    <div className="space-y-6">
      <ProfileHeader
        user={user}
        onEditClick={(state) => setEditState(state)}
        editState={editState}
      />

      {editState === 'profile' && (
        <ProfileForm
          formData={profileFormData}
          onFormDataChange={handleProfileChange}
          onGenderChange={handleGenderChange}
          onSubmit={handleProfileSubmit}
          onCancel={() => setEditState('none')}
        />
      )}

      {editState === 'password' && (
        <PasswordForm
          formData={passwordFormData}
          onFormDataChange={handlePasswordChange}
          onSubmit={handlePasswordSubmit}
          onCancel={() => setEditState('none')}
        />
      )}

      {editState === 'none' && (
        <ProfileInfo user={user} />
      )}
    </div>
  )
}
