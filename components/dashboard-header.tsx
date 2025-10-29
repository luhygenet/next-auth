"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"

export function DashboardHeader() {
  const { user, logout } = useAuth()

  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary" />
            <span className="text-xl font-bold text-primary">ANKI</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/dashboard" className="text-foreground hover:text-primary font-medium">
              Dashboard
            </Link>
            <Link href="/dashboard/campaigns" className="text-muted-foreground hover:text-foreground">
              Campaigns
            </Link>
            <Link href="/dashboard/influencers" className="text-muted-foreground hover:text-foreground">
              Influencers
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-foreground">{user?.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
            </div>
            <Button variant="outline" onClick={logout} className="bg-transparent">
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
