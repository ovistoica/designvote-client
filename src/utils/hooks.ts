import {useAuth} from 'context/auth-context'
import * as React from 'react'
import {useLocation} from 'react-router'
import {Design, SubscriptionStatus} from 'types'
import {useApiUser, useDesigns} from '../api/design-query'
import {useClipboard, useToast} from '@chakra-ui/react'
import {hasVotedOnDesign, useVoteHistoryState} from '../store/voting-history'

export function useSafeDispatch<Value = unknown>(
  dispatch: React.Dispatch<Value>,
) {
  const mounted = React.useRef(false)
  React.useLayoutEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])
  return React.useCallback(
    (value: Value) => (mounted.current ? dispatch(value) : void 0),
    [dispatch],
  )
}

export enum ApiStatus {
  Idle = 'idle',
  Pending = 'pending',
  Resolved = 'resolved',
  Rejected = 'rejected',
}

interface AsyncState<Data = unknown> {
  data?: Data
  error?: string
  status: ApiStatus
}

// Example usage:
// const {data, error, status, run} = useAsync()
// React.useEffect(() => {
//   run(fetchPokemon(pokemonName))
// }, [pokemonName, run])
export function useAsync<Result = unknown>(
  initialState: AsyncState<Result> = {
    status: ApiStatus.Idle,
    data: undefined,
    error: undefined,
  },
) {
  const initialStateRef = React.useRef({
    ...initialState,
  })
  const [{status, data, error}, setState] = React.useReducer(
    (s: AsyncState<Result>, a: AsyncState<Result>) => ({...s, ...a}),
    initialStateRef.current,
  )

  const safeSetState = useSafeDispatch(setState)

  const setData = React.useCallback(
    (data: Result) => safeSetState({data, status: ApiStatus.Resolved}),
    [safeSetState],
  )
  const setError = React.useCallback(
    error => safeSetState({error, status: ApiStatus.Rejected}),
    [safeSetState],
  )
  const reset = React.useCallback(() => safeSetState(initialStateRef.current), [
    safeSetState,
  ])

  const run = React.useCallback(
    (promise: Promise<Result>) => {
      if (!promise || !promise.then) {
        throw new Error(
          `The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?`,
        )
      }
      safeSetState({status: ApiStatus.Pending})
      return promise.then(
        data => {
          setData(data)
          return data
        },
        (error: string) => {
          setError(error)
          return Promise.reject(error)
        },
      )
    },
    [safeSetState, setData, setError],
  )

  return {
    // using the same names that react-query uses for convenience
    isIdle: status === ApiStatus.Idle,
    isLoading: status === ApiStatus.Pending,
    isError: status === ApiStatus.Rejected,
    isSuccess: status === ApiStatus.Resolved,

    setData,
    setError,
    error,
    status,
    data,
    run,
    reset,
  }
}

export function useFormattedLocationName() {
  const {data: designs} = useDesigns()

  const location = useLocation()
  const {pathname} = location
  if (pathname === '/home') {
    return null
  }
  if (pathname.startsWith('/design')) {
    const designId = pathname.slice(8)
    const design = designs.find(design => design.designId === designId)
    return design?.name
  }
  if (pathname === '/create') {
    return 'Create Design'
  }

  if (pathname === '/settings') {
    return 'Account & Settings'
  }

  if (pathname.startsWith('/vote')) {
    return 'Vote on design'
  }

  if (pathname === '/thank-you') {
    return 'Thank you screen'
  }

  return 'Not Found'
}

export function useCanCreateDesigns() {
  const {data, isLoading: isUserLoading} = useApiUser()
  const {account: user} = data ?? {}
  const {data: designs, isLoading: isDesignsLoading} = useDesigns()

  if (isUserLoading || isDesignsLoading || !user) {
    return false
  }

  switch (user.subscriptionStatus) {
    case SubscriptionStatus.PastDue:
    case SubscriptionStatus.Active: {
      return true
    }

    default: {
      return designs.length < 2
    }
  }
}

/**
 * Checks if user has voted on the design
 * IMPORTANT: This function does not check if the user is the OWNER
 * of the design. That check needs to be done separately
 * @param design
 */
export function useHasVoted(design: Design): boolean {
  const {user} = useAuth()
  const {sub: uid} = user ?? {sub: 'user_not_logged_in'}

  const hasVotedAuth = design.votes.find(v => v.uid === uid)
  const hasVotedAnon = useVoteHistoryState(hasVotedOnDesign(design.shortUrl))

  return hasVotedAnon || !!hasVotedAuth
}

/**
 * Returns a function that copies the voting link to clipboard
 * and shows a toast informing user that the link was copied
 * @param designUrl
 */
export function useShareDesignLink(designUrl: string) {
  const websiteLink = window.location.origin
  const link = `${websiteLink}/design/${designUrl}`
  const {onCopy} = useClipboard(link)
  const toast = useToast()

  return () => {
    onCopy()
    toast({
      title: 'Link copied to clipboard.',
      description: 'Go ahead and share it with your friends :)',
      status: 'success',
      duration: 4000,
      isClosable: true,
    })
  }
}
