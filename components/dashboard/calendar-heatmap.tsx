"use client"

import { useState, useMemo } from "react"
import { ChevronLeft, ChevronRight, Wallet, ShoppingBag, Car, Coffee, Utensils, Zap, Gamepad2, Heart, Home } from "lucide-react"

interface Transaction {
  name: string
  amount: number
  category: string
}

interface DayData {
  date: number
  amount: number
  transactions: Transaction[]
}

interface CalendarHeatmapProps {
  month: string
  year: number
  days: DayData[]
}

const CATEGORIES = [
  { id: "all", label: "Todos", icon: Wallet, color: "bg-primary" },
  { id: "compras", label: "Compras", icon: ShoppingBag, color: "bg-pink-500" },
  { id: "transporte", label: "Transporte", icon: Car, color: "bg-blue-500" },
  { id: "comida", label: "Comida", icon: Utensils, color: "bg-orange-500" },
  { id: "cafe", label: "Cafe", icon: Coffee, color: "bg-amber-600" },
  { id: "servicios", label: "Servicios", icon: Zap, color: "bg-yellow-500" },
  { id: "entretenimiento", label: "Ocio", icon: Gamepad2, color: "bg-purple-500" },
  { id: "salud", label: "Salud", icon: Heart, color: "bg-red-500" },
  { id: "hogar", label: "Hogar", icon: Home, color: "bg-teal-500" },
]

function getIntensityClass(amount: number, maxAmount: number, hasData: boolean): string {
  if (!hasData || amount === 0) return "bg-secondary border border-border/50"
  const ratio = amount / maxAmount
  if (ratio < 0.2) return "bg-primary/20 border border-primary/30"
  if (ratio < 0.4) return "bg-primary/35 border border-primary/40"
  if (ratio < 0.6) return "bg-primary/50 border border-primary/50"
  if (ratio < 0.8) return "bg-primary/70 border border-primary/60"
  return "bg-primary border border-primary"
}

export function CalendarHeatmap({ month, year, days }: CalendarHeatmapProps) {
  const [selectedDay, setSelectedDay] = useState<DayData | null>(null)
  const [currentMonth, setCurrentMonth] = useState(month)
  const [activeFilter, setActiveFilter] = useState("all")
  
  const weekDays = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"]
  
  // Filter days based on active category
  const filteredDays = useMemo(() => {
    if (activeFilter === "all") return days
    
    return days.map(day => {
      const filteredTransactions = day.transactions.filter(
        tx => tx.category.toLowerCase() === activeFilter
      )
      const filteredAmount = filteredTransactions.reduce((sum, tx) => sum + tx.amount, 0)
      return {
        ...day,
        amount: filteredAmount,
        transactions: filteredTransactions,
      }
    })
  }, [days, activeFilter])
  
  const maxAmount = Math.max(...filteredDays.map(d => d.amount), 1)
  const totalFiltered = filteredDays.reduce((sum, d) => sum + d.amount, 0)
  
  // Get the first day of month (0 = Sunday, we want Monday = 0)
  const firstDayOfMonth = new Date(year, getMonthIndex(currentMonth), 1).getDay()
  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1
  
  function getMonthIndex(monthName: string): number {
    const months: Record<string, number> = {
      "Enero": 0, "Febrero": 1, "Marzo": 2, "Abril": 3,
      "Mayo": 4, "Junio": 5, "Julio": 6, "Agosto": 7,
      "Septiembre": 8, "Octubre": 9, "Noviembre": 10, "Diciembre": 11
    }
    return months[monthName] ?? 0
  }
  
  const activeCategory = CATEGORIES.find(c => c.id === activeFilter)

  return (
    <div className="flex flex-col gap-4">
      {/* Month Header */}
      <div className="flex items-center justify-between">
        <button 
          onClick={() => setCurrentMonth("Marzo")}
          className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
        >
          <ChevronLeft className="size-5 text-foreground" />
        </button>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground">{currentMonth} {year}</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            {activeFilter === "all" ? "Total gastado" : activeCategory?.label}: {" "}
            <span className="text-primary font-semibold">
              ${totalFiltered.toLocaleString("es-AR")}
            </span>
          </p>
        </div>
        <button 
          onClick={() => setCurrentMonth("Abril")}
          className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
        >
          <ChevronRight className="size-5 text-foreground" />
        </button>
      </div>
      
      {/* Filter Pills */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 -mx-1 px-1">
        {CATEGORIES.map(category => {
          const Icon = category.icon
          const isActive = activeFilter === category.id
          return (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`
                flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium
                whitespace-nowrap transition-all duration-200
                ${isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                }
              `}
            >
              <Icon className="size-4" />
              <span>{category.label}</span>
            </button>
          )
        })}
      </div>
      
      {/* Calendar Card */}
      <div className="rounded-2xl bg-card border border-border p-4">
        {/* Week days header */}
        <div className="grid grid-cols-7 gap-1.5 mb-2">
          {weekDays.map(day => (
            <div key={day} className="text-xs font-medium text-muted-foreground text-center py-1">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1.5">
          {/* Empty cells for offset */}
          {Array.from({ length: adjustedFirstDay }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}
          
          {/* Day cells */}
          {filteredDays.map((day, index) => {
            const originalDay = days[index]
            const hasData = originalDay.amount > 0
            return (
              <button
                key={day.date}
                onClick={() => setSelectedDay(selectedDay?.date === day.date ? null : originalDay)}
                className={`
                  aspect-square rounded-xl flex flex-col items-center justify-center
                  transition-all duration-200 hover:scale-105 
                  ${getIntensityClass(day.amount, maxAmount, hasData)}
                  ${selectedDay?.date === day.date ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""}
                `}
              >
                <span className={`text-sm font-medium ${day.amount > maxAmount * 0.5 ? "text-primary-foreground" : hasData ? "text-foreground" : "text-muted-foreground"}`}>
                  {day.date}
                </span>
                {day.amount > 0 && (
                  <span className={`text-[8px] font-medium mt-0.5 ${day.amount > maxAmount * 0.5 ? "text-primary-foreground/80" : "text-primary"}`}>
                    ${(day.amount / 1000).toFixed(0)}k
                  </span>
                )}
              </button>
            )
          })}
        </div>
        
        {/* Legend */}
        <div className="flex items-center justify-center gap-3 mt-4 text-xs text-muted-foreground">
          <span>Menos</span>
          <div className="flex gap-1">
            <div className="size-4 rounded-md bg-secondary border border-border/50" />
            <div className="size-4 rounded-md bg-primary/20 border border-primary/30" />
            <div className="size-4 rounded-md bg-primary/35 border border-primary/40" />
            <div className="size-4 rounded-md bg-primary/50 border border-primary/50" />
            <div className="size-4 rounded-md bg-primary/70 border border-primary/60" />
            <div className="size-4 rounded-md bg-primary border border-primary" />
          </div>
          <span>Mas</span>
        </div>
      </div>
      
      {/* Selected day detail */}
      {selectedDay && (
        <div className="rounded-2xl bg-card border border-border p-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-lg font-semibold text-foreground">{selectedDay.date} de {currentMonth}</span>
              <p className="text-sm text-muted-foreground">
                {selectedDay.transactions.length} transacciones
              </p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-primary">
                ${selectedDay.amount.toLocaleString("es-AR")}
              </span>
            </div>
          </div>
          
          {selectedDay.amount > 0 ? (
            <div className="space-y-2">
              {selectedDay.transactions.map((tx, i) => {
                const category = CATEGORIES.find(c => c.id === tx.category.toLowerCase()) || CATEGORIES[0]
                const Icon = category.icon
                return (
                  <div 
                    key={i} 
                    className="flex items-center justify-between p-3 rounded-xl bg-secondary/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${category.color}/20`}>
                        <Icon className={`size-4 ${category.color.replace('bg-', 'text-')}`} />
                      </div>
                      <div>
                        <span className="text-sm font-medium text-foreground">{tx.name}</span>
                        <p className="text-xs text-muted-foreground">{tx.category}</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-foreground">
                      ${tx.amount.toLocaleString("es-AR")}
                    </span>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-4 text-muted-foreground text-sm">
              No hay gastos registrados este dia
            </div>
          )}
        </div>
      )}
    </div>
  )
}
