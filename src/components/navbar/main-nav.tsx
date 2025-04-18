"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Dumbbell, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogoutButton } from "@/features/auth/logout-button"
import { authClient } from "@/lib/authClient"
import { navigationConfig } from "@/lib/nav-config"
import { Role, User, } from "@prisma/client"

export function MainNav({ user }: { user: User }) {
  const pathname = usePathname()

  const getUserInitials = () => {
    if (!user?.name) return "U"
    return user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  const isAdminRoute = (route: typeof navigationConfig[0]) => {
    return route.roles.length === 1 && route.roles[0] === Role.ADMIN
  }

  const isUserAdmin = user.role === Role.ADMIN

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-black">
      <div className="flex h-16 items-center px-4 md:px-6">
        <div className="flex items-center gap-2 font-bold text-xl mr-6">
          <Dumbbell className="h-6 w-6 text-[#0693db]" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-500">ShadowFit</span>
        </div>

        <nav className="hidden md:flex items-center space-x-1 flex-1">
          {navigationConfig.map((route) => {
            const isAdminOnly = isAdminRoute(route)
            const isDisabled = isAdminOnly && !isUserAdmin

            return (
              <Link
                key={route.href}
                href={isDisabled ? "#" : route.href}
                className={`px-3 py-2 text-sm rounded-md transition-colors flex items-center gap-1 ${
                  isDisabled 
                    ? "text-zinc-600 cursor-not-allowed" 
                    : pathname === route.href 
                      ? "text-white bg-zinc-800" 
                      : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                }`}
                onClick={(e) => isDisabled && e.preventDefault()}
              >
                {route.title}
                {isAdminOnly && <Lock className="h-3 w-3" />}
              </Link>
            )
          })}
        </nav>

        <div className="hidden md:flex ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 hover:bg-zinc-800 ml-2">
                <Avatar className="h-8 w-8 border border-zinc-800">
                  {user?.image ? (
                    <AvatarImage src={user.image} alt={user.name || "Avatar"} />
                  ) : (
                    <AvatarFallback className="bg-emerald-500/10 text-emerald-500 text-sm">
                      {getUserInitials()}
                    </AvatarFallback>
                  )}
                </Avatar>
                <span className="sr-only">Profil utilisateur</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-zinc-900 border-zinc-800">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{user?.name || "Utilisateur"}</p>
                  <p className="text-xs text-zinc-500 truncate">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-zinc-800" />
              {navigationConfig.map((route) => {
                const isAdminOnly = isAdminRoute(route)
                const isDisabled = isAdminOnly && !isUserAdmin

                return (
                  <DropdownMenuItem 
                    key={route.href} 
                    className={`hover:bg-zinc-800 focus:bg-zinc-800 ${isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                    disabled={isDisabled}
                  >
                    <Link href={isDisabled ? "#" : route.href} className="flex w-full items-center gap-1">
                      {route.title}
                      {isAdminOnly && <Lock className="h-3 w-3" />}
                    </Link>
                  </DropdownMenuItem>
                )
              })}
              <DropdownMenuSeparator className="bg-zinc-800" />
              <DropdownMenuItem className="hover:bg-zinc-800 focus:bg-zinc-800 cursor-pointer">
                <Link href="/account" className="flex w-full">
                  Account
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-zinc-800" />
              <LogoutButton className="w-full justify-start rounded-none px-2 py-1.5 text-sm" />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Menu mobile */}
        <div className="md:hidden ml-auto flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 hover:bg-zinc-800">
                <Avatar className="h-8 w-8 border border-zinc-800">
                  {user?.image ? (
                    <AvatarImage src={user.image} alt={user.name || "Avatar"} />
                  ) : (
                    <AvatarFallback className="bg-emerald-500/10 text-emerald-500 text-sm">
                      {getUserInitials()}
                    </AvatarFallback>
                  )}
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-zinc-900 border-zinc-800">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{user?.name || "Utilisateur"}</p>
                  <p className="text-xs text-zinc-500 truncate">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-zinc-800" />
              {navigationConfig.map((route) => {
                const isAdminOnly = isAdminRoute(route)
                const isDisabled = isAdminOnly && !isUserAdmin

                return (
                  <DropdownMenuItem 
                    key={route.href} 
                    className={`hover:bg-zinc-800 focus:bg-zinc-800 ${isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                    disabled={isDisabled}
                  >
                    <Link href={isDisabled ? "#" : route.href} className="flex w-full items-center gap-1">
                      {route.title}
                      {isAdminOnly && <Lock className="h-3 w-3" />}
                    </Link>
                  </DropdownMenuItem>
                )
              })}
              <DropdownMenuSeparator className="bg-zinc-800" />
              <DropdownMenuItem className="hover:bg-zinc-800 focus:bg-zinc-800 cursor-pointer">
                <Link href="/space" className="flex w-full">
                  My Space
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-zinc-800" />
              <LogoutButton className="w-full justify-start rounded-none px-2 py-1.5 text-sm" />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
