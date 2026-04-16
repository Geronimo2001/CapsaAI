import {
  AlertTriangle,
  Car,
  Coffee,
  CreditCard,
  Home,
  MapPin,
  ReceiptText,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Utensils,
  WalletCards,
  Wifi,
} from "lucide-react"

export type CategoryKey =
  | "super"
  | "comida"
  | "transporte"
  | "cafe"
  | "hogar"
  | "servicios"
  | "compras"

export const categories = [
  { key: "super", label: "Super", icon: ShoppingBag, color: "#5ee6a8" },
  { key: "comida", label: "Comida", icon: Utensils, color: "#ff8a5b" },
  { key: "transporte", label: "Transporte", icon: Car, color: "#63b3ff" },
  { key: "cafe", label: "Cafe", icon: Coffee, color: "#f5c542" },
  { key: "hogar", label: "Hogar", icon: Home, color: "#c38cff" },
  { key: "servicios", label: "Servicios", icon: Wifi, color: "#7dd3fc" },
  { key: "compras", label: "Compras", icon: WalletCards, color: "#ff6aa2" },
] as const

export const spendingSummary = {
  user: "Geronimo",
  period: "Abril 2026",
  totalSpend: 287450,
  budget: 340000,
  projectedSpend: 365800,
  dailyAverage: 19163,
  lastMonthSpend: 312000,
  patternMessage: "Si se mantiene este ritmo, el mes cierra 8% sobre tu objetivo.",
}

export const categorySpend = [
  { key: "super", amount: 76500, delta: "+12%" },
  { key: "comida", amount: 64200, delta: "+18%" },
  { key: "transporte", amount: 48500, delta: "-6%" },
  { key: "compras", amount: 38200, delta: "+4%" },
  { key: "servicios", amount: 28450, delta: "estable" },
  { key: "cafe", amount: 17700, delta: "+22%" },
  { key: "hogar", amount: 13900, delta: "-3%" },
] satisfies { key: CategoryKey; amount: number; delta: string }[]

export const linkedCards = [
  {
    name: "Visa Galicia",
    lastFour: "4582",
    spend: 125000,
    limit: 180000,
    bestFor: "Super y farmacia",
    nextBenefit: "25% reintegro miercoles",
  },
  {
    name: "Mastercard BBVA",
    lastFour: "7891",
    spend: 98450,
    limit: 150000,
    bestFor: "Restaurantes",
    nextBenefit: "3 cuotas sin interes cerca",
  },
  {
    name: "Amex Santander",
    lastFour: "3344",
    spend: 64000,
    limit: 120000,
    bestFor: "Servicios",
    nextBenefit: "15% streaming",
  },
]

export const subscriptions = [
  { name: "Netflix", amount: 5499, card: "Amex 3344", nextDate: "22 Abr", status: "Sube 18% en mayo" },
  { name: "Spotify", amount: 2499, card: "Visa 4582", nextDate: "28 Abr", status: "Posible duplicado" },
  { name: "iCloud", amount: 1299, card: "Visa 4582", nextDate: "1 May", status: "Normal" },
  { name: "YouTube Premium", amount: 1899, card: "Master 7891", nextDate: "5 May", status: "Normal" },
]

export const transactions = [
  { id: "t1", day: 15, merchant: "Mercado Libre", amount: 24500, category: "compras", card: "Visa 4582", time: "14:32" },
  { id: "t2", day: 15, merchant: "La Parolaccia", amount: 18900, category: "comida", card: "Master 7891", time: "13:15" },
  { id: "t3", day: 14, merchant: "YPF", amount: 45000, category: "transporte", card: "Visa 4582", time: "Ayer" },
  { id: "t4", day: 13, merchant: "Coto", amount: 31800, category: "super", card: "Visa 4582", time: "19:08" },
  { id: "t5", day: 12, merchant: "Starbucks", amount: 6200, category: "cafe", card: "Master 7891", time: "10:40" },
  { id: "t6", day: 11, merchant: "Personal Flow", amount: 21400, category: "servicios", card: "Amex 3344", time: "08:00" },
  { id: "t7", day: 10, merchant: "Farmacity", amount: 12800, category: "super", card: "Visa 4582", time: "18:22" },
  { id: "t8", day: 8, merchant: "Rappi", amount: 15700, category: "comida", card: "Master 7891", time: "21:44" },
]

const dailySpend = [
  8200, 15400, 9900, 12200, 18600, 24500, 15100, 15700, 10400, 12800, 21400, 6200, 31800, 45000, 40250,
]

export const spendingTrend = Array.from({ length: 30 }, (_, index) => {
  const day = index + 1
  const actual = dailySpend.slice(0, day).reduce((total, amount) => total + amount, 0)
  const projected = Math.round((spendingSummary.projectedSpend / 30) * day)

  return {
    day,
    actual: day <= dailySpend.length ? actual : null,
    projected,
  }
})

export const calendarDays = Array.from({ length: 30 }, (_, index) => {
  const day = index + 1
  const dayTransactions = transactions.filter((transaction) => transaction.day === day)
  const amount = dayTransactions.reduce((total, transaction) => total + transaction.amount, 0)

  return {
    date: day,
    amount,
    transactions: dayTransactions.map((transaction) => ({
      name: transaction.merchant,
      amount: transaction.amount,
      category: transaction.category,
      card: transaction.card,
    })),
  }
})

export const nearbyPromos = [
  {
    place: "Carrefour Market",
    distance: "180 m",
    category: "Super",
    benefit: "25% reintegro",
    card: "Visa Galicia",
    reason: "Es la tarjeta con mejor ahorro para super esta semana.",
    saving: 7200,
  },
  {
    place: "Havanna",
    distance: "260 m",
    category: "Cafe",
    benefit: "2x1 despues de las 16",
    card: "Mastercard BBVA",
    reason: "Conviene sobre Visa por tope mas alto.",
    saving: 3400,
  },
  {
    place: "Shell",
    distance: "600 m",
    category: "Transporte",
    benefit: "15% combustible",
    card: "Visa Galicia",
    reason: "Tu gasto en transporte viene 6% abajo; no afecta el objetivo.",
    saving: 5100,
  },
]

export const alerts = [
  {
    title: "Posible cobro duplicado",
    detail: "Spotify aparece dos veces en Visa 4582 durante abril.",
    severity: "Alta",
    time: "Hoy, 09:15",
    icon: AlertTriangle,
  },
  {
    title: "Comida supera el patron habitual",
    detail: "La categoria subio 18% contra tus ultimas cuatro semanas.",
    severity: "Media",
    time: "Ayer, 20:10",
    icon: Sparkles,
  },
  {
    title: "Promo cercana disponible",
    detail: "Carrefour Market tiene 25% con Visa Galicia a 180 m.",
    severity: "Oportunidad",
    time: "Hace 35 min",
    icon: MapPin,
  },
  {
    title: "Objetivo mensual en riesgo",
    detail: "La proyeccion actual queda $25.800 por encima del objetivo.",
    severity: "Media",
    time: "Hoy, 08:00",
    icon: ReceiptText,
  },
]

export const profileSettings = {
  monthlyBudget: 340000,
  alertThreshold: 85,
  locationPromos: true,
  duplicateDetection: true,
  patternAlerts: true,
  privacyStatus: "Tarjetas vinculadas solo para analisis de gastos",
  privacyIcon: ShieldCheck,
}

export function getCategory(key: string) {
  return categories.find((category) => category.key === key) ?? categories[0]
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatCompact(amount: number) {
  if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`
  if (amount >= 1000) return `$${Math.round(amount / 1000)}k`
  return `$${amount}`
}
