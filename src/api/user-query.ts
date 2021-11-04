import {AxiosError} from 'axios'
import {useQuery, UseQueryOptions} from 'react-query'
import {PublicUser} from 'types'
import {getRequest} from './axios-client'

/**
 * Get user public info (profile image, name, nickname)
 * @param uid The id of the user
 */
export function getUserPublicInfo(uid: string) {
  return getRequest<PublicUser>(`/account/public/${uid}`)
}

export function usePublicUser(
  uid: string,
  options: UseQueryOptions<PublicUser, AxiosError> = {},
) {
  return useQuery({
    queryFn: () => getUserPublicInfo(uid),
    queryKey: ['publicUser', {uid}],
    ...options,
  })
}
