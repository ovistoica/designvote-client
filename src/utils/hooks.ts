import * as React from 'react'

import {useBreakpoint} from '@chakra-ui/react'
import {useLocation} from 'react-router-dom'

import {useDesigns} from './design-query'

export function useSafeDispatch<Value = unknown>(
  dispatch: React.Dispatch<Value>,
) {
  const mounted = React.useRef(false)
  React.useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])
  return React.useCallback(
    (value: Value) => (mounted.current ? dispatch(value) : undefined),
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
    (newData: Result) =>
      safeSetState({data: newData, status: ApiStatus.Resolved}),
    [safeSetState],
  )
  const setError = React.useCallback(
    e => safeSetState({error: e, status: ApiStatus.Rejected}),
    [safeSetState],
  )
  const reset = React.useCallback(() => safeSetState(initialStateRef.current), [
    safeSetState,
  ])

  const run = React.useCallback(
    (promise: Promise<Result>) => {
      if (!promise || !promise.then) {
        throw new Error(
          "The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?",
        )
      }
      safeSetState({status: ApiStatus.Pending})
      return promise.then(
        newData => {
          setData(newData)
          return data
        },
        (e: string) => {
          setError(e)
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

export function useIsMobile() {
  const currentBreak = useBreakpoint()

  return currentBreak === 'base' || currentBreak === 'sm'
}

export function useFormattedLocationName() {
  const {data: designs} = useDesigns()

  const {pathname} = useLocation()
  if (pathname === '/app') {
    return null
  }
  if (pathname.startsWith('/design')) {
    const designId = pathname.slice(8)
    const design = designs.find(d => d.designId === designId)
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
