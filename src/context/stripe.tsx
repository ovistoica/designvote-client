import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'

const stripeKey = process.env.REACT_APP_STRIPE_PK as string

const stripePromise = loadStripe(stripeKey)

export const StripeContext: React.FC = props => (
  <Elements stripe={stripePromise} {...props} />
)
