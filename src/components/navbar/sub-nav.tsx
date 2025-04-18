"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Search, Lock } from "lucide-react"
import { navigationConfig } from "@/lib/nav-config"
import { Role, User } from "@prisma/client"

interface SubNavProps {
  section: string
  user: User
}

export function SubNav({ section, user }: SubNavProps) {
  const pathname = usePathname()

  const subRoutes = navigationConfig.find(item => item.href === section)?.subNav || []

  // Si la section n'a pas de sous-navigation, ne pas afficher la barre
  if (subRoutes.length === 0) return null

  const isAdminRoute = (route: typeof subRoutes[0]) => {
    return route.roles.length === 1 && route.roles[0] === Role.ADMIN
  }

  const isUserAdmin = user.role === Role.ADMIN

  return (
    <div className="border-b border-zinc-800 bg-zinc-950">
      <div className="flex h-14 items-center justify-between px-4 md:px-6">
        <nav className="flex items-center space-x-1">
          {subRoutes.map((route) => {
            const isAdminOnly = isAdminRoute(route)
            const isDisabled = isAdminOnly && !isUserAdmin

            return (
              <Link
                key={route.href}
                href={isDisabled ? "#" : route.href}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors flex items-center gap-1 ${
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

        <div className="flex items-center gap-4">
          <div className="relative max-w-md hidden md:flex">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full bg-zinc-900 border-zinc-800 pl-9 h-9 focus-visible:ring-emerald-500 max-w-[200px]"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
