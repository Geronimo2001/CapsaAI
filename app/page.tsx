"use client"

import Link from "next/link"
import { Bell, CalendarDays, ChevronRight, CreditCard, Gauge, MapPin, Sparkles, Target } from "lucide-react"
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { BottomNav } from "@/components/dashboard/bottom-nav"
import {
  categorySpend,
  formatCompact,
  formatCurrency,
  getCategory,
  linkedCards,
  spendingTrend,
  spendingSummary,
  subscriptions,
} from "@/lib/capsa-data"

export default function HomePage() {
  const budgetProgress = Math.round((spendingSummary.totalSpend / spendingSummary.budget) * 100)
  const projectedOverage = spendingSummary.projectedSpend - spendingSummary.budget
  const subscriptionTotal = subscriptions.reduce((total, subscription) => total + subscription.amount, 0)

  return (
    <main className="min-h-screen bg-background pb-28 text-foreground">
      <div className="mx-auto max-w-md">
        <header className="sticky top-0 z-40 bg-background/92 px-5 pb-3 pt-4 backdrop-blur">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">CapsaAI</p>
              <h1 className="text-xl font-semibold">Inicio</h1>
            </div>
            <Link
              href="/alertas"
              className="relative flex size-10 items-center justify-center rounded-lg border border-border bg-card"
              aria-label="Ver alertas"
            >
              <Bell className="size-5 text-muted-foreground" />
              <span className="absolute right-2 top-2 size-2 rounded-full bg-[#ff8a5b]" />
            </Link>
          </div>
        </header>

        <section className="px-5 pt-2">
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs text-muted-foreground">{spendingSummary.period}</p>
                <h2 className="mt-1 text-4xl font-semibold tracking-normal">{formatCurrency(spendingSummary.totalSpend)}</h2>
                <p className="mt-2 text-sm text-muted-foreground">Gastado sobre objetivo de {formatCurrency(spendingSummary.budget)}</p>
              </div>
              <div className="rounded-lg bg-primary px-3 py-2 text-right text-primary-foreground">
                <p className="text-xl font-semibold">{budgetProgress}%</p>
                <p className="text-[11px]">usado</p>
              </div>
            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-secondary">
              <div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(budgetProgress, 100)}%` }} />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-secondary p-3">
                <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                  <Gauge className="size-4 text-primary" />
                  Proyeccion
                </div>
                <p className="text-lg font-semibold">{formatCurrency(spendingSummary.projectedSpend)}</p>
                <p className="text-xs text-[#ff8a5b]">+{formatCurrency(projectedOverage)}</p>
              </div>
              <div className="rounded-lg bg-secondary p-3">
                <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                  <CalendarDays className="size-4 text-primary" />
                  Promedio diario
                </div>
                <p className="text-lg font-semibold">{formatCurrency(spendingSummary.dailyAverage)}</p>
                <p className="text-xs text-muted-foreground">ultimos 15 dias</p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 pt-5">
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold">Linea temporal</h2>
                <p className="mt-1 text-xs text-muted-foreground">Gasto acumulado real vs cierre proyectado</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Dia 30</p>
                <p className="text-sm font-semibold">{formatCompact(spendingSummary.projectedSpend)}</p>
              </div>
            </div>

            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={spendingTrend} margin={{ top: 8, right: 4, bottom: 0, left: 4 }}>
                  <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    ticks={[1, 5, 10, 15, 20, 25, 30]}
                    tick={{ fill: "rgba(255,255,255,0.48)", fontSize: 11 }}
                  />
                  <YAxis hide domain={[0, "dataMax + 20000"]} />
                  <Tooltip
                    cursor={{ stroke: "rgba(255,255,255,0.16)", strokeWidth: 1 }}
                    formatter={(value, name) => [
                      formatCurrency(Number(value)),
                      name === "actual" ? "Real" : "Proyectada",
                    ]}
                    labelFormatter={(day) => `Dia ${day}`}
                    contentStyle={{
                      background: "#1f1f1f",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: 8,
                      color: "#f4f4f4",
                      fontSize: 12,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="projected"
                    stroke="#ff8a5b"
                    strokeDasharray="4 5"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4 }}
                    isAnimationActive={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="#5ee6a8"
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 5 }}
                    connectNulls={false}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 text-muted-foreground">
                <span className="size-2 rounded-full bg-primary" />
                Linea real
              </span>
              <span className="flex items-center gap-2 text-muted-foreground">
                <span className="h-0.5 w-5 border-t border-dashed border-[#ff8a5b]" />
                Linea proyectada
              </span>
            </div>
          </div>
        </section>

        <section className="px-5 pt-5">
          <div className="flex items-center gap-3 rounded-lg border border-primary/25 bg-primary/10 p-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/20">
              <Sparkles className="size-5 text-primary" />
            </div>
            <p className="text-sm leading-5 text-foreground">{spendingSummary.patternMessage}</p>
          </div>
        </section>

        <section className="pt-5">
          <div className="mb-3 flex items-center justify-between px-5">
            <h2 className="text-base font-semibold">Categorias que mueven el mes</h2>
            <Link href="/gastos" className="text-xs font-medium text-primary">
              Ver gastos
            </Link>
          </div>
          <div className="flex gap-2 overflow-x-auto px-5 pb-1 scrollbar-hide">
            {categorySpend.slice(0, 6).map((item) => {
              const category = getCategory(item.key)
              const Icon = category.icon

              return (
                <Link
                  key={item.key}
                  href="/gastos"
                  className="min-w-32 rounded-lg border border-border bg-card p-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex size-8 items-center justify-center rounded-lg bg-secondary">
                      <Icon className="size-4" style={{ color: category.color }} />
                    </span>
                    <span className="text-[11px] text-muted-foreground">{item.delta}</span>
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground">{category.label}</p>
                  <p className="text-lg font-semibold">{formatCompact(item.amount)}</p>
                </Link>
              )
            })}
          </div>
        </section>

        <section className="px-5 pt-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-semibold">Tarjetas vinculadas</h2>
            <span className="text-xs text-muted-foreground">{linkedCards.length} activas</span>
          </div>
          <div className="space-y-2">
            {linkedCards.map((card) => {
              return (
                <div key={card.lastFour} className="rounded-lg border border-border bg-card p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="flex size-10 items-center justify-center rounded-lg bg-secondary">
                        <CreditCard className="size-5 text-primary" />
                      </span>
                      <div>
                        <p className="font-medium">{card.name}</p>
                        <p className="text-xs text-muted-foreground">terminada en {card.lastFour}</p>
                      </div>
                    </div>
                    <p className="text-right text-sm font-semibold">{formatCompact(card.spend)}</p>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-3 text-xs">
                    <span className="text-muted-foreground">{card.bestFor}</span>
                    <span className="text-primary">{card.nextBenefit}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <section className="px-5 pt-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-semibold">Suscripciones</h2>
            <span className="text-xs font-medium text-primary">{formatCurrency(subscriptionTotal)}/mes</span>
          </div>
          <div className="rounded-lg border border-border bg-card">
            {subscriptions.slice(0, 3).map((subscription, index) => (
              <div
                key={subscription.name}
                className={`flex items-center justify-between gap-3 p-3 ${index > 0 ? "border-t border-border" : ""}`}
              >
                <div>
                  <p className="text-sm font-medium">{subscription.name}</p>
                  <p className="text-xs text-muted-foreground">{subscription.card} · Prox. {subscription.nextDate}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">{formatCurrency(subscription.amount)}</p>
                  <p className="text-[11px] text-muted-foreground">{subscription.status}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="px-5 pt-5">
          <Link
            href="/cerca"
            className="flex items-center justify-between rounded-lg border border-border bg-card p-4"
          >
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-lg bg-secondary">
                <MapPin className="size-5 text-primary" />
              </span>
              <div>
                <p className="font-medium">Promos cerca</p>
                <p className="text-xs text-muted-foreground">Elegir tarjeta antes de pagar</p>
              </div>
            </div>
            <ChevronRight className="size-5 text-muted-foreground" />
          </Link>
        </section>

        <section className="px-5 pt-5">
          <Link
            href="/perfil"
            className="flex items-center justify-between rounded-lg border border-border bg-card p-4"
          >
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-lg bg-secondary">
                <Target className="size-5 text-primary" />
              </span>
              <div>
                <p className="font-medium">Objetivo de gasto</p>
                <p className="text-xs text-muted-foreground">Ajustar presupuesto y alertas</p>
              </div>
            </div>
            <ChevronRight className="size-5 text-muted-foreground" />
          </Link>
        </section>
      </div>

      <BottomNav activeTab="inicio" />
    </main>
  )
}
