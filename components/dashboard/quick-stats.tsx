"use client"

import { TrendingUp, Calendar, Tag, Receipt } from "lucide-react"

interface QuickStatsProps {
  stats: {
    monthlySpend: number
    dailyAvg: number
    biggestCategory: string
    biggestAmount: number
    transactionCount: number
  }
}

export function QuickStats({ stats }: QuickStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="rounded-2xl bg-card border border-border p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 rounded-lg bg-primary/20">
            <TrendingUp className="size-4 text-primary" />
          </div>
          <span className="text-xs text-muted-foreground">Gasto mensual</span>
        </div>
        <p className="text-xl font-bold text-foreground">
          ${stats.monthlySpend.toLocaleString("es-AR")}
        </p>
      </div>
      
      <div className="rounded-2xl bg-card border border-border p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 rounded-lg bg-primary/20">
            <Calendar className="size-4 text-primary" />
          </div>
          <span className="text-xs text-muted-foreground">Promedio diario</span>
        </div>
        <p className="text-xl font-bold text-foreground">
          ${stats.dailyAvg.toLocaleString("es-AR")}
        </p>
      </div>
      
      <div className="rounded-2xl bg-card border border-border p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 rounded-lg bg-primary/20">
            <Tag className="size-4 text-primary" />
          </div>
          <span className="text-xs text-muted-foreground">Mayor categoria</span>
        </div>
        <p className="text-lg font-bold text-foreground">{stats.biggestCategory}</p>
        <p className="text-xs text-primary">${stats.biggestAmount.toLocaleString("es-AR")}</p>
      </div>
      
      <div className="rounded-2xl bg-card border border-border p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 rounded-lg bg-primary/20">
            <Receipt className="size-4 text-primary" />
          </div>
          <span className="text-xs text-muted-foreground">Transacciones</span>
        </div>
        <p className="text-xl font-bold text-foreground">{stats.transactionCount}</p>
        <p className="text-xs text-muted-foreground">este mes</p>
      </div>
    </div>
  )
}
