export type OnboardingStatusResponse = {
  has_accepted_terms: boolean
  has_subscription: boolean
}

export type LinkAccountResponse = {
  url: string
}

export type Metric = {
  processed_average: number
  total_average: number
  unprocessed_average: number
}

export type Metrics = {
  all_time: Metric | null
  last_30_days: Metric | null
  last_7_days: Metric | null
  last_365_days: Metric | null
}
