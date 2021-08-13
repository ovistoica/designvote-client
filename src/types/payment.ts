export interface CheckoutSession {
  amount_subtotal: number
  amount_total: number
  cancel_url: string
  client_reference_id: string
  currency: 'usd' | 'eur'
  customer: string
  customer_email: string | null
  id: string
  livemode: boolean
  metadata: Record<string, unknown>
  mode: 'subscription'
  object: 'checkout.session'
  payment_method_types: ['card']
  payment_status: 'unpaid' | 'paid'
  success_url: string
  url: string
  status: number
}
