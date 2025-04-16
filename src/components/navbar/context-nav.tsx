"use client"

import { usePathname } from "next/navigation"
import { SubNav } from "./sub-nav"

export function ContextNav() {
  const pathname = usePathname()

  // Déterminer la section active
  let section = "/dashboard"
  if (pathname.startsWith("/workouts")) section = "/workouts"
  else if (pathname.startsWith("/progress")) section = "/progress"
  else if (pathname.startsWith("/calendar")) section = "/calendar"
  else if (pathname.startsWith("/profile")) section = "/profile"
  else if (pathname.startsWith("/settings")) section = "/settings"
  else if (pathname.startsWith("/notifications")) section = "/notifications"

  return <SubNav section={section} />
}
