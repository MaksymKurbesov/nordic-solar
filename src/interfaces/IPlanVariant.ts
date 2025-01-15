export interface IPlanOption {
  type: string
  days: number | null
  minDeposit: number
  maxDeposit: number
  inDay: number | null
  region: string
  accruals: 'Ежедневно' | 'В конце срока'
}

// Интерфейс для группы планов
export interface IPlanGroup {
  beginner: IPlanOption
  available?: IPlanOption
  optimal?: IPlanOption
  maximum?: IPlanOption
}

export type PlanType = keyof IPlanTypes
export type PlanVariant = keyof IPlanGroup

// Общая типизация для всех групп в PLAN_VARIANT
export interface IPlanTypes {
  solar: IPlanGroup
  wind: IPlanGroup
  hydro: IPlanGroup
  hydrogen: IPlanGroup
  mining: Omit<IPlanGroup, 'optimal' | 'maximum'> // Mining не имеет optional и maximum
}
