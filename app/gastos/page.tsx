import { CalendarHeatmap } from "@/components/dashboard/calendar-heatmap"
import { BottomNav } from "@/components/dashboard/bottom-nav"
import { categories, calendarDays, formatCurrency, getCategory, spendingSummary, transactions } from "@/lib/capsa-data"

export default function GastosPage() {
  const topDay = calendarDays.reduce((max, day) => (day.amount > max.amount ? day : max), calendarDays[0])

  return (
    <main className="min-h-screen bg-background pb-28 text-foreground">
      <div className="mx-auto max-w-md">
        <header className="sticky top-0 z-40 bg-background/92 px-5 pb-3 pt-4 backdrop-blur">
          <p className="text-xs text-muted-foreground">CapsaAI</p>
          <h1 className="text-xl font-semibold">Gastos</h1>
        </header>

        <section className="px-5 pt-2">
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-lg border border-border bg-card p-3">
              <p className="text-xs text-muted-foreground">Mayor dia</p>
              <p className="mt-1 text-xl font-semibold">{topDay.date} Abr</p>
              <p className="text-xs text-primary">{formatCurrency(topDay.amount)}</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3">
              <p className="text-xs text-muted-foreground">Promedio diario</p>
              <p className="mt-1 text-xl font-semibold">{formatCurrency(spendingSummary.dailyAverage)}</p>
              <p className="text-xs text-muted-foreground">segun patron actual</p>
            </div>
          </div>
        </section>

        <section className="px-5 pt-5">
          <CalendarHeatmap month="Abril" year={2026} days={calendarDays} />
        </section>

        <section className="px-5 pt-5">
          <h2 className="mb-3 text-base font-semibold">Filtros activos</h2>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map((category) => {
              const Icon = category.icon

              return (
                <div key={category.key} className="flex shrink-0 items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
                  <Icon className="size-4" style={{ color: category.color }} />
                  <span className="text-sm">{category.label}</span>
                </div>
              )
            })}
          </div>
        </section>

        <section className="px-5 pt-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-semibold">Transacciones</h2>
            <span className="text-xs text-muted-foreground">{transactions.length} recientes</span>
          </div>
          <div className="space-y-2">
            {transactions.map((transaction) => {
              const category = getCategory(transaction.category)
              const Icon = category.icon

              return (
                <div key={transaction.id} className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card p-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary">
                      <Icon className="size-4" style={{ color: category.color }} />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{transaction.merchant}</p>
                      <p className="text-xs text-muted-foreground">{category.label} · {transaction.card} · {transaction.time}</p>
                    </div>
                  </div>
                  <p className="shrink-0 text-sm font-semibold">-{formatCurrency(transaction.amount)}</p>
                </div>
              )
            })}
          </div>
        </section>
      </div>

      <BottomNav activeTab="gastos" />
    </main>
  )
}
