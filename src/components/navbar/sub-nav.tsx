"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Search, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { navigationConfig } from "@/lib/nav-config"
interface SubNavProps {
  section: string
}

export function SubNav({ section }: SubNavProps) {
  const pathname = usePathname()

  const subRoutes = navigationConfig.find(item => item.href === section)?.subNav || []


  // Si la section n'a pas de sous-navigation, ne pas afficher la barre
  if (subRoutes.length === 0) return null

  return (
    <div className="border-b border-zinc-800 bg-zinc-950">
      <div className="flex h-14 items-center justify-between px-4 md:px-6">
        <nav className="flex items-center space-x-1">
          {subRoutes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                pathname === route.href ? "text-white bg-zinc-800" : "text-zinc-400 hover:text-white hover:bg-zinc-900"
              }`}
            >
              {route.title}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="relative max-w-md hidden md:flex">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
            <Input
              type="search"
              placeholder="Rechercher..."
              className="w-full bg-zinc-900 border-zinc-800 pl-9 h-9 focus-visible:ring-emerald-500 max-w-[200px]"
            />
          </div>

          {section === "/dashboard" && (
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white h-9">
              <Zap className="mr-2 h-4 w-4" />
              Nouvel entraînement
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
