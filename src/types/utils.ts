import {User} from './auth'

export function isUser(obj: unknown): obj is User {
  const givenName = (obj as User).given_name
  const picture = (obj as User).picture

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
