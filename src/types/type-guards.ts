import {ApiDesign} from './api'
import {User} from './auth'

export function isUser(obj: unknown): obj is User {
  const givenName = (obj as User).given_name
  const {picture} = obj as User

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
