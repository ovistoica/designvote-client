import {SubscriptionStatus} from './enums'

export interface Auth0User {
  /**
   * First name of user
   */ given_name: string

  /**
   * Last name of user
   */
  family_name: string

  /**
   * url of image adress
   */
  picture: string

  /**
   * Email adress
   */
  email: string

  /**
   * If user veriified email adress
   */
  email_verified: boolean

  /**
   * Locale prefference. Default is en
   */
  locale: 'en' | 'fr'

  /**
   * Concatenation of first and last name
   */
  name: string

  /**
   * Chosen by user. Default is email
   */
  nickname: string

  /**
   * unique id by which user is identified
   */
  sub: string

  /**
   * Last update date
   */
  updated_at: string
}

export interface APIUser {
  email: string
  social: boolean
  uid: string
  nickname?: string
  subscriptionStatus: SubscriptionStatus
  stripeId?: string
  picture: string
}

export interface PublicUser {
  nickname?: string
  uid: string
  name: string
  picture: string
}
