"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Search, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SubNavProps {
  section: string
}

export function SubNav({ section }: SubNavProps) {
  const pathname = usePathname()

  // Navigation contextuelle pour le tableau de bord
  const dashboardRoutes = [
    { href: "/dashboard", label: "Vue d'ensemble" },
    { href: "/dashboard/stats", label: "Statistiques" },
    { href: "/dashboard/achievements", label: "Réalisations" },
  ]

  // Navigation contextuelle pour les entraînements
  const workoutsRoutes = [
    { href: "/workouts", label: "Mes entraînements" },
    { href: "/workouts/discover", label: "Découvrir" },
    { href: "/workouts/history", label: "Historique" },
  ]

  // Navigation contextuelle pour la progression
  const progressRoutes = [
    { href: "/progress", label: "Évolution" },
    { href: "/progress/goals", label: "Objectifs" },
    { href: "/progress/metrics", label: "Métriques" },
  ]

  // Navigation contextuelle pour le calendrier
  const calendarRoutes = [
    { href: "/calendar", label: "Planification" },
    { href: "/calendar/schedule", label: "Programme" },
    { href: "/calendar/reminders", label: "Rappels" },
  ]

  // Navigation contextuelle pour le profil
  const profileRoutes = [
    { href: "/profile", label: "Informations" },
    { href: "/profile/achievements", label: "Réalisations" },
    { href: "/profile/stats", label: "Statistiques" },
  ]

  // Navigation contextuelle pour les paramètres
  const settingsRoutes = [
    { href: "/settings", label: "Compte" },
    { href: "/settings/appearance", label: "Apparence" },
    { href: "/settings/notifications", label: "Notifications" },
    { href: "/settings/security", label: "Sécurité" },
  ]

  // Navigation contextuelle pour les notifications
  const notificationsRoutes = [
    { href: "/notifications", label: "Toutes" },
    { href: "/notifications/unread", label: "Non lues" },
    { href: "/notifications/settings", label: "Préférences" },
  ]

  // Sélectionner les routes en fonction de la section
  let routes = dashboardRoutes
  if (section.startsWith("/workouts")) routes = workoutsRoutes
  else if (section.startsWith("/progress")) routes = progressRoutes
  else if (section.startsWith("/calendar")) routes = calendarRoutes
  else if (section.startsWith("/profile")) routes = profileRoutes
  else if (section.startsWith("/settings")) routes = settingsRoutes
  else if (section.startsWith("/notifications")) routes = notificationsRoutes

  // Si la section n'a pas de sous-navigation, ne pas afficher la barre
  if (routes.length === 0) return null

  return (
    <div className="border-b border-zinc-800 bg-zinc-950">
      <div className="flex h-14 items-center justify-between px-4 md:px-6">
        <nav className="flex items-center space-x-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                pathname === route.href ? "text-white bg-zinc-800" : "text-zinc-400 hover:text-white hover:bg-zinc-900"
              }`}
            >
              {route.label}
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
