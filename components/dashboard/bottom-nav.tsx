"use client"

import Link from "next/link"
import { Home, PieChart, MapPin, Bell, User } from "lucide-react"

const NAV_ITEMS = [
  { id: "inicio", label: "Inicio", icon: Home, href: "/" },
  { id: "gastos", label: "Gastos", icon: PieChart, href: "/gastos" },
  { id: "cerca", label: "Cerca", icon: MapPin, href: "/cerca" },
  { id: "alertas", label: "Alertas", icon: Bell, href: "/alertas" },
  { id: "perfil", label: "Perfil", icon: User, href: "/perfil" },
]

interface BottomNavProps {
  activeTab?: string
}

export function BottomNav({ activeTab = "inicio" }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border safe-area-bottom">
      <div className="max-w-md mx-auto px-2">
        <div className="flex items-center justify-around py-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`
                  flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200
                  ${isActive 
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-foreground"
                  }
                `}
              >
                <div className={`
                  p-1.5 rounded-lg transition-colors duration-200
                  ${isActive ? "bg-primary/20" : ""}
                `}>
                  <Icon className="size-5" strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span className={`text-[10px] ${isActive ? "font-semibold" : "font-medium"}`}>
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
