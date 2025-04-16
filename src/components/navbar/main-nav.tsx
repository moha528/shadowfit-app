"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, Dumbbell, MessageSquare, Trophy } from "lucide-react"
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
import { Badge } from "@/components/ui/badge"
import { LogoutButton } from "@/features/auth/logout-button"
import { authClient } from "@/lib/authClient"
import { navigationConfig } from "@/lib/nav-config"

export function MainNav() {
  const pathname = usePathname()
  const { data: session } = authClient.useSession()

  const getUserInitials = () => {
    if (!session?.user?.name) return "U"
    return session.user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800 bg-black">
      <div className="flex h-16 items-center px-4 md:px-6">
        <div className="flex items-center gap-2 font-bold text-xl mr-6">
          <Dumbbell className="h-6 w-6 text-emerald-500" />
          <span>ShadowFit</span>
        </div>

        <nav className="hidden md:flex items-center space-x-1 flex-1">
          {navigationConfig.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`px-3 py-2 text-sm rounded-md transition-colors hover:text-white ${
                pathname === route.href ? "text-white bg-zinc-800" : "text-zinc-400 hover:bg-zinc-900"
              }`}
            >
              {route.title}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 hover:bg-zinc-800 ml-2">
                <Avatar className="h-8 w-8 border border-zinc-800">
                  {session?.user?.image ? (
                    <AvatarImage src={session.user.image} alt={session.user.name || "Avatar"} />
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
                  <p className="text-sm font-medium">{session?.user?.name || "Utilisateur"}</p>
                  <p className="text-xs text-zinc-500 truncate">{session?.user?.email}</p>
                </div>
              </DropdownMenuLabel>
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
                  {session?.user?.image ? (
                    <AvatarImage src={session.user.image} alt={session.user.name || "Avatar"} />
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
                  <p className="text-sm font-medium">{session?.user?.name || "Utilisateur"}</p>
                  <p className="text-xs text-zinc-500 truncate">{session?.user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-zinc-800" />
              {navigationConfig.map((route) => (
                <DropdownMenuItem key={route.href} className="hover:bg-zinc-800 focus:bg-zinc-800 cursor-pointer">
                  <Link href={route.href} className="flex w-full">
                    {route.title}
                  </Link>
                </DropdownMenuItem>
              ))}
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
      </div>
    </header>
  )
}
