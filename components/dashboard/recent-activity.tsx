"use client"

import { ShoppingBag, Utensils, Car, Coffee, Zap, ChevronRight } from "lucide-react"

interface Transaction {
  id: string
  merchant: string
  amount: number
  category: string
  time: string
  icon: string
}

interface RecentActivityProps {
  transactions: Transaction[]
}

const ICON_MAP: Record<string, typeof ShoppingBag> = {
  shopping: ShoppingBag,
  food: Utensils,
  transport: Car,
  coffee: Coffee,
  services: Zap,
}

export function RecentActivity({ transactions }: RecentActivityProps) {
  return (
    <div className="rounded-2xl bg-card border border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Actividad reciente</h3>
        <button className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors">
          Ver todo
          <ChevronRight className="size-4" />
        </button>
      </div>
      
      <div className="space-y-3">
        {transactions.map((tx) => {
          const Icon = ICON_MAP[tx.icon] || ShoppingBag
          return (
            <div 
              key={tx.id}
              className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 hover:bg-secondary/70 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/20">
                  <Icon className="size-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{tx.merchant}</p>
                  <p className="text-xs text-muted-foreground">{tx.category} - {tx.time}</p>
                </div>
              </div>
              <span className="text-sm font-semibold text-foreground">
                -${tx.amount.toLocaleString("es-AR")}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
