import {CheckoutSession} from 'types/payment'
import {postRequest} from './axios-client'

type Duration = 'monthly' | 'yearly'

interface CreateCheckoutBody {
  success_url: string
  cancel_url: string
  duration: Duration
}

export function createCheckoutSession(body: CreateCheckoutBody) {
  return postRequest<CheckoutSession, CreateCheckoutBody>(
    'v1/payment/checkout',
    body,
  )
}
