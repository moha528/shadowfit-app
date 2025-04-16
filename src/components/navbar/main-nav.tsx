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

export function MainNav() {
  const pathname = usePathname()
  const { data: session } = authClient.useSession()

  const routes = [
    { href: "/dashboard", label: "Tableau de bord" },
    { href: "/workouts", label: "Entraînements" },
    { href: "/progress", label: "Progression" },
    { href: "/calendar", label: "Calendrier" },
  ]

  // Nombre fictif de notifications non lues
  const unreadNotifications = 3

  // Fonction pour obtenir les initiales de l'utilisateur
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
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`px-3 py-2 text-sm rounded-md transition-colors hover:text-white ${
                pathname === route.href ? "text-white bg-zinc-800" : "text-zinc-400 hover:bg-zinc-900"
              }`}
            >
              {route.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
              >
                <Bell className="h-5 w-5" />
                {unreadNotifications > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                    {unreadNotifications}
                  </span>
                )}
                <span className="sr-only">Notifications</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-zinc-900 border-zinc-800 p-0">
              <div className="flex items-center justify-between p-4 border-b border-zinc-800">
                <h3 className="font-medium">Notifications</h3>
                {unreadNotifications > 0 && (
                  <Badge className="bg-emerald-500 text-white">{unreadNotifications} nouvelles</Badge>
                )}
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                {/* Notifications récentes */}
                <div className="p-2 border-b border-zinc-800 flex items-start gap-3 hover:bg-zinc-800">
                  <div className="bg-emerald-500/20 p-2 rounded-full mt-1">
                    <Trophy className="h-4 w-4 text-emerald-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Nouveau badge débloqué</p>
                    <p className="text-xs text-zinc-400">Félicitations ! Vous avez débloqué le badge 'Persévérant'.</p>
                    <p className="text-xs text-zinc-500 mt-1">Aujourd'hui, 10:24</p>
                  </div>
                  <Badge className="bg-emerald-500 text-white text-xs">Nouveau</Badge>
                </div>
                <div className="p-2 border-b border-zinc-800 flex items-start gap-3 hover:bg-zinc-800">
                  <div className="bg-emerald-500/20 p-2 rounded-full mt-1">
                    <Dumbbell className="h-4 w-4 text-emerald-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Rappel d'entraînement</p>
                    <p className="text-xs text-zinc-400">Votre entraînement 'Jambes' est prévu aujourd'hui à 18:00.</p>
                    <p className="text-xs text-zinc-500 mt-1">Aujourd'hui, 09:15</p>
                  </div>
                  <Badge className="bg-emerald-500 text-white text-xs">Nouveau</Badge>
                </div>
                <div className="p-2 border-b border-zinc-800 flex items-start gap-3 hover:bg-zinc-800">
                  <div className="bg-zinc-700 p-2 rounded-full mt-1">
                    <MessageSquare className="h-4 w-4 text-zinc-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Nouveau message</p>
                    <p className="text-xs text-zinc-400">
                      Marie vous a envoyé un message concernant votre dernier entraînement.
                    </p>
                    <p className="text-xs text-zinc-500 mt-1">Hier, 15:30</p>
                  </div>
                </div>
              </div>
              <div className="p-2">
                <Link href="/notifications" className="w-full">
                  <Button variant="outline" className="w-full border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                    Voir toutes les notifications
                  </Button>
                </Link>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

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
                <Link href="/profile" className="flex w-full">
                  Profil
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-zinc-800 focus:bg-zinc-800 cursor-pointer">
                <Link href="/settings" className="flex w-full">
                  Paramètres
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
              <Button
                variant="ghost"
                size="icon"
                className="relative text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 mr-2"
              >
                <Bell className="h-5 w-5" />
                {unreadNotifications > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                    {unreadNotifications}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-zinc-900 border-zinc-800 p-0">
              <div className="flex items-center justify-between p-4 border-b border-zinc-800">
                <h3 className="font-medium">Notifications</h3>
                {unreadNotifications > 0 && (
                  <Badge className="bg-emerald-500 text-white">{unreadNotifications} nouvelles</Badge>
                )}
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                {/* Notifications récentes */}
                <div className="p-2 border-b border-zinc-800 flex items-start gap-3 hover:bg-zinc-800">
                  <div className="bg-emerald-500/20 p-2 rounded-full mt-1">
                    <Trophy className="h-4 w-4 text-emerald-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Nouveau badge débloqué</p>
                    <p className="text-xs text-zinc-400">Félicitations ! Vous avez débloqué le badge 'Persévérant'.</p>
                    <p className="text-xs text-zinc-500 mt-1">Aujourd'hui, 10:24</p>
                  </div>
                  <Badge className="bg-emerald-500 text-white text-xs">Nouveau</Badge>
                </div>
                <div className="p-2 border-b border-zinc-800 flex items-start gap-3 hover:bg-zinc-800">
                  <div className="bg-emerald-500/20 p-2 rounded-full mt-1">
                    <Dumbbell className="h-4 w-4 text-emerald-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Rappel d'entraînement</p>
                    <p className="text-xs text-zinc-400">Votre entraînement 'Jambes' est prévu aujourd'hui à 18:00.</p>
                    <p className="text-xs text-zinc-500 mt-1">Aujourd'hui, 09:15</p>
                  </div>
                  <Badge className="bg-emerald-500 text-white text-xs">Nouveau</Badge>
                </div>
                <div className="p-2 border-b border-zinc-800 flex items-start gap-3 hover:bg-zinc-800">
                  <div className="bg-zinc-700 p-2 rounded-full mt-1">
                    <MessageSquare className="h-4 w-4 text-zinc-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Nouveau message</p>
                    <p className="text-xs text-zinc-400">
                      Marie vous a envoyé un message concernant votre dernier entraînement.
                    </p>
                    <p className="text-xs text-zinc-500 mt-1">Hier, 15:30</p>
                  </div>
                </div>
              </div>
              <div className="p-2">
                <Link href="/notifications" className="w-full">
                  <Button variant="outline" className="w-full border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                    Voir toutes les notifications
                  </Button>
                </Link>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

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
              {routes.map((route) => (
                <DropdownMenuItem key={route.href} className="hover:bg-zinc-800 focus:bg-zinc-800 cursor-pointer">
                  <Link href={route.href} className="flex w-full">
                    {route.label}
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator className="bg-zinc-800" />
              <DropdownMenuItem className="hover:bg-zinc-800 focus:bg-zinc-800 cursor-pointer">
                <Link href="/profile" className="flex w-full">
                  Profil
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-zinc-800 focus:bg-zinc-800 cursor-pointer">
                <Link href="/settings" className="flex w-full">
                  Paramètres
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
