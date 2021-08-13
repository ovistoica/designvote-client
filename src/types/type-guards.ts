import {ApiDesign} from './api'
import {Auth0User} from './auth'

export function isUser(obj: unknown): obj is Auth0User {
  const givenName = (obj as Auth0User).given_name
  const picture = (obj as Auth0User).picture

  if (
    givenName &&
    typeof givenName === 'string' &&
    picture &&
    typeof picture === 'string'
  ) {
    return true
  }
  return false
}

export function isApiDesign(obj: unknown): obj is ApiDesign {
  const designId = (obj as ApiDesign)['design-id']
  return typeof designId === 'string'
}
